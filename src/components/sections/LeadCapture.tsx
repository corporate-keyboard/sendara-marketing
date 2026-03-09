"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import { demoFormSchema, waitlistFormSchema, type DemoFormData, type WaitlistFormData } from "@/lib/schemas";

function DemoForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<DemoFormData>({
    resolver: zodResolver(demoFormSchema),
  });

  const onSubmit = async (data: DemoFormData) => {
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "demo", ...data }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4"
        >
          <Check className="text-success" size={32} />
        </motion.div>
        <h3 className="font-heading font-semibold text-xl text-sendara-navy mb-2">You&apos;re in!</h3>
        <p className="font-body text-sendara-navy/60">We&apos;ll reach out within 24 hours to schedule your demo.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input {...register("name")} placeholder="Full Name" className="w-full px-4 py-3 rounded-lg border border-gray-200 font-body text-sm focus:outline-none focus:border-sendara-teal focus:ring-1 focus:ring-sendara-teal" />
        {errors.name && <p className="text-danger text-xs mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <input {...register("email")} type="email" placeholder="Work Email" className="w-full px-4 py-3 rounded-lg border border-gray-200 font-body text-sm focus:outline-none focus:border-sendara-teal focus:ring-1 focus:ring-sendara-teal" />
        {errors.email && <p className="text-danger text-xs mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <input {...register("agency_name")} placeholder="Agency Name" className="w-full px-4 py-3 rounded-lg border border-gray-200 font-body text-sm focus:outline-none focus:border-sendara-teal focus:ring-1 focus:ring-sendara-teal" />
        {errors.agency_name && <p className="text-danger text-xs mt-1">{errors.agency_name.message}</p>}
      </div>
      <div>
        <input {...register("phone")} type="tel" placeholder="+971XXXXXXXXX" className="w-full px-4 py-3 rounded-lg border border-gray-200 font-body text-sm focus:outline-none focus:border-sendara-teal focus:ring-1 focus:ring-sendara-teal" />
        {errors.phone && <p className="text-danger text-xs mt-1">{errors.phone.message}</p>}
      </div>
      <div>
        <select {...register("agents_count")} className="w-full px-4 py-3 rounded-lg border border-gray-200 font-body text-sm focus:outline-none focus:border-sendara-teal focus:ring-1 focus:ring-sendara-teal text-sendara-navy/60" defaultValue="">
          <option value="" disabled>Number of Agents</option>
          <option value="1-10">1-10 agents</option>
          <option value="11-50">11-50 agents</option>
          <option value="51-100">51-100 agents</option>
          <option value="100+">100+ agents</option>
        </select>
        {errors.agents_count && <p className="text-danger text-xs mt-1">{errors.agents_count.message}</p>}
      </div>
      {error && <p className="text-danger text-sm">{error}</p>}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Book My Demo"}
      </Button>
    </form>
  );
}

function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistFormSchema),
  });

  const onSubmit = async (data: WaitlistFormData) => {
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "waitlist", ...data }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4"
        >
          <Check className="text-success" size={32} />
        </motion.div>
        <h3 className="font-heading font-semibold text-xl text-sendara-navy mb-2">You&apos;re on the list!</h3>
        <p className="font-body text-sendara-navy/60">We&apos;ll notify you as soon as early access opens.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input {...register("email")} type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-lg border border-gray-200 font-body text-sm focus:outline-none focus:border-sendara-teal focus:ring-1 focus:ring-sendara-teal" />
        {errors.email && <p className="text-danger text-xs mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <input {...register("agency_name")} placeholder="Agency Name (Optional)" className="w-full px-4 py-3 rounded-lg border border-gray-200 font-body text-sm focus:outline-none focus:border-sendara-teal focus:ring-1 focus:ring-sendara-teal" />
      </div>
      {error && <p className="text-danger text-sm">{error}</p>}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Joining..." : "Join Early Access"}
      </Button>
    </form>
  );
}

export default function LeadCapture() {
  return (
    <section id="lead-capture" className="bg-sendara-navy py-20 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <SectionLabel>GET STARTED</SectionLabel>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mt-4">
            Ready to protect your WhatsApp number?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl p-6 md:p-8"
          >
            <h3 className="font-heading font-semibold text-xl text-sendara-navy mb-2">Book a Demo</h3>
            <p className="font-body text-sm text-sendara-navy/60 mb-6">15-minute walkthrough. No commitment.</p>
            <DemoForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-6 md:p-8"
          >
            <h3 className="font-heading font-semibold text-xl text-sendara-navy mb-2">Join Early Access</h3>
            <p className="font-body text-sm text-sendara-navy/60 mb-6">Be first in line when we launch.</p>
            <WaitlistForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
