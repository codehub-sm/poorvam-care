#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Google Sheets Setup Helper');
console.log('=============================\n');

// Check if credentials file exists
const credentialsPath = path.join(__dirname, 'google-credentials.json');
if (!fs.existsSync(credentialsPath)) {
  console.log('❌ google-credentials.json not found!');
  console.log('\n📋 Please follow these steps:');
  console.log('1. Download your service account JSON file from Google Cloud Console');
  console.log('2. Rename it to "google-credentials.json"');
  console.log('3. Place it in the root directory of this project');
  console.log('4. Run this script again\n');
  process.exit(1);
}

// Read credentials
const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
const sheetId = process.argv[2];

if (!sheetId) {
  console.log('❌ Google Sheet ID not provided!');
  console.log('\n📋 Usage: node setup-google-sheets.js <SHEET_ID>');
  console.log('Example: node setup-google-sheets.js 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms');
  console.log('\n💡 You can find your Sheet ID in the URL:');
  console.log('https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit\n');
  process.exit(1);
}

console.log('✅ Found credentials file');
console.log('✅ Sheet ID provided:', sheetId);

// Update function parameters
const functionParamsPath = path.join(__dirname, 'amplify/backend/function/poorvamcare22677bcf/function-parameters.json');
const functionParams = JSON.parse(fs.readFileSync(functionParamsPath, 'utf8'));

functionParams.environmentVariables = {
  GOOGLE_SHEET_ID: sheetId,
  GOOGLE_SERVICE_ACCOUNT_CREDENTIALS: JSON.stringify(credentials)
};

fs.writeFileSync(functionParamsPath, JSON.stringify(functionParams, null, 2));

console.log('✅ Updated function parameters');
console.log('\n🚀 Next steps:');
console.log('1. Run: amplify push');
console.log('2. Test your contact form');
console.log('3. Check your Google Sheet for new entries\n');

console.log('📝 Important:');
console.log('- Make sure your Google Sheet is shared with the service account email');
console.log('- The service account email is:', credentials.client_email);
console.log('- Add this email as an editor to your Google Sheet\n'); 