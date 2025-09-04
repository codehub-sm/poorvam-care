#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 Secure Environment Variables Setup');
console.log('=====================================\n');

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
  console.log('\n📋 Usage: node setup-env-vars.js <SHEET_ID>');
  console.log('Example: node setup-env-vars.js 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms');
  console.log('\n💡 You can find your Sheet ID in the URL:');
  console.log('https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit\n');
  process.exit(1);
}

console.log('✅ Found credentials file');
console.log('✅ Sheet ID provided:', sheetId);

// Set environment variables using Amplify CLI
console.log('\n🔧 Setting environment variables...');

const { execSync } = await import('child_process');

try {
  // Set Google Sheet ID
  execSync(`amplify function update poorvamcare22677bcf --env-var GOOGLE_SHEET_ID=${sheetId}`, { stdio: 'inherit' });
  
  // Set Google Service Account Credentials (escaped)
  const escapedCredentials = JSON.stringify(credentials).replace(/"/g, '\\"');
  execSync(`amplify function update poorvamcare22677bcf --env-var GOOGLE_SERVICE_ACCOUNT_CREDENTIALS="${escapedCredentials}"`, { stdio: 'inherit' });
  
  console.log('\n✅ Environment variables set successfully!');
  console.log('\n🚀 Next steps:');
  console.log('1. Run: amplify push');
  console.log('2. Test your contact form');
  console.log('3. Check your Google Sheet for new entries\n');
  
  console.log('📝 Important:');
  console.log('- Make sure your Google Sheet is shared with the service account email');
  console.log('- The service account email is:', credentials.client_email);
  console.log('- Add this email as an editor to your Google Sheet\n');
  
} catch (error) {
  console.error('❌ Error setting environment variables:', error.message);
  console.log('\n💡 Alternative method:');
  console.log('1. Run: amplify function update poorvamcare22677bcf');
  console.log('2. Select "Environment variables configuration"');
  console.log('3. Add the variables manually');
  process.exit(1);
} 