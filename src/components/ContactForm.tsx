"use client";

import { useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error || "Failed to send message");
        return;
      }

      setStatus("success");
      setMessage(data.message);
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 3000);
    } catch (error) {
      setStatus("error");
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-border rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-border rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          placeholder="your.email@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-2 border border-border rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
          placeholder="Tell me about your opportunity or inquiry..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 disabled:opacity-50 transition-opacity font-medium"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>

      {message && (
        <div
          className={`p-4 rounded text-sm ${
            status === "success"
              ? "bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20"
              : "bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20"
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
}
