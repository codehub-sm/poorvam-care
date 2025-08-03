import bcrypt from "bcryptjs";
import { 
  users, 
  contactSubmissions, 
  newsletterSubscriptions,
  patients,
  appointments,
  sessions,
  goals,
  tasks,
  serviceTypes,
  recurringPatterns,
  appointmentPatients,
} from "../shared/schema.js";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// File storage paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_DIR = join(__dirname, "data");
const CONTACTS_FILE = join(DATA_DIR, "contacts.json");
const USERS_FILE = join(DATA_DIR, "users.json");
const NEWSLETTER_FILE = join(DATA_DIR, "newsletter.json");
const PATIENTS_FILE = join(DATA_DIR, "patients.json");
const APPOINTMENTS_FILE = join(DATA_DIR, "appointments.json");
const SESSIONS_FILE = join(DATA_DIR, "sessions.json");
const GOALS_FILE = join(DATA_DIR, "goals.json");
const TASKS_FILE = join(DATA_DIR, "tasks.json");
const SERVICE_TYPES_FILE = join(DATA_DIR, "service_types.json");
const RECURRING_PATTERNS_FILE = join(DATA_DIR, "recurring_patterns.json");
const APPOINTMENT_PATIENTS_FILE = join(DATA_DIR, "appointment_patients.json");
const PAYMENTS_FILE = join(DATA_DIR, "payments.json");

// Ensure data directory exists
if (!existsSync(DATA_DIR)) {
  try {
    require("fs").mkdirSync(DATA_DIR, { recursive: true });
  } catch (error) {
    console.warn("Could not create data directory:", error);
  }
}

// Helper functions for file operations
function saveToFile(filePath, data) {
  try {
    writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Failed to save to ${filePath}:`, error);
  }
}

function loadFromFile(filePath, defaultValue = []) {
  try {
    if (existsSync(filePath)) {
      const data = readFileSync(filePath, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error(`Failed to load from ${filePath}:`, error);
  }
  return defaultValue;
}

class MemStorage {
  constructor() {
    // Load existing data from files
    const savedContacts = loadFromFile(CONTACTS_FILE, []);
    const savedUsers = loadFromFile(USERS_FILE, []);
    const savedNewsletter = loadFromFile(NEWSLETTER_FILE, []);
    const savedPatients = loadFromFile(PATIENTS_FILE, []);
    const savedAppointments = loadFromFile(APPOINTMENTS_FILE, []);
    const savedSessions = loadFromFile(SESSIONS_FILE, []);
    const savedGoals = loadFromFile(GOALS_FILE, []);
    const savedTasks = loadFromFile(TASKS_FILE, []);
    const savedServiceTypes = loadFromFile(SERVICE_TYPES_FILE, []);
    const savedRecurringPatterns = loadFromFile(RECURRING_PATTERNS_FILE, []);
    const savedAppointmentPatients = loadFromFile(APPOINTMENT_PATIENTS_FILE, []);
    const savedPayments = loadFromFile(PAYMENTS_FILE, []);
    
    this.users = new Map(savedUsers.map((user) => [user.id, user]));
    this.contactSubmissions = new Map(savedContacts.map((contact) => [contact.id, contact]));
    this.newsletterSubscriptions = new Map(savedNewsletter.map((sub) => [sub.id, sub]));
    this.patients = new Map(savedPatients.map((patient) => [patient.id, patient]));
    this.appointments = new Map(savedAppointments.map((appointment) => [appointment.id, appointment]));
    this.sessions = new Map(savedSessions.map((session) => [session.id, session]));
    this.goals = new Map(savedGoals.map((goal) => [goal.id, goal]));
    this.tasks = new Map(savedTasks.map((task) => [task.id, task]));
    this.serviceTypes = new Map(savedServiceTypes.map((serviceType) => [serviceType.id, serviceType]));
    this.recurringPatterns = new Map(savedRecurringPatterns.map((pattern) => [pattern.id, pattern]));
    this.appointmentPatients = new Map(savedAppointmentPatients.map((ap) => [ap.id, ap]));
    this.payments = new Map(savedPayments.map((payment) => [payment.id, payment]));
    
    this.currentUserId = Math.max(1, ...Array.from(this.users.keys()), 0) + 1;
    this.currentContactId = Math.max(1, ...Array.from(this.contactSubmissions.keys()), 0) + 1;
    this.currentNewsletterId = Math.max(1, ...Array.from(this.newsletterSubscriptions.keys()), 0) + 1;
    this.currentPatientId = Math.max(1, ...Array.from(this.patients.keys()), 0) + 1;
    this.currentAppointmentId = Math.max(1, ...Array.from(this.appointments.keys()), 0) + 1;
    this.currentSessionId = Math.max(1, ...Array.from(this.sessions.keys()), 0) + 1;
    this.currentGoalId = Math.max(1, ...Array.from(this.goals.keys()), 0) + 1;
    this.currentTaskId = Math.max(1, ...Array.from(this.tasks.keys()), 0) + 1;
    this.currentServiceTypeId = Math.max(1, ...Array.from(this.serviceTypes.keys()), 0) + 1;
    this.currentRecurringPatternId = Math.max(1, ...Array.from(this.recurringPatterns.keys()), 0) + 1;
    this.currentAppointmentPatientId = Math.max(1, ...Array.from(this.appointmentPatients.keys()), 0) + 1;
    this.currentPaymentId = Math.max(1, ...Array.from(this.payments.keys()), 0) + 1;
  }

  // User methods
  async getUser(id) {
    return this.users.get(id);
  }

  async getUserByEmail(email) {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser) {
    const id = this.currentUserId++;
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const user = { 
      id,
      email: insertUser.email,
      password: hashedPassword,
      role: insertUser.role,
      firstName: insertUser.firstName || null,
      lastName: insertUser.lastName || null,
      phone: insertUser.phone || null,
      createdAt: new Date()
    };
    this.users.set(id, user);
    saveToFile(USERS_FILE, Array.from(this.users.values()));
    return user;
  }

  async getUsers() {
    return Array.from(this.users.values());
  }

  async getUsersByRole(role) {
    return Array.from(this.users.values()).filter(user => user.role === role);
  }

  // Patient methods
  async getPatient(id) {
    return this.patients.get(id);
  }

  async createPatient(insertPatient) {
    const id = this.currentPatientId++;
    const patient = {
      id,
      firstName: insertPatient.firstName,
      lastName: insertPatient.lastName,
      email: insertPatient.email || null,
      phone: insertPatient.phone || null,
      dateOfBirth: insertPatient.dateOfBirth || null,
      parentId: insertPatient.parentId || null,
      primaryTherapistId: insertPatient.primaryTherapistId || null,
      status: insertPatient.status || "active",
      diagnosis: insertPatient.diagnosis || null,
      notes: insertPatient.notes || null,
      createdAt: new Date()
    };
    this.patients.set(id, patient);
    saveToFile(PATIENTS_FILE, Array.from(this.patients.values()));
    return patient;
  }

  async getPatients() {
    return Array.from(this.patients.values());
  }

  async getPatientsByTherapist(therapistId) {
    return Array.from(this.patients.values()).filter(patient => patient.primaryTherapistId === therapistId);
  }

  async updatePatient(id, updates) {
    const patient = this.patients.get(id);
    if (!patient) return undefined;
    
    const updatedPatient = { ...patient, ...updates };
    this.patients.set(id, updatedPatient);
    saveToFile(PATIENTS_FILE, Array.from(this.patients.values()));
    return updatedPatient;
  }

  // Service type methods
  async getServiceType(id) {
    return this.serviceTypes.get(id);
  }

  async createServiceType(insertServiceType) {
    const id = this.currentServiceTypeId++;
    const serviceType = {
      id,
      name: insertServiceType.name,
      defaultDuration: insertServiceType.defaultDuration,
      description: insertServiceType.description || null,
      color: insertServiceType.color || null,
      isActive: insertServiceType.isActive ?? true,
      createdAt: new Date()
    };
    this.serviceTypes.set(id, serviceType);
    saveToFile(SERVICE_TYPES_FILE, Array.from(this.serviceTypes.values()));
    return serviceType;
  }

  async getServiceTypes() {
    return Array.from(this.serviceTypes.values());
  }

  async updateServiceType(id, updates) {
    const serviceType = this.serviceTypes.get(id);
    if (!serviceType) return undefined;
    
    const updatedServiceType = { ...serviceType, ...updates };
    this.serviceTypes.set(id, updatedServiceType);
    saveToFile(SERVICE_TYPES_FILE, Array.from(this.serviceTypes.values()));
    return updatedServiceType;
  }

  // Recurring pattern methods
  async getRecurringPattern(id) {
    return this.recurringPatterns.get(id);
  }

  async createRecurringPattern(insertPattern) {
    const id = this.currentRecurringPatternId++;
    const pattern = {
      id,
      frequency: insertPattern.frequency,
      interval: insertPattern.interval,
      daysOfWeek: insertPattern.daysOfWeek || null,
      endDate: insertPattern.endDate || null,
      maxOccurrences: insertPattern.maxOccurrences || null,
      createdAt: new Date()
    };
    this.recurringPatterns.set(id, pattern);
    saveToFile(RECURRING_PATTERNS_FILE, Array.from(this.recurringPatterns.values()));
    return pattern;
  }

  async getRecurringPatterns() {
    return Array.from(this.recurringPatterns.values());
  }

  // Appointment methods
  async getAppointment(id) {
    return this.appointments.get(id);
  }

  async createAppointment(insertAppointment) {
    const id = this.currentAppointmentId++;
    const appointment = {
      id,
      patientId: insertAppointment.patientId || null,
      therapistId: insertAppointment.therapistId || null,
      serviceTypeId: insertAppointment.serviceTypeId || null,
      scheduledAt: insertAppointment.scheduledAt,
      duration: insertAppointment.duration,
      status: insertAppointment.status || "scheduled",
      isRecurring: insertAppointment.isRecurring || false,
      recurringPatternId: insertAppointment.recurringPatternId || null,
      parentAppointmentId: insertAppointment.parentAppointmentId || null,
      isWalkIn: insertAppointment.isWalkIn || false,
      penalty: insertAppointment.penalty || false,
      notes: insertAppointment.notes || null,
      createdAt: new Date()
    };
    this.appointments.set(id, appointment);
    saveToFile(APPOINTMENTS_FILE, Array.from(this.appointments.values()));
    return appointment;
  }

  async getAppointments() {
    return Array.from(this.appointments.values());
  }

  async getAppointmentsByDate(date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    return Array.from(this.appointments.values()).filter(appointment => {
      const appointmentDate = new Date(appointment.scheduledAt);
      return appointmentDate >= startOfDay && appointmentDate <= endOfDay;
    });
  }

  async getAppointmentsByTherapist(therapistId) {
    return Array.from(this.appointments.values()).filter(appointment => appointment.therapistId === therapistId);
  }

  async getAppointmentsByPatient(patientId) {
    return Array.from(this.appointments.values()).filter(appointment => appointment.patientId === patientId);
  }

  async updateAppointment(id, updates) {
    const appointment = this.appointments.get(id);
    if (!appointment) return undefined;
    
    const updatedAppointment = { ...appointment, ...updates };
    this.appointments.set(id, updatedAppointment);
    saveToFile(APPOINTMENTS_FILE, Array.from(this.appointments.values()));
    return updatedAppointment;
  }

  async deleteAppointment(id) {
    const deleted = this.appointments.delete(id);
    if (deleted) {
      saveToFile(APPOINTMENTS_FILE, Array.from(this.appointments.values()));
    }
    return deleted;
  }

  async moveAppointment(appointmentId, newTherapistId, newScheduledAt) {
    const appointment = this.appointments.get(appointmentId);
    if (!appointment) return undefined;
    
    const updatedAppointment = { 
      ...appointment, 
      therapistId: newTherapistId,
      scheduledAt: newScheduledAt,
      status: "rescheduled"
    };
    this.appointments.set(appointmentId, updatedAppointment);
    saveToFile(APPOINTMENTS_FILE, Array.from(this.appointments.values()));
    return updatedAppointment;
  }

  // Appointment patient methods
  async getAppointmentPatients(appointmentId) {
    return Array.from(this.appointmentPatients.values()).filter(ap => ap.appointmentId === appointmentId);
  }

  async addPatientToAppointment(appointmentId, patientId, isPrimary = false) {
    const id = this.currentAppointmentPatientId++;
    const appointmentPatient = {
      id,
      appointmentId,
      patientId,
      isPrimary,
      createdAt: new Date()
    };
    this.appointmentPatients.set(id, appointmentPatient);
    saveToFile(APPOINTMENT_PATIENTS_FILE, Array.from(this.appointmentPatients.values()));
    return appointmentPatient;
  }

  async removePatientFromAppointment(appointmentId, patientId) {
    const appointmentPatient = Array.from(this.appointmentPatients.values()).find(
      ap => ap.appointmentId === appointmentId && ap.patientId === patientId
    );
    if (!appointmentPatient) return false;
    
    const deleted = this.appointmentPatients.delete(appointmentPatient.id);
    if (deleted) {
      saveToFile(APPOINTMENT_PATIENTS_FILE, Array.from(this.appointmentPatients.values()));
    }
    return deleted;
  }

  // Session methods
  async getSession(id) {
    return this.sessions.get(id);
  }

  async createSession(insertSession) {
    const id = this.currentSessionId++;
    const session = {
      id,
      sessionDate: insertSession.sessionDate,
      appointmentId: insertSession.appointmentId || null,
      therapistId: insertSession.therapistId || null,
      patientId: insertSession.patientId || null,
      notes: insertSession.notes || null,
      progress: insertSession.progress || null,
      goals: insertSession.goals || null,
      createdAt: new Date()
    };
    this.sessions.set(id, session);
    saveToFile(SESSIONS_FILE, Array.from(this.sessions.values()));
    return session;
  }

  async getSessionsByPatient(patientId) {
    return Array.from(this.sessions.values()).filter(session => session.patientId === patientId);
  }

  async getSessionsByTherapist(therapistId) {
    return Array.from(this.sessions.values()).filter(session => session.therapistId === therapistId);
  }
  
  async getSessions() {
    return Array.from(this.sessions.values());
  }

  async updateSession(id, updates) {
    const session = this.sessions.get(id);
    if (!session) return undefined;
    
    const updatedSession = { ...session, ...updates };
    this.sessions.set(id, updatedSession);
    saveToFile(SESSIONS_FILE, Array.from(this.sessions.values()));
    return updatedSession;
  }

  // Goal methods
  async getGoal(id) {
    return this.goals.get(id);
  }

  async createGoal(insertGoal) {
    const id = this.currentGoalId++;
    const goal = {
      id,
      title: insertGoal.title,
      patientId: insertGoal.patientId || null,
      description: insertGoal.description || null,
      status: insertGoal.status || "active",
      targetDate: insertGoal.targetDate || null,
      createdAt: new Date()
    };
    this.goals.set(id, goal);
    saveToFile(GOALS_FILE, Array.from(this.goals.values()));
    return goal;
  }

  async getGoalsByPatient(patientId) {
    return Array.from(this.goals.values()).filter(goal => goal.patientId === patientId);
  }

  async updateGoal(id, updates) {
    const goal = this.goals.get(id);
    if (!goal) return undefined;
    
    const updatedGoal = { ...goal, ...updates };
    this.goals.set(id, updatedGoal);
    saveToFile(GOALS_FILE, Array.from(this.goals.values()));
    return updatedGoal;
  }

  // Task methods
  async getTask(id) {
    return this.tasks.get(id);
  }

  async createTask(insertTask) {
    const id = this.currentTaskId++;
    const task = {
      id,
      title: insertTask.title,
      patientId: insertTask.patientId || null,
      assignedTo: insertTask.assignedTo || null,
      description: insertTask.description || null,
      goalId: insertTask.goalId || null,
      status: insertTask.status || "pending",
      dueDate: insertTask.dueDate || null,
      createdAt: new Date()
    };
    this.tasks.set(id, task);
    saveToFile(TASKS_FILE, Array.from(this.tasks.values()));
    return task;
  }

  async getTasksByPatient(patientId) {
    return Array.from(this.tasks.values()).filter(task => task.patientId === patientId);
  }

  async getTasksByAssignedTo(assignedTo) {
    return Array.from(this.tasks.values()).filter(task => task.assignedTo === assignedTo);
  }
  
  // Payment methods
  getNextId(collection) {
    return this.currentPaymentId++;
  }

  async createPayment(paymentData) {
    const id = this.getNextId(this.payments);
    const payment = { id, ...paymentData };
    this.payments.set(id, payment);
    saveToFile(PAYMENTS_FILE, Array.from(this.payments.values()));
    return payment;
  }
  
  async getPayment(id) {
    return this.payments.get(id);
  }
  
  async getPayments() {
    return Array.from(this.payments.values());
  }
  
  async getPaymentsByAppointment(appointmentId) {
    return Array.from(this.payments.values()).filter(payment => payment.appointmentId === appointmentId);
  }
  
  async getPaymentsByPatient(patientId) {
    // First get all appointments for the patient
    const patientAppointments = Array.from(this.appointments.values())
      .filter(appointment => appointment.patientId === patientId)
      .map(appointment => appointment.id);
    
    // Then get all payments for those appointments
    return Array.from(this.payments.values())
      .filter(payment => patientAppointments.includes(payment.appointmentId));
  }

  async updateTask(id, updates) {
    const task = this.tasks.get(id);
    if (!task) return undefined;
    
    const updatedTask = { ...task, ...updates };
    this.tasks.set(id, updatedTask);
    saveToFile(TASKS_FILE, Array.from(this.tasks.values()));
    return updatedTask;
  }

  // Contact submission methods
  async createContactSubmission(insertSubmission) {
    const id = this.currentContactId++;
    const submission = {
      id,
      firstName: insertSubmission.firstName,
      lastName: insertSubmission.lastName,
      email: insertSubmission.email,
      phone: insertSubmission.phone,
      consent: insertSubmission.consent,
      childName: insertSubmission.childName || null,
      childAge: insertSubmission.childAge || null,
      serviceType: insertSubmission.serviceType || null,
      message: insertSubmission.message || null,
      createdAt: new Date()
    };
    this.contactSubmissions.set(id, submission);
    saveToFile(CONTACTS_FILE, Array.from(this.contactSubmissions.values()));
    return submission;
  }

  async getContactSubmissions() {
    return Array.from(this.contactSubmissions.values());
  }

  // Newsletter subscription methods
  async createNewsletterSubscription(insertSubscription) {
    const id = this.currentNewsletterId++;
    const subscription = {
      id,
      email: insertSubscription.email,
      createdAt: new Date()
    };
    this.newsletterSubscriptions.set(id, subscription);
    saveToFile(NEWSLETTER_FILE, Array.from(this.newsletterSubscriptions.values()));
    return subscription;
  }

  async getNewsletterSubscriptions() {
    return Array.from(this.newsletterSubscriptions.values());
  }
}

const storage = new MemStorage();

export { storage };
