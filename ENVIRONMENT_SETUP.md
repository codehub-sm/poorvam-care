# Environment Setup Guide

## Google Sheets Integration

The contact form requires Google Sheets integration to save form submissions. Follow these steps to set up the environment variables:

### 1. Create Google Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing project
3. Enable Google Sheets API
4. Create a Service Account:
   - Go to "IAM & Admin" → "Service Accounts"
   - Click "Create Service Account"
   - Download the JSON credentials file

### 2. Set Up Google Sheet

1. Create a new Google Sheet
2. Share it with your service account email (found in the JSON file)
3. Grant "Editor" permissions
4. Note the Sheet ID from the URL

### 3. Configure Lambda Environment Variables

In your AWS Lambda function, set these environment variables:

```
GOOGLE_SHEET_ID=your_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_CREDENTIALS=your_full_json_credentials_string
```

### 4. Important Security Notes

- ✅ **NEVER commit credentials to Git**
- ✅ **Use AWS Lambda environment variables**
- ✅ **Rotate credentials regularly**
- ❌ **Don't store credentials in code files**

## API Endpoints

- **Contact Form**: `POST https://gnuk7074fb.execute-api.ap-south-1.amazonaws.com/prod/contact`
- **Health Check**: `GET https://gnuk7074fb.execute-api.ap-south-1.amazonaws.com/prod/health`

## Testing

Test the contact form with:
```bash
curl -X POST "https://gnuk7074fb.execute-api.ap-south-1.amazonaws.com/prod/contact" \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","phone":"1234567890","consent":true}'
``` 