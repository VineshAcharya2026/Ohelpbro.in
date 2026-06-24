CREATE TABLE IF NOT EXISTS `users` (
  `id` text PRIMARY KEY NOT NULL,
  `email` text NOT NULL,
  `password_hash` text NOT NULL,
  `role` text NOT NULL,
  `status` text DEFAULT 'pending' NOT NULL,
  `full_name` text NOT NULL,
  `phone` text NOT NULL,
  `company_name` text,
  `services` text,
  `employee_type` text,
  `experience` text,
  `about` text,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS `users_email_unique` ON `users` (`email`);

CREATE TABLE IF NOT EXISTS `sessions` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL,
  `expires_at` integer NOT NULL,
  `created_at` integer NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade
);

CREATE TABLE IF NOT EXISTS `leads` (
  `id` text PRIMARY KEY NOT NULL,
  `type` text NOT NULL,
  `status` text DEFAULT 'new' NOT NULL,
  `payload` text NOT NULL,
  `user_id` text,
  `assigned_to` text,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE set null,
  FOREIGN KEY (`assigned_to`) REFERENCES `users`(`id`) ON DELETE set null
);
