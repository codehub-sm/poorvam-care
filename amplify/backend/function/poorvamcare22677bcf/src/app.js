/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const { google } = require('googleapis')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  // Allow specific domains
  const allowedOrigins = [
    'https://www.poorvamcare.in',
    'https://poorvamcare.in',
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:4173'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  } else {
    res.header("Access-Control-Allow-Origin", "https://www.poorvamcare.in");
  }
  
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "false");
  next()
});

// Google Sheets configuration
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
const SHEET_ID = process.env.GOOGLE_SHEET_ID
const CREDENTIALS = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS || '{}')

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: CREDENTIALS,
  scopes: SCOPES,
})

const sheets = google.sheets({ version: 'v4', auth })

// Function to append data to Google Sheets
async function appendToSheet(data) {
  try {
    const values = [
      [
        new Date().toISOString(),
        data.firstName,
        data.lastName,
        data.email,
        data.phone,
        data.childName || '',
        data.childAge || '',
        data.serviceType || '',
        data.message || '',
        data.consent ? 'Yes' : 'No'
      ]
    ]

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A:J', // Adjust range as needed
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: values,
      },
    })

    console.log('Data appended successfully:', response.data)
    return true
  } catch (error) {
    console.error('Error appending to sheet:', error)
    return false
  }
}

/**********************
 * Contact form endpoint *
 **********************/

app.post('/contact', async function(req, res) {
  try {
    const body = req.body
    
    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.phone || !body.consent) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      })
    }

    // Log the submission
    console.log('Contact form submission:', {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      childName: body.childName || '',
      childAge: body.childAge || '',
      serviceType: body.serviceType || '',
      message: body.message || '',
      consent: body.consent,
      timestamp: new Date().toISOString()
    })

    // Append to Google Sheets if configured
    if (SHEET_ID && Object.keys(CREDENTIALS).length > 0) {
      const sheetSuccess = await appendToSheet(body)
      if (!sheetSuccess) {
        console.warn('Failed to append to Google Sheets, but continuing with response')
      }
    } else {
      console.log('Google Sheets not configured, skipping sheet update')
    }

    // Return success response
    res.json({
      success: true,
      message: 'Contact form submitted successfully'
    })

  } catch (error) {
    console.error('Error processing contact form:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
})

// Handle preflight requests
app.options('/contact', function(req, res) {
  res.status(200).end()
})

// Health check endpoint
app.get('/health', function(req, res) {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
