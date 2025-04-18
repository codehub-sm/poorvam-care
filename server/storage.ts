import { 
  users, 
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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
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
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

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
  }
}

export const storage = new MemStorage();
