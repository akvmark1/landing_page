
import { users, type User, type InsertUser } from "@shared/schema";
import bcrypt from "bcrypt";

export interface AdminUser {
  id: number;
  username: string;
  password: string;
}

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAdminUser(): Promise<AdminUser | undefined>;
  updateAdminPassword(newPassword: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private adminUser: AdminUser | null;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
    this.adminUser = null;
    this.initializeAdminUser();
  }

  private async initializeAdminUser() {
    // Hash the default password
    const hashedPassword = await bcrypt.hash("akashvahini2025", 10);
    this.adminUser = {
      id: 1,
      username: "admin",
      password: hashedPassword,
    };
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
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAdminUser(): Promise<AdminUser | undefined> {
    if (!this.adminUser) {
      await this.initializeAdminUser();
    }
    return this.adminUser || undefined;
  }

  async updateAdminPassword(newPassword: string): Promise<boolean> {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      if (this.adminUser) {
        this.adminUser.password = hashedPassword;
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating password:", error);
      return false;
    }
  }
}

export const storage = new MemStorage();
