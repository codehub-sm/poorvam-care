import { 
  users, 
  contactSubmissions, 
  newsletterSubscriptions,
  type User, 
  type InsertUser,
  type ContactSubmission,
  type InsertContactSubmission,
  type NewsletterSubscription,
  type InsertNewsletterSubscription
} from "@shared/schema";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";

// File storage paths
const DATA_DIR = join(__dirname, "data");
const CONTACTS_FILE = join(DATA_DIR, "contacts.json");
const USERS_FILE = join(DATA_DIR, "users.json");
const NEWSLETTER_FILE = join(DATA_DIR, "newsletter.json");

// Ensure data directory exists
if (!existsSync(DATA_DIR)) {
  try {
    require("fs").mkdirSync(DATA_DIR, { recursive: true });
  } catch (error) {
    console.warn("Could not create data directory:", error);
  }
}

// Helper functions for file operations
function saveToFile(filePath: string, data: any) {
  try {
    writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Failed to save to ${filePath}:`, error);
  }
}

function loadFromFile(filePath: string, defaultValue: any = []) {
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

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact submission methods
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  
  // Newsletter subscription methods
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  getNewsletterSubscriptions(): Promise<NewsletterSubscription[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private newsletterSubscriptions: Map<number, NewsletterSubscription>;
  private currentUserId: number;
  private currentContactId: number;
  private currentNewsletterId: number;

  constructor() {
    // Load existing data from files
    const savedContacts = loadFromFile(CONTACTS_FILE, []);
    const savedUsers = loadFromFile(USERS_FILE, []);
    const savedNewsletter = loadFromFile(NEWSLETTER_FILE, []);
    
    this.users = new Map(savedUsers.map((user: User) => [user.id, user]));
    this.contactSubmissions = new Map(savedContacts.map((contact: ContactSubmission) => [contact.id, contact]));
    this.newsletterSubscriptions = new Map(savedNewsletter.map((sub: NewsletterSubscription) => [sub.id, sub]));
    
    this.currentUserId = Math.max(1, ...Array.from(this.users.keys()), 0) + 1;
    this.currentContactId = Math.max(1, ...Array.from(this.contactSubmissions.keys()), 0) + 1;
    this.currentNewsletterId = Math.max(1, ...Array.from(this.newsletterSubscriptions.keys()), 0) + 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      firstName: insertUser.firstName || null,
      lastName: insertUser.lastName || null,
      createdAt: new Date()
    };
    this.users.set(id, user);
    saveToFile(USERS_FILE, Array.from(this.users.values()));
    return user;
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.currentContactId++;
    const submission: ContactSubmission = {
      ...insertSubmission,
      id,
      message: insertSubmission.message || null,
      childName: insertSubmission.childName || null,
      childAge: insertSubmission.childAge || null,
      serviceType: insertSubmission.serviceType || null,
      createdAt: new Date()
    };
    this.contactSubmissions.set(id, submission);
    saveToFile(CONTACTS_FILE, Array.from(this.contactSubmissions.values()));
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }

  async createNewsletterSubscription(insertSubscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const id = this.currentNewsletterId++;
    const subscription: NewsletterSubscription = {
      ...insertSubscription,
      id,
      createdAt: new Date()
    };
    this.newsletterSubscriptions.set(id, subscription);
    saveToFile(NEWSLETTER_FILE, Array.from(this.newsletterSubscriptions.values()));
    return subscription;
  }

  async getNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    return Array.from(this.newsletterSubscriptions.values());
  }
}

export const storage = new MemStorage();
