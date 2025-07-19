import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertNewsletterSubscriptionSchema, insertUserSchema } from "@shared/schema";
import nodemailer from "nodemailer";

// Email notification function
async function sendContactNotification(submission: any) {
  try {
    // Create transporter (you'll need to configure this with your Gmail credentials)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com', // Replace with your Gmail
        pass: process.env.EMAIL_PASS || 'your-app-password'     // Replace with your app password
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: 'poorvam.care@gmail.com', // Your business email
      subject: '🆕 New Contact Form Submission - Poorvam Care',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">👤 Contact Information</h3>
            <p><strong>Name:</strong> ${submission.firstName} ${submission.lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${submission.email}">${submission.email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${submission.phone}">${submission.phone}</a></p>
          </div>

          ${submission.childName || submission.childAge ? `
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">👶 Child Information</h3>
            ${submission.childName ? `<p><strong>Child's Name:</strong> ${submission.childName}</p>` : ''}
            ${submission.childAge ? `<p><strong>Child's Age:</strong> ${submission.childAge}</p>` : ''}
          </div>
          ` : ''}

          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">🎯 Service Details</h3>
            <p><strong>Service of Interest:</strong> ${submission.serviceType || 'Not specified'}</p>
            ${submission.message ? `<p><strong>Message:</strong> ${submission.message}</p>` : ''}
          </div>

          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e;">
              <strong>📅 Submitted:</strong> ${new Date(submission.createdAt).toLocaleString()}
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <a href="http://localhost:5173/admin" 
               style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View in Admin Panel
            </a>
          </div>
        </div>
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("📧 Email sent successfully:", info.messageId);
    
    // Also log to console for debugging
    console.log("📧 NEW CONTACT SUBMISSION:");
    console.log("From:", `${submission.firstName} ${submission.lastName}`);
    console.log("Email:", submission.email);
    console.log("Phone:", submission.phone);
    console.log("Child:", submission.childName || "N/A");
    console.log("Age:", submission.childAge || "N/A");
    console.log("Service:", submission.serviceType || "N/A");
    console.log("Message:", submission.message || "N/A");
    console.log("Timestamp:", submission.createdAt);
    console.log("----------------------------------------");
    
  } catch (error) {
    console.error("Failed to send email notification:", error);
    // Still log to console even if email fails
    console.log("📧 NEW CONTACT SUBMISSION (Email failed, but logged):");
    console.log("From:", `${submission.firstName} ${submission.lastName}`);
    console.log("Email:", submission.email);
    console.log("Phone:", submission.phone);
    console.log("Child:", submission.childName || "N/A");
    console.log("Age:", submission.childAge || "N/A");
    console.log("Service:", submission.serviceType || "N/A");
    console.log("Message:", submission.message || "N/A");
    console.log("Timestamp:", submission.createdAt);
    console.log("----------------------------------------");
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      
      // Send email notification
      await sendContactNotification(submission);
      
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
      });
    }
  });

  // User authentication endpoints
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password, role } = req.body;
      console.log("Login attempt:", { email, password: "***", role });
      
      const user = await storage.getUserByEmail(email);
      console.log("Found user:", user ? { ...user, password: "***" } : "Not found");
      
      if (!user) {
        console.log("Login failed: User not found");
        return res.status(401).json({ success: false, error: "Invalid credentials" });
      }
      
      if (user.password !== password) {
        console.log("Login failed: Password mismatch");
        return res.status(401).json({ success: false, error: "Invalid credentials" });
      }
      
      if (user.role !== role) {
        console.log("Login failed: Role mismatch", { userRole: user.role, expectedRole: role });
        return res.status(401).json({ success: false, error: "Invalid credentials" });
      }
      
      console.log("Login successful for:", email);
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

  const httpServer = createServer(app);
  return httpServer;
}
