# Email Setup Guide

Your contact form now sends real email notifications! Here's how to configure it:

## 🔧 Setup Steps

### 1. Create Gmail App Password

1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification** (enable if not already)
3. Go to **Security** → **App passwords**
4. Select "Mail" and "Other (Custom name)"
5. Name it "Poorvam Care Contact Form"
6. Copy the generated 16-character password

### 2. Update Environment Variables

Edit the `.env` file in your project root:

```env
# Email Configuration
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-character-app-password

# Server Configuration
PORT=3000
NODE_ENV=development
```

**Replace:**
- `your-gmail@gmail.com` with your Gmail address
- `your-16-character-app-password` with the app password from step 1

### 3. Update Recipient Email

In `server/routes.ts`, line 25, change the recipient email:

```javascript
to: 'poorvam.care@gmail.com', // Change this to your business email
```

### 4. Restart Server

```bash
npm run dev
```

## ✅ What You'll Get

When someone submits the contact form, you'll receive a beautiful HTML email with:

- **Contact Information**: Name, email, phone
- **Child Information**: Child's name and age (if provided)
- **Service Details**: Service type and message
- **Timestamp**: When the form was submitted
- **Admin Link**: Direct link to view in admin panel

## 🔒 Security Notes

- Never commit your `.env` file to git
- The `.env` file is already in `.gitignore`
- Use app passwords, not your regular Gmail password
- Consider using environment variables in production

## 🚀 Alternative Email Services

If you prefer other email services:

### Option 1: Resend (Recommended for production)
```bash
npm install resend
```

### Option 2: SendGrid
```bash
npm install @sendgrid/mail
```

### Option 3: AWS SES
```bash
npm install @aws-sdk/client-ses
```

## 🧪 Testing

1. Submit a contact form on your website
2. Check your email inbox
3. Check server console for confirmation logs

## 📧 Email Template

The email includes:
- Professional HTML formatting
- Color-coded sections
- Clickable email and phone links
- Direct admin panel access
- Responsive design

## 🔧 Troubleshooting

**Email not sending?**
1. Check your Gmail app password is correct
2. Ensure 2-factor authentication is enabled
3. Check server console for error messages
4. Verify `.env` file is in project root

**Gmail blocking emails?**
1. Check spam folder
2. Add your Gmail to contacts
3. Check Gmail's "Less secure app access" settings 