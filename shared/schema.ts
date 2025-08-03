import { pgTable, text, serial, integer, boolean, timestamp, date, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull(), // 'admin', 'therapist', 'parent'
  firstName: text("first_name"),
  lastName: text("last_name"),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow(),
});

const patients = pgTable("patients", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email"),
  phone: text("phone"),
  dateOfBirth: timestamp("date_of_birth"),
  parentId: integer("parent_id").references(() => users.id),
  primaryTherapistId: integer("primary_therapist_id").references(() => users.id),
  status: text("status").notNull().default("active"), // 'active', 'inactive'
  diagnosis: text("diagnosis"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Service types table
const serviceTypes = pgTable("service_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // 'Speech Therapy', 'Occupational Therapy', 'Behavioral Therapy'
  description: text("description"),
  defaultDuration: integer("default_duration").notNull(), // minutes
  color: text("color"), // for calendar display
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Recurring appointment patterns
const recurringPatterns = pgTable("recurring_patterns", {
  id: serial("id").primaryKey(),
  frequency: text("frequency").notNull(), // 'daily', 'weekly', 'monthly'
  interval: integer("interval").notNull(), // every X days/weeks/months
  daysOfWeek: json("days_of_week"), // [1,3,5] for Monday, Wednesday, Friday
  endDate: timestamp("end_date"),
  maxOccurrences: integer("max_occurrences"),
  createdAt: timestamp("created_at").defaultNow(),
});

const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").references(() => patients.id),
  therapistId: integer("therapist_id").references(() => users.id),
  serviceTypeId: integer("service_type_id").references(() => serviceTypes.id),
  scheduledAt: timestamp("scheduled_at").notNull(),
  duration: integer("duration").notNull(), // minutes
  status: text("status").notNull().default("scheduled"), // 'scheduled', 'visited', 'cancelled', 'rescheduled'
  isRecurring: boolean("is_recurring").default(false),
  recurringPatternId: integer("recurring_pattern_id").references(() => recurringPatterns.id),
  parentAppointmentId: integer("parent_appointment_id").references(() => appointments.id), // for recurring series
  isWalkIn: boolean("is_walk_in").default(false),
  penalty: boolean("penalty").default(false),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Multiple patients per session
const appointmentPatients = pgTable("appointment_patients", {
  id: serial("id").primaryKey(),
  appointmentId: integer("appointment_id").references(() => appointments.id),
  patientId: integer("patient_id").references(() => patients.id),
  isPrimary: boolean("is_primary").default(false), // primary patient for the appointment
  createdAt: timestamp("created_at").defaultNow(),
});

const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  appointmentId: integer("appointment_id").references(() => appointments.id),
  therapistId: integer("therapist_id").references(() => users.id),
  patientId: integer("patient_id").references(() => patients.id),
  sessionDate: timestamp("session_date").notNull(),
  notes: text("notes"),
  progress: text("progress"),
  goals: text("goals"),
  createdAt: timestamp("created_at").defaultNow(),
});

const goals = pgTable("goals", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").references(() => patients.id),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").notNull().default("active"), // 'active', 'completed', 'archived'
  targetDate: timestamp("target_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").references(() => patients.id),
  assignedTo: integer("assigned_to").references(() => users.id),
  title: text("title").notNull(),
  description: text("description"),
  goalId: integer("goal_id").references(() => goals.id),
  status: text("status").notNull().default("pending"), // 'pending', 'completed'
  dueDate: timestamp("due_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  childName: text("child_name"),
  childAge: text("child_age"),
  serviceType: text("service_type"),
  message: text("message"),
  consent: boolean("consent").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  appointmentId: integer("appointment_id").references(() => appointments.id),
  amount: integer("amount").notNull(),
  method: text("method").notNull().default("cash"), // 'cash', 'card', 'upi', 'bank_transfer', 'other'
  notes: text("notes"),
  paymentDate: timestamp("payment_date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

const insertPatientSchema = createInsertSchema(patients).omit({
  id: true,
  createdAt: true,
});

const insertServiceTypeSchema = createInsertSchema(serviceTypes).omit({
  id: true,
  createdAt: true,
});

const insertRecurringPatternSchema = createInsertSchema(recurringPatterns).omit({
  id: true,
  createdAt: true,
});

const insertAppointmentSchema = createInsertSchema(appointments).omit({
  id: true,
  createdAt: true,
  scheduledAt: true,
}).extend({
  scheduledAt: z.string().transform((val) => new Date(val)),
  recurringPattern: z.object({
    frequency: z.string(),
    interval: z.number(),
    daysOfWeek: z.array(z.number()),
    endDate: z.string().optional(),
    maxOccurrences: z.number()
  }).optional()
});

const insertAppointmentPatientSchema = createInsertSchema(appointmentPatients).omit({
  id: true,
  createdAt: true,
});

const insertSessionSchema = createInsertSchema(sessions).omit({
  id: true,
  createdAt: true,
});

const insertGoalSchema = createInsertSchema(goals).omit({
  id: true,
  createdAt: true,
});

const insertTaskSchema = createInsertSchema(tasks).omit({
  id: true,
  createdAt: true,
});

const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
});

const insertNewsletterSubscriptionSchema = createInsertSchema(newsletterSubscriptions).omit({
  id: true,
  createdAt: true,
});

const insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true,
});

export {
  users,
  patients,
  serviceTypes,
  recurringPatterns,
  appointments,
  appointmentPatients,
  sessions,
  goals,
  tasks,
  contactSubmissions,
  newsletterSubscriptions,
  payments,
  insertUserSchema,
  insertPatientSchema,
  insertServiceTypeSchema,
  insertRecurringPatternSchema,
  insertAppointmentSchema,
  insertAppointmentPatientSchema,
  insertSessionSchema,
  insertGoalSchema,
  insertTaskSchema,
  insertContactSubmissionSchema,
  insertNewsletterSubscriptionSchema,
  insertPaymentSchema,
};
