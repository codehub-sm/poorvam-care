/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "false");
  next()
});

// Google Sheets integration (optional)
let sheets = null;
let SHEET_ID = null;

// Initialize Google Sheets if credentials are available
try {
  const { google } = require('googleapis');
  SHEET_ID = process.env.GOOGLE_SHEET_ID;
  const CREDENTIALS = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS ? 
    JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS) : null;

  if (SHEET_ID && CREDENTIALS && Object.keys(CREDENTIALS).length > 0) {
    const auth = new google.auth.GoogleAuth({
      credentials: CREDENTIALS,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
    sheets = google.sheets({ version: 'v4', auth });
    console.log('✅ Google Sheets integration initialized');
  } else {
    console.log('⚠️ Google Sheets not configured - submissions will be logged only');
  }
} catch (error) {
  console.log('⚠️ Google Sheets initialization failed:', error.message);
}

// Function to append data to Google Sheets
async function appendToSheet(data) {
  if (!sheets || !SHEET_ID) {
    console.log('Google Sheets not configured, skipping...');
    return false;
  }

  try {
    const values = [
      [
        new Date().toISOString(),
        data.firstName || '',
        data.lastName || '',
        data.email || '',
        data.phone || '',
        data.childName || '',
        data.childAge || '',
        data.serviceType || '',
        data.message || '',
        data.consent ? 'Yes' : 'No'
      ]
    ];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A:J', // Adjust range as needed
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: values,
      },
    });

    console.log('✅ Data appended to Google Sheets successfully');
    return true;
  } catch (error) {
    console.error('❌ Error appending to Google Sheets:', error.message);
    return false;
  }
}

/**********************
 * Contact form endpoint *
 **********************/

app.post('/contact', async function(req, res) {
  console.log('📨 Contact form submission received');
  
  try {
    const body = req.body;
    
    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.phone) {
      console.log('❌ Validation failed: Missing required fields');
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: firstName, lastName, email, phone'
      });
    }

    if (!body.consent) {
      console.log('❌ Validation failed: Consent not provided');
      return res.status(400).json({
        success: false,
        error: 'Consent is required'
      });
    }

    // Log the submission (always)
    const submissionData = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      childName: body.childName || '',
      childAge: body.childAge || '',
      serviceType: body.serviceType || '',
      message: body.message || '',
      consent: body.consent,
      timestamp: new Date().toISOString(),
      userAgent: req.headers['user-agent'] || '',
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress || ''
    };

    console.log('📝 Contact submission:', JSON.stringify(submissionData, null, 2));

    // Try to append to Google Sheets
    let sheetSuccess = false;
    if (sheets && SHEET_ID) {
      sheetSuccess = await appendToSheet(body);
    }

    // Always return success - even if Google Sheets fails
    const response = {
      success: true,
      message: 'Contact form submitted successfully',
      timestamp: new Date().toISOString()
    };

    if (sheetSuccess) {
      response.googleSheets = 'Data saved to Google Sheets';
      console.log('✅ Full success: Form submitted and saved to Google Sheets');
    } else {
      response.googleSheets = 'Data logged (Google Sheets not configured or failed)';
      console.log('⚠️ Partial success: Form submitted but not saved to Google Sheets');
    }

    res.status(200).json(response);

  } catch (error) {
    console.error('❌ Error processing contact form:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Please try again later'
    });
  }
});

// Handle preflight requests
app.options('/contact', function(req, res) {
  console.log('✅ CORS preflight request handled');
  res.status(200).end();
});

// Health check endpoint
app.get('/health', function(req, res) {
  const healthStatus = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    googleSheets: sheets && SHEET_ID ? 'configured' : 'not configured',
    environment: process.env.ENV || 'unknown'
  };
  
  console.log('🏥 Health check:', healthStatus);
  res.json(healthStatus);
});

// Catch all other routes
app.use('*', function(req, res) {
  console.log(`❓ Unknown route: ${req.method} ${req.path}`);
  res.status(404).json({
    success: false,
    error: 'Route not found',
    availableRoutes: [
      'POST /contact',
      'GET /health'
    ]
  });
});

app.listen(3000, function() {
    console.log("🚀 Poorvam Care API started on port 3000");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
