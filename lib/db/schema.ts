import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role", { enum: ["admin", "customer", "professional"] }).notNull(),
  status: text("status", { enum: ["pending", "active", "suspended"] })
    .notNull()
    .default("pending"),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  companyName: text("company_name"),
  services: text("services"), // JSON array string
  employeeType: text("employee_type"),
  experience: text("experience"),
  about: text("about"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const leads = sqliteTable("leads", {
  id: text("id").primaryKey(),
  type: text("type", {
    enum: ["contact", "customer_registration", "professional_registration"],
  }).notNull(),
  status: text("status", {
    enum: ["new", "contacted", "assigned", "closed"],
  })
    .notNull()
    .default("new"),
  payload: text("payload").notNull(), // JSON
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  assignedTo: text("assigned_to").references(() => users.id, {
    onDelete: "set null",
  }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;

export type UserRole = User["role"];
export type UserStatus = User["status"];
export type LeadType = Lead["type"];
export type LeadStatus = Lead["status"];
