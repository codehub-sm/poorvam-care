import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactMessageSchema,
  insertSubscriberSchema
} from "@shared/schema";
import { z } from "zod";
import nodemailer from "nodemailer";

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure nodemailer with a test account for development
  // In production, you would use proper SMTP settings
  let transporter;
  
  if (process.env.NODE_ENV === 'production' && process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  } else {
    // For development, use ethereal.email
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
  }
  
  // Submit contact form
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      // Store in database
      const contactMessage = await storage.createContactMessage(validatedData);
      
      // Send email notification
      const mailOptions = {
        from: '"Bright Beginnings Website" <noreply@brightbeginnings.com>',
        to: process.env.NOTIFICATION_EMAIL || 'info@brightbeginnings.com',
        subject: `New Contact Form Submission: ${validatedData.service}`,
        text: `
Name: ${validatedData.name}
Email: ${validatedData.email}
Phone: ${validatedData.phone || 'Not provided'}
Service: ${validatedData.service}
Message: ${validatedData.message}
        `,
        html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${validatedData.name}</p>
<p><strong>Email:</strong> ${validatedData.email}</p>
<p><strong>Phone:</strong> ${validatedData.phone || 'Not provided'}</p>
<p><strong>Service:</strong> ${validatedData.service}</p>
<p><strong>Message:</strong> ${validatedData.message}</p>
        `
      };
      
      // Send email (don't wait for it to complete)
      transporter.sendMail(mailOptions)
        .then(info => {
          if (process.env.NODE_ENV !== 'production') {
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          }
        })
        .catch(err => {
          console.error('Email sending error:', err);
        });
      
      return res.status(201).json({ 
        success: true,
        message: 'Your message has been sent successfully! We will contact you soon.' 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false,
          message: 'Please check your form entries and try again.',
          errors: error.errors 
        });
      }
      return res.status(500).json({ 
        success: false,
        message: 'Something went wrong. Please try again later.' 
      });
    }
  });
  
  // Newsletter subscription
  app.post('/api/subscribe', async (req: Request, res: Response) => {
    try {
      const validatedData = insertSubscriberSchema.parse(req.body);
      
      // Check if email already exists
      const existingSubscriber = await storage.getSubscriberByEmail(validatedData.email);
      if (existingSubscriber) {
        return res.status(200).json({ 
          success: true,
          message: 'You are already subscribed to our newsletter!' 
        });
      }
      
      // Store new subscriber
      const subscriber = await storage.createSubscriber(validatedData);
      
      // Send confirmation email
      const mailOptions = {
        from: '"Bright Beginnings Newsletter" <newsletter@brightbeginnings.com>',
        to: validatedData.email,
        subject: 'Welcome to Bright Beginnings Newsletter!',
        text: `
Thank you for subscribing to the Bright Beginnings newsletter!

You'll now receive updates about our services, events, and resources for child development.

If you didn't sign up for this newsletter, please disregard this email.

Best regards,
The Bright Beginnings Team
        `,
        html: `
<h2>Welcome to the Bright Beginnings Newsletter!</h2>
<p>Thank you for subscribing to our newsletter!</p>
<p>You'll now receive updates about our services, events, and resources for child development.</p>
<p>If you didn't sign up for this newsletter, please disregard this email.</p>
<p>Best regards,<br>The Bright Beginnings Team</p>
        `
      };
      
      // Send email (don't wait for it to complete)
      transporter.sendMail(mailOptions).catch(err => {
        console.error('Email sending error:', err);
      });
      
      return res.status(201).json({ 
        success: true,
        message: 'Thank you for subscribing to our newsletter!' 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false,
          message: 'Please enter a valid email address.',
          errors: error.errors 
        });
      }
      return res.status(500).json({ 
        success: false,
        message: 'Something went wrong. Please try again later.' 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
