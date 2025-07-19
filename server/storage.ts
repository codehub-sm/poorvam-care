import { 
  users, 
<<<<<<< HEAD
  type User, 
  type InsertUser, 
  contactMessages, 
  type ContactMessage, 
  type InsertContactMessage,
  subscribers,
  type Subscriber,
  type InsertSubscriber
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
=======
  contactSubmissions, 
  newsletterSubscriptions,
  type User, 
  type InsertUser,
  type ContactSubmission,
  type InsertContactSubmission,
  type NewsletterSubscription,
  type InsertNewsletterSubscription
} from "@shared/schema";

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
>>>>>>> b7fb164 (new site changes)
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
<<<<<<< HEAD
  private contactMessages: Map<number, ContactMessage>;
  private subscribers: Map<number, Subscriber>;
  private userCurrentId: number;
  private messageCurrentId: number;
  private subscriberCurrentId: number;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.subscribers = new Map();
    this.userCurrentId = 1;
    this.messageCurrentId = 1;
    this.subscriberCurrentId = 1;
=======
  private contactSubmissions: Map<number, ContactSubmission>;
  private newsletterSubscriptions: Map<number, NewsletterSubscription>;
  private currentUserId: number;
  private currentContactId: number;
  private currentNewsletterId: number;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.newsletterSubscriptions = new Map();
    this.currentUserId = 1;
    this.currentContactId = 1;
    this.currentNewsletterId = 1;
>>>>>>> b7fb164 (new site changes)
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

<<<<<<< HEAD
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
=======
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
>>>>>>> b7fb164 (new site changes)
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
<<<<<<< HEAD
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
=======
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
>>>>>>> b7fb164 (new site changes)
    this.users.set(id, user);
    return user;
  }

<<<<<<< HEAD
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.messageCurrentId++;
    const createdAt = new Date();
    const contactMessage: ContactMessage = { ...message, id, createdAt };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber> {
    const id = this.subscriberCurrentId++;
    const createdAt = new Date();
    const newSubscriber: Subscriber = { ...subscriber, id, createdAt };
    this.subscribers.set(id, newSubscriber);
    return newSubscriber;
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    return Array.from(this.subscribers.values()).find(
      (subscriber) => subscriber.email === email,
    );
=======
  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.currentContactId++;
    const submission: ContactSubmission = {
      ...insertSubmission,
      id,
      createdAt: new Date()
    };
    this.contactSubmissions.set(id, submission);
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
    return subscription;
  }

  async getNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    return Array.from(this.newsletterSubscriptions.values());
>>>>>>> b7fb164 (new site changes)
  }
}

export const storage = new MemStorage();
