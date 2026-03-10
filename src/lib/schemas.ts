import { z } from "zod";

export const callbackFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  agency_name: z.string().min(2, "Agency name is required"),
  phone: z.string().regex(/^\+971\d{8,9}$/, "Enter a valid UAE number (+971XXXXXXXXX)"),
  preferred_time: z.string().min(1, "Please select a preferred time"),
});

export const waitlistFormSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  agency_name: z.string().optional(),
});

export type CallbackFormData = z.infer<typeof callbackFormSchema>;
export type WaitlistFormData = z.infer<typeof waitlistFormSchema>;
