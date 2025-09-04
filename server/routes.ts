import { z } from "zod";
import { storage } from "./storage.js";
import { authenticateToken } from "./middleware.js";
import { 
  insertContactSubmissionSchema, 
  insertNewsletterSubscriptionSchema, 
  insertUserSchema,
  insertPatientSchema,
  insertAppointmentSchema,
  insertSessionSchema,
  insertGoalSchema,
  insertTaskSchema,
  insertServiceTypeSchema,
  insertRecurringPatternSchema,
  insertAppointmentPatientSchema
} from "../shared/schema.js";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response, Application } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Type for contact submission
type ContactSubmission = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  childName?: string;
  childAge?: string;
  serviceType?: string;
  message?: string;
  consent: boolean;
  createdAt: Date;
};

// Type for user object
type User = {
  id: number;
  email: string;
  password: string;
  role: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  createdAt: Date;
};

// Extend Request type to include user
interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    role: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
}

// Google Sheets submission function (via Apps Script)
async function submitToGoogleSheets(submission: ContactSubmission): Promise<boolean> {
  try {
    const googleSheetsUrl = 'https://script.google.com/macros/s/AKfycbzlz71svz_5jZu8xw5_V6pHZlEPI53zPtg9Ye4UcDm8Eet8zKi4A62mlkxIxr7SgLilWg/exec';
    
    const response = await fetch(googleSheetsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: submission.firstName,
        lastName: submission.lastName,
        email: submission.email,
        phone: submission.phone,
        childName: submission.childName || '',
        childAge: submission.childAge || '',
        serviceType: submission.serviceType || '',
        message: submission.message || '',
        timestamp: new Date().toISOString(),
      }),
    });

    if (response.ok) {
      console.log("✅ Successfully submitted to Google Sheets");
      return true;
    } else {
      console.error("❌ Failed to submit to Google Sheets:", response.status);
      return false;
    }
  } catch (error) {
    console.error("❌ Error submitting to Google Sheets:", error);
    return false;
  }
}

// Simple email notification function (fallback)
async function sendContactNotification(submission: ContactSubmission): Promise<void> {
  try {
    // Log to console instead of sending email for now
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
    
    // For now, just log the submission instead of sending email
    console.log("📧 Email notification logged (email sending disabled)");
    
  } catch (error) {
    console.error("Failed to log contact notification:", error);
  }
}

async function registerRoutes(app: Application) {
  // Contact form submission
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      
      // Try Google Sheets first, fallback to console logging
      const googleSheetsSuccess = await submitToGoogleSheets(submission);
      
      if (!googleSheetsSuccess) {
        console.log("⚠️ Google Sheets submission failed, falling back to console logging");
        await sendContactNotification(submission);
      }
      
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
  app.post("/api/newsletter", async (req: Request, res: Response) => {
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
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { email, password, role } = req.body as { email: string; password: string; role: string };
      console.log("Login attempt:", { email, role });
      
      // Validate input
      if (!email || !password || !role) {
        return res.status(400).json({ 
          success: false, 
          error: "Email, password and role are required" 
        });
      }
      
      const user = await storage.getUserByEmail(email) as User | undefined;
      
      if (!user) {
        console.log("Login failed: User not found");
        return res.status(401).json({ success: false, error: "Invalid credentials" });
      }
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.log("Login failed: Password mismatch for user:", email);
        return res.status(401).json({ success: false, error: "Invalid credentials" });
      }
      
      if (user.role !== role) {
        console.log("Login failed: Role mismatch", { userRole: user.role, expectedRole: role });
        return res.status(401).json({ success: false, error: "Invalid credentials" });
      }
      
      console.log("Login successful for:", email);
      // Create token with 24 hour expiration
      const token = jwt.sign(
        { 
          id: user.id, 
          role: user.role,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        }, 
        JWT_SECRET, 
        { expiresIn: '24h' }
      );
      
      res.json({ 
        success: true, 
        token, 
        user: { 
          id: user.id,
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName
        } 
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ success: false, error: "Login failed" });
    }
  });

  app.post("/api/auth/register", async (req: Request, res: Response) => {
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
  app.get("/api/admin/contacts", authenticateToken('admin'), async (req: Request, res: Response) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json({ success: true, submissions });
    } catch (error) {
      console.error("Get contacts error:", error);
      res.status(500).json({ success: false, error: "Failed to fetch contacts" });
    }
  });

  // User management (admin only)
  app.get("/api/admin/users", authenticateToken('admin'), async (req: Request, res: Response) => {
    try {
      const users = await storage.getUsers();
      res.json({ success: true, users: users.map(u => ({ ...u, password: undefined })) });
    } catch (error) {
      console.error("Get users error:", error);
      res.status(500).json({ success: false, error: "Failed to fetch users" });
    }
  });

  // Service type management
  app.get("/api/service-types", authenticateToken(), async (req: Request, res: Response) => {
    try {
      const serviceTypes = await storage.getServiceTypes();
      res.json({ success: true, serviceTypes });
    } catch (error) {
      console.error("Get service types error:", error);
      res.status(500).json({ success: false, error: "Failed to fetch service types" });
    }
  });

  app.post("/api/service-types", authenticateToken('admin'), async (req: Request, res: Response) => {
    try {
      const validatedData = insertServiceTypeSchema.parse(req.body);
      const serviceType = await storage.createServiceType(validatedData);
      res.json({ success: true, serviceType });
    } catch (error) {
      console.error("Create service type error:", error);
      res.status(400).json({ 
        success: false, 
        error: error instanceof z.ZodError ? error.errors : "Invalid data" 
      });
    }
  });

  // Patient management endpoints
  app.get("/api/admin/patients", authenticateToken('admin'), async (req: Request, res: Response) => {
    try {
      const patients = await storage.getPatients();
      res.json({ success: true, patients });
    } catch (error) {
      console.error("Get patients error:", error);
      res.status(500).json({ success: false, error: "Failed to fetch patients" });
    }
  });

  // Get all users (for admin)
  app.get("/api/users", authenticateToken('admin'), async (req: Request, res: Response) => {
    try {
      const users = await storage.getUsers();
      res.json({ success: true, users });
    } catch (error) {
      console.error("Get users error:", error);
      res.status(500).json({ success: false, error: "Failed to fetch users" });
    }
  });

  // Get all patients (for admin)
  app.get("/api/patients", authenticateToken('admin'), async (req: Request, res: Response) => {
    try {
      const patients = await storage.getPatients();
      res.json({ success: true, patients });
    } catch (error) {
      console.error("Get patients error:", error);
      res.status(500).json({ success: false, error: "Failed to fetch patients" });
    }
  });

  app.get("/api/therapist/patients", authenticateToken('therapist'), async (req: Request, res: Response) => {
    try {
      const therapistId = req.user.id;
      const patients = await storage.getPatientsByTherapist(therapistId);
      res.json({ success: true, patients });
    } catch (error) {
      console.error("Get therapist patients error:", error);
      res.status(500).json({ success: false, error: "Failed to fetch patients" });
    }
  });

  app.post("/api/patients", authenticateToken('admin'), async (req: Request, res: Response) => {
    try {
      const validatedData = insertPatientSchema.parse(req.body);
      const patient = await storage.createPatient(validatedData);
      res.json({ success: true, patient });
    } catch (error) {
      console.error("Create patient error:", error);
      res.status(400).json({ 
        success: false, 
        error: error instanceof z.ZodError ? error.errors : "Invalid data" 
      });
    }
  });

  app.get("/api/patients/:id", authenticateToken(), async (req: Request, res: Response) => {
    try {
      const patient = await storage.getPatient(Number(req.params.id));
      if (!patient) {
        return res.status(404).json({ success: false, error: "Patient not found" });
      }
      res.json({ success: true, patient });
    } catch (error) {
      console.error("Get patient error:", error);
      res.status(500).json({ success: false, error: "Failed to fetch patient" });
    }
  });

  app.put("/api/patients/:id", authenticateToken('admin'), async (req: Request, res: Response) => {
    try {
      const patient = await storage.updatePatient(Number(req.params.id), req.body);
      if (!patient) {
        return res.status(404).json({ success: false, error: "Patient not found" });
      }
      res.json({ success: true, patient });
    } catch (error) {
      console.error("Update patient error:", error);
      res.status(500).json({ success: false, error: "Failed to update patient" });
    }
  });

  // Enhanced appointment management endpoints
  app.get("/api/appointments", authenticateToken(), async (req: Request, res: Response) => {
    try {
      const { date, therapistId, patientId, serviceTypeId } = req.query;
      
      if (date) {
        const appointments = await storage.getAppointmentsByDate(new Date(date));
        res.json({ success: true, appointments });
      } else if (therapistId) {
        const appointments = await storage.getAppointmentsByTherapist(Number(therapistId));
        res.json({ success: true, appointments });
      } else if (patientId) {
        const appointments = await storage.getAppointmentsByPatient(Number(patientId));
        res.json({ success: true, appointments });
      } else {
        const appointments = await storage.getAppointments();
        res.json({ success: true, appointments });
      }
    } catch (error) {
      console.error("Get appointments error:", error);
      res.status(500).json({ success: false, error: "Failed to fetch appointments" });
    }
  });

  app.post("/api/appointments", authenticateToken('admin'), async (req: Request, res: Response) => {
    try {
      const validatedData = insertAppointmentSchema.parse(req.body);
      
      // Handle recurring pattern if present
      let recurringPatternId = null;
      if (validatedData.isRecurring && validatedData.recurringPattern) {
        const recurringPattern = await storage.createRecurringPattern({
          frequency: validatedData.recurringPattern.frequency,
          interval: validatedData.recurringPattern.interval,
          daysOfWeek: validatedData.recurringPattern.daysOfWeek,
          endDate: validatedData.recurringPattern.endDate ? new Date(validatedData.recurringPattern.endDate) : null,
          maxOccurrences: validatedData.recurringPattern.maxOccurrences
        });
        recurringPatternId = recurringPattern.id;
      }
      
      const appointmentData = {
        ...validatedData,
        recurringPatternId,
        isRecurring: !!validatedData.isRecurring
      };
      
      const appointment = await storage.createAppointment(appointmentData);
      res.json({ success: true, appointment });
    } catch (error) {
      console.error("Create appointment error:", error);
      res.status(400).json({ 
        success: false, 
        error: error instanceof z.ZodError ? error.errors : "Invalid data" 
      });
    }
  });

  app.put("/api/appointments/:id", authenticateToken('admin'), async (req: Request, res: Response) => {
    try {
      const appointment = await storage.updateAppointment(Number(req.params.id), req.body);
      if (!appointment) {
        return res.status(404).json({ success: false, error: "Appointment not found" });
      }
      res.json({ success: true, appointment });
    } catch (error) {
      console.error("Update appointment error:", error);
      res.status(500).json({ success: false, error: "Failed to update appointment" });
    }
  });

  app.delete("/api/appointments/:id", authenticateToken('admin'), async (req: Request, res: Response) => {
    try {
      const deleted = await storage.deleteAppointment(Number(req.params.id));
      if (!deleted) {
        return res.status(404).json({ success: false, error: "Appointment not found" });
      }
      res.json({ success: true, message: "Appointment deleted" });
    } catch (error) {
      console.error("Delete appointment error:", error);
      res.status(500).json({ success: false, error: "Failed to delete appointment" });
    }
  });

  // Drag and drop appointment functionality
  app.put("/api/appointments/:id/move", authenticateToken('admin'), async (req: Request, res: Response) => {
    try {
      const { newTherapistId, newScheduledAt } = req.body;
      const appointment = await storage.moveAppointment(
        Number(req.params.id), 
        Number(newTherapistId), 
        new Date(newScheduledAt)
      );
      if (!appointment) {
        return res.status(404).json({ success: false, error: "Appointment not found" });
      }
      res.json({ success: true, appointment });
    } catch (error) {
      console.error("Move appointment error:", error);
      res.status(500).json({ success: false, error: "Failed to move appointment" });
    }
  });

  // Appointment patients management
  app.get("/api/appointments/:id/patients", authenticateToken(), async (req: Request, res: Response) => {
    try {
      const appointmentPatients = await storage.getAppointmentPatients(Number(req.params.id));
      res.json({ success: true, appointmentPatients });
    } catch (error) {
      console.error("Get appointment patients error:", error);
      res.status(500).json({ success: false, error: "Failed to fetch appointment patients" });
    }
  });

  app.post("/api/appointments/:id/patients", authenticateToken('admin'), async (req: Request, res: Response) => {
    try {
      const { patientId, isPrimary } = req.body;
      const appointmentPatient = await storage.addPatientToAppointment(
        Number(req.params.id), 
        Number(patientId), 
        isPrimary
      );
      res.json({ success: true, appointmentPatient });
    } catch (error) {
      console.error("Add patient to appointment error:", error);
      res.status(500).json({ success: false, error: "Failed to add patient to appointment" });
    }
  });

  app.delete("/api/appointments/:id/patients/:patientId", authenticateToken('admin'), async (req: Request, res: Response) => {
    try {
      const deleted = await storage.removePatientFromAppointment(
        Number(req.params.id), 
        Number(req.params.patientId)
      );
      if (!deleted) {
        return res.status(404).json({ success: false, error: "Patient not found in appointment" });
      }
      res.json({ success: true, message: "Patient removed from appointment" });
    } catch (error) {
      console.error("Remove patient from appointment error:", error);
      res.status(500).json({ success: false, error: "Failed to remove patient from appointment" });
    }
  });

  // Mark appointment as visited
  app.put("/api/appointments/:id/visit", authenticateToken('admin'), async (req: Request, res: Response) => {
    try {
      const appointmentId = Number(req.params.id);
      const { multiplePatients = false, patientIds = [] } = req.body;
      
      // First check if the appointment exists and is in scheduled status
      const existingAppointment = await storage.getAppointment(appointmentId);
      if (!existingAppointment) {
        return res.status(404).json({ success: false, error: "Appointment not found" });
      }
      
      if (existingAppointment.status !== 'scheduled') {
        return res.status(400).json({ 
          success: false, 
          error: `Cannot mark as visited: appointment is currently ${existingAppointment.status}` 
        });
      }
      
      // Update the appointment status
      const appointment = await storage.updateAppointment(appointmentId, { status: 'visited' });
      
      let sessions = [];
      
      if (multiplePatients && patientIds.length > 0) {
        // Create session records for each patient
        for (const patientId of patientIds) {
          const session = await storage.createSession({
            appointmentId: appointmentId,
            therapistId: appointment.therapistId,
            patientId: Number(patientId),
            sessionDate: new Date(),
            notes: "Session created from multi-patient appointment visit"
          });
          sessions.push(session);
        }
      } else {
        // Create a single session record for the primary patient
        const session = await storage.createSession({
          appointmentId: appointmentId,
          therapistId: appointment.therapistId,
          patientId: appointment.patientId,
          sessionDate: new Date(),
          notes: "Session created from appointment visit"
        });
        sessions.push(session);
      }
      
      res.json({ success: true, appointment, sessions });
    } catch (error) {
      console.error("Mark appointment as visited error:", error);
      res.status(500).json({ success: false, error: "Failed to mark appointment as visited" });
    }
  });

  // Cancel appointment
  app.put("/api/appointments/:id/cancel", authenticateToken('admin'), async (req: Request, res: Response) => {
    try {
      const appointmentId = Number(req.params.id);
      
      // First check if the appointment exists and is in scheduled status
      const existingAppointment = await storage.getAppointment(appointmentId);
      if (!existingAppointment) {
        return res.status(404).json({ success: false, error: "Appointment not found" });
      }
      
      if (existingAppointment.status !== 'scheduled') {
        return res.status(400).json({ 
          success: false, 
          error: `Cannot cancel: appointment is currently ${existingAppointment.status}` 
        });
      }
      
      // Update the appointment status
      const appointment = await storage.updateAppointment(appointmentId, { 
        status: 'cancelled',
        notes: existingAppointment.notes 
          ? `${existingAppointment.notes}\nCancelled on ${new Date().toLocaleString()}`
          : `Cancelled on ${new Date().toLocaleString()}`
      });
      
      res.json({ success: true, appointment });
    } catch (error) {
      console.error("Cancel appointment error:", error);
      res.status(500).json({ success: false, error: "Failed to cancel appointment" });
    }
  });

  // Update appointment color
  app.put("/api/appointments/:id/color", authenticateToken('admin'), async (req: Request, res: Response) => {
    try {
      const appointmentId = Number(req.params.id);
      const { color } = req.body;
      
      if (!color) {
        return res.status(400).json({ success: false, error: "Color is required" });
      }
      
      // First check if the appointment exists
      const existingAppointment = await storage.getAppointment(appointmentId);
      if (!existingAppointment) {
        return res.status(404).json({ success: false, error: "Appointment not found" });
      }
      
      const appointment = await storage.updateAppointment(appointmentId, { color });
      res.json({ success: true, appointment });
    } catch (error) {
      console.error("Update appointment color error:", error);
      res.status(500).json({ success: false, error: "Failed to update appointment color" });
    }
  });

  // Copy recurring appointments
  app.post("/api/appointments/:id/copy-recurring", authenticateToken('admin'), async (req: Request, res: Response) => {
    try {
      const { frequency, interval, endDate, maxOccurrences } = req.body;
      const originalAppointment = await storage.getAppointment(Number(req.params.id));
      if (!originalAppointment) {
        return res.status(404).json({ success: false, error: "Appointment not found" });
      }

      // Create recurring pattern
      const recurringPattern = await storage.createRecurringPattern({
        frequency,
        interval,
        daysOfWeek: [],
        endDate: endDate ? new Date(endDate) : null,
        maxOccurrences
      });

      // Create recurring appointments
      const appointments = await storage.createRecurringAppointments(
        Number(req.params.id),
        recurringPattern.id
      );

      res.json({ success: true, appointments });
    } catch (error) {
      console.error("Copy recurring appointments error:", error);
      res.status(500).json({ success: false, error: "Failed to copy recurring appointments" });
    }
  });

  // Session management endpoints
  app.get("/api/sessions", authenticateToken(), async (req: Request, res: Response) => {
    try {
      const { patientId, therapistId } = req.query;
      
      if (patientId) {
        const sessions = await storage.getSessionsByPatient(Number(patientId));
        res.json({ success: true, sessions });
      } else if (therapistId) {
        const sessions = await storage.getSessionsByTherapist(Number(therapistId));
        res.json({ success: true, sessions });
      } else {
        // Return all sessions when no filter is provided
        const sessions = await storage.getSessions();
        res.json({ success: true, sessions });
      }
    } catch (error) {
      console.error("Get sessions error:", error);
      res.status(500).json({ success: false, error: "Failed to fetch sessions" });
    }
  });

  app.post("/api/sessions", authenticateToken('therapist'), async (req: Request, res: Response) => {
    try {
      const validatedData = insertSessionSchema.parse(req.body);
      const session = await storage.createSession(validatedData);
      res.json({ success: true, session });
    } catch (error) {
      console.error("Create session error:", error);
      res.status(400).json({ 
        success: false, 
        error: error instanceof z.ZodError ? error.errors : "Invalid data" 
      });
    }
  });

  app.put("/api/sessions/:id", authenticateToken('therapist'), async (req: Request, res: Response) => {
    try {
      const session = await storage.updateSession(Number(req.params.id), req.body);
      if (!session) {
        return res.status(404).json({ success: false, error: "Session not found" });
      }
      res.json({ success: true, session });
    } catch (error) {
      console.error("Update session error:", error);
      res.status(500).json({ success: false, error: "Failed to update session" });
    }
  });

  // Goal management endpoints
  app.get("/api/goals", authenticateToken(), async (req: Request, res: Response) => {
    try {
      const { patientId } = req.query;
      if (!patientId) {
        return res.status(400).json({ success: false, error: "patientId required" });
      }
      const goals = await storage.getGoalsByPatient(Number(patientId));
      res.json({ success: true, goals });
    } catch (error) {
      console.error("Get goals error:", error);
      res.status(500).json({ success: false, error: "Failed to fetch goals" });
    }
  });

  app.post("/api/goals", authenticateToken('therapist'), async (req: Request, res: Response) => {
    try {
      const validatedData = insertGoalSchema.parse(req.body);
      const goal = await storage.createGoal(validatedData);
      res.json({ success: true, goal });
    } catch (error) {
      console.error("Create goal error:", error);
      res.status(400).json({ 
        success: false, 
        error: error instanceof z.ZodError ? error.errors : "Invalid data" 
      });
    }
  });

  app.put("/api/goals/:id", authenticateToken('therapist'), async (req: Request, res: Response) => {
    try {
      const goal = await storage.updateGoal(Number(req.params.id), req.body);
      if (!goal) {
        return res.status(404).json({ success: false, error: "Goal not found" });
      }
      res.json({ success: true, goal });
    } catch (error) {
      console.error("Update goal error:", error);
      res.status(500).json({ success: false, error: "Failed to update goal" });
    }
  });

  // Payment management endpoints
  app.post("/api/payments", authenticateToken('admin'), async (req: Request, res: Response) => {
    try {
      const { appointmentId, amount, method, notes, paymentDate } = req.body;
      
      // Validate required fields
      if (!appointmentId || !amount) {
        return res.status(400).json({ success: false, error: "Appointment ID and amount are required" });
      }
      
      // Check if appointment exists
      const appointment = await storage.getAppointment(Number(appointmentId));
      if (!appointment) {
        return res.status(404).json({ success: false, error: "Appointment not found" });
      }
      
      // Create payment record
      const payment = await storage.createPayment({
        appointmentId: Number(appointmentId),
        amount: Number(amount),
        method: method || 'cash',
        notes: notes || null,
        paymentDate: paymentDate ? new Date(paymentDate) : new Date(),
        createdAt: new Date()
      });
      
      // Update appointment to mark as paid
      await storage.updateAppointment(Number(appointmentId), { 
        isPaid: true,
        paymentId: payment.id
      });
      
      res.json({ success: true, payment });
    } catch (error) {
      console.error("Create payment error:", error);
      res.status(500).json({ success: false, error: "Failed to create payment" });
    }
  });
  
  app.get("/api/payments", authenticateToken('admin'), async (req: Request, res: Response) => {
    try {
      const { appointmentId, patientId } = req.query;
      
      if (appointmentId) {
        const payments = await storage.getPaymentsByAppointment(Number(appointmentId));
        res.json({ success: true, payments });
      } else if (patientId) {
        const payments = await storage.getPaymentsByPatient(Number(patientId));
        res.json({ success: true, payments });
      } else {
        const payments = await storage.getPayments();
        res.json({ success: true, payments });
      }
    } catch (error) {
      console.error("Get payments error:", error);
      res.status(500).json({ success: false, error: "Failed to fetch payments" });
    }
  });

  // Task management endpoints
  app.get("/api/tasks", authenticateToken(), async (req: Request, res: Response) => {
    try {
      const { patientId, assignedTo } = req.query;
      
      if (patientId) {
        const tasks = await storage.getTasksByPatient(Number(patientId));
        res.json({ success: true, tasks });
      } else if (assignedTo) {
        const tasks = await storage.getTasksByAssignedTo(Number(assignedTo));
        res.json({ success: true, tasks });
      } else {
        res.status(400).json({ success: false, error: "patientId or assignedTo required" });
      }
    } catch (error) {
      console.error("Get tasks error:", error);
      res.status(500).json({ success: false, error: "Failed to fetch tasks" });
    }
  });

  app.post("/api/tasks", authenticateToken(), async (req: Request, res: Response) => {
    try {
      const validatedData = insertTaskSchema.parse(req.body);
      const task = await storage.createTask(validatedData);
      res.json({ success: true, task });
    } catch (error) {
      console.error("Create task error:", error);
      res.status(400).json({ 
        success: false, 
        error: error instanceof z.ZodError ? error.errors : "Invalid data" 
      });
    }
  });

  app.put("/api/tasks/:id", authenticateToken(), async (req: Request, res: Response) => {
    try {
      const task = await storage.updateTask(Number(req.params.id), req.body);
      if (!task) {
        return res.status(404).json({ success: false, error: "Task not found" });
      }
      res.json({ success: true, task });
    } catch (error) {
      console.error("Update task error:", error);
      res.status(500).json({ success: false, error: "Failed to update task" });
    }
  });

  // Admin dashboard summary
  app.get("/api/admin/summary", authenticateToken('admin'), async (req: Request, res: Response) => {
    try {
      const patients = await storage.getPatients();
      const appointments = await storage.getAppointments();
      const therapists = await storage.getUsersByRole("therapist");
      const serviceTypes = await storage.getServiceTypes();
      const sessions = await storage.getSessions();
      const contacts = await storage.getContactSubmissions();
      
      // Get today's date with time set to 00:00:00
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Get tomorrow's date with time set to 00:00:00
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      // Get appointments for today
      const todayAppointments = appointments.filter(appointment => {
        const appointmentDate = new Date(appointment.scheduledAt);
        appointmentDate.setHours(0, 0, 0, 0);
        return appointmentDate.getTime() === today.getTime();
      });
      
      // Get upcoming appointments (scheduled for future dates)
      const upcomingAppointments = appointments.filter(appointment => {
        const appointmentDate = new Date(appointment.scheduledAt);
        return appointmentDate > new Date() && appointment.status === 'scheduled';
      });
      
      // Get this week's appointments
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay()); // Start of current week (Sunday)
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // End of current week (Saturday)
      
      const thisWeekAppointments = appointments.filter(appointment => {
        const appointmentDate = new Date(appointment.scheduledAt);
        appointmentDate.setHours(0, 0, 0, 0);
        return appointmentDate >= startOfWeek && appointmentDate <= endOfWeek;
      });
      
      // Recent contact submissions (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const recentContacts = contacts.filter(contact => new Date(contact.createdAt) >= thirtyDaysAgo);
      
      const summary = {
        totalPatients: patients.length,
        activePatients: patients.filter(p => p.status === "active").length,
        inactivePatients: patients.filter(p => p.status === "inactive").length,
        totalTherapists: therapists.length,
        totalAppointments: appointments.length,
        todayAppointments: todayAppointments.length,
        upcomingAppointments: upcomingAppointments.length,
        thisWeekAppointments: thisWeekAppointments.length,
        scheduledAppointments: appointments.filter(a => a.status === "scheduled").length,
        completedAppointments: appointments.filter(a => a.status === "visited").length,
        cancelledAppointments: appointments.filter(a => a.status === "cancelled").length,
        totalServiceTypes: serviceTypes.length,
        totalSessions: sessions.length,
        recentContacts: recentContacts.length,
      };
      
      res.json({ success: true, summary });
    } catch (error) {
      console.error("Get summary error:", error);
      res.status(500).json({ success: false, error: "Failed to fetch summary" });
    }
  });

  // Therapist schedule and workload
  app.get("/api/admin/therapists/:id/schedule", authenticateToken('admin'), async (req: Request, res: Response) => {
    try {
      const therapistId = Number(req.params.id);
      const { date } = req.query;
      
      const appointments = date 
        ? await storage.getAppointmentsByDate(new Date(date))
        : await storage.getAppointmentsByTherapist(therapistId);
      
      const therapistAppointments = appointments.filter(a => a.therapistId === therapistId);
      const patients = await storage.getPatientsByTherapist(therapistId);
      
      res.json({ 
        success: true, 
        appointments: therapistAppointments,
        patients: patients.length,
        workload: therapistAppointments.length
      });
    } catch (error) {
      console.error("Get therapist schedule error:", error);
      res.status(500).json({ success: false, error: "Failed to fetch therapist schedule" });
    }
  });

  const httpServer = new (await import("http")).Server(app);
  return httpServer;
}

export { registerRoutes };
