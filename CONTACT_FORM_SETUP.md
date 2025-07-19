# Contact Form Data Management

Your contact form now saves data in multiple ways for easy management:

## ✅ What's Already Working

1. **File-based Storage**: Contact submissions are automatically saved to `server/data/contacts.json`
2. **Console Logging**: New submissions are logged to the server console with full details
3. **Admin Panel**: View all submissions at `/admin` (login required)

## 🔧 How to Use

### 1. View Contact Submissions
- Go to `http://localhost:5173/admin`
- Login with:
  - Email: `admin@poorvam.care`
  - Password: `admin123`

### 2. Check Console Logs
When someone submits the contact form, you'll see detailed logs in your server console:
```
📧 NEW CONTACT SUBMISSION:
From: John Doe
Email: john@example.com
Phone: +91 1234567890
Child: Sarah
Age: 5-10 years
Service: Speech Therapy
Message: Looking for speech therapy for my daughter
Timestamp: 2024-01-15T10:30:00.000Z
----------------------------------------
```

### 3. Data Files
Contact data is stored in:
- `server/data/contacts.json` - All contact submissions
- `server/data/users.json` - Admin users
- `server/data/newsletter.json` - Newsletter subscriptions

## 🚀 Next Steps (Optional)

### Option 1: Add Real Email Notifications
Replace the console logging with actual email notifications:

```javascript
// In server/routes.ts, replace the sendContactNotification function
import nodemailer from 'nodemailer';

async function sendContactNotification(submission) {
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-app-password'
    }
  });

  await transporter.sendMail({
    from: 'your-email@gmail.com',
    to: 'poorvam.care@gmail.com',
    subject: 'New Contact Form Submission',
    html: `
      <h2>New Contact Submission</h2>
      <p><strong>Name:</strong> ${submission.firstName} ${submission.lastName}</p>
      <p><strong>Email:</strong> ${submission.email}</p>
      <p><strong>Phone:</strong> ${submission.phone}</p>
      <p><strong>Child:</strong> ${submission.childName || 'N/A'}</p>
      <p><strong>Age:</strong> ${submission.childAge || 'N/A'}</p>
      <p><strong>Service:</strong> ${submission.serviceType || 'N/A'}</p>
      <p><strong>Message:</strong> ${submission.message || 'N/A'}</p>
    `
  });
}
```

### Option 2: Use a Database
For production, consider using a proper database:
- **SQLite** (easiest): `npm install better-sqlite3`
- **PostgreSQL**: Already configured in your schema
- **MongoDB**: `npm install mongodb`

### Option 3: Use External Services
- **Google Sheets**: Automatically save to a spreadsheet
- **Airtable**: Create a database with a nice interface
- **Notion**: Save to a Notion database

## 🔒 Security Notes

- Change the default admin password in production
- Consider adding rate limiting to prevent spam
- Add CSRF protection for the contact form
- Use environment variables for sensitive data

## 📊 Data Structure

Each contact submission includes:
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+91 1234567890",
  "childName": "Sarah",
  "childAge": "5-10 years",
  "serviceType": "speech-therapy",
  "message": "Looking for speech therapy...",
  "consent": true,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
``` 