<<<<<<< HEAD
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
        from: '"Poorvam Care Website" <noreply@poorvamcare.com>',
        to: process.env.NOTIFICATION_EMAIL || 'info@poorvamcare.com',
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
        from: '"Poorvam Care Newsletter" <newsletter@poorvamcare.com>',
        to: validatedData.email,
        subject: 'Welcome to Poorvam Care Newsletter!',
        text: `
Thank you for subscribing to the Poorvam Care newsletter!

Best regards,
The Poorvam Care Team
        `,
        html: `
<h2>Welcome to the Poorvam Care Newsletter!</h2>
<p>Thank you for subscribing! We'll keep you updated with our latest news and events.</p>
<p>Best regards,<br>The Poorvam Care Team</p>
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
=======
import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertNewsletterSubscriptionSchema, insertUserSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.json({ success: true, submission });
    } catch (error) {
      console.error("Contact submission error:", error);
      res.status(400).json({ 
        success: false, 
        error: error instanceof z.ZodError ? error.errors : "Invalid data" 
      });
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSubscriptionSchema.parse(req.body);
      const subscription = await storage.createNewsletterSubscription(validatedData);
      res.json({ success: true, subscription });
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      res.status(400).json({ 
        success: false, 
        error: error instanceof z.ZodError ? error.errors : "Invalid data" 
>>>>>>> b7fb164 (new site changes)
      });
    }
  });

<<<<<<< HEAD
=======
  // User authentication endpoints
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password, role } = req.body;
      const user = await storage.getUserByEmail(email);
      
      if (!user || user.password !== password || user.role !== role) {
        return res.status(401).json({ success: false, error: "Invalid credentials" });
      }
      
      res.json({ success: true, user: { ...user, password: undefined } });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ success: false, error: "Login failed" });
    }
  });

  app.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByEmail(validatedData.email);
      
      if (existingUser) {
        return res.status(400).json({ success: false, error: "User already exists" });
      }
      
      const user = await storage.createUser(validatedData);
      res.json({ success: true, user: { ...user, password: undefined } });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(400).json({ 
        success: false, 
        error: error instanceof z.ZodError ? error.errors : "Invalid data" 
      });
    }
  });

  // Get contact submissions (admin only)
  app.get("/api/admin/contacts", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json({ success: true, submissions });
    } catch (error) {
      console.error("Get contacts error:", error);
      res.status(500).json({ success: false, error: "Failed to fetch contacts" });
    }
  });

>>>>>>> b7fb164 (new site changes)
  const httpServer = createServer(app);
  return httpServer;
}
