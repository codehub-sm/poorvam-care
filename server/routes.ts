import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertNewsletterSubscriptionSchema, insertUserSchema } from "@shared/schema";

// Email notification function
async function sendContactNotification(submission: any) {
  try {
    // Using a simple email service like Resend or Nodemailer
    // For now, we'll just log it - you can replace with actual email service
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
    
    // TODO: Replace with actual email service like:
    // - Resend (recommended for simplicity)
    // - Nodemailer with Gmail
    // - SendGrid
  } catch (error) {
    console.error("Failed to send email notification:", error);
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

  const httpServer = createServer(app);
  return httpServer;
}
