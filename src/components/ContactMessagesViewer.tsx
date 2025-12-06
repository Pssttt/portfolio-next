"use client";

import { useState } from "react";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export function ContactMessagesViewer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = prompt("Enter admin token:");
      if (!token) return;

      const response = await fetch("/api/contact", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Unauthorized or error fetching messages");
      }

      const data = await response.json();
      setMessages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={fetchMessages}
        disabled={loading}
        className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Loading..." : "View Messages"}
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {messages.length > 0 && (
        <div className="space-y-3">
          <div className="p-3 bg-secondary rounded">
            <p className="text-sm text-muted-foreground">Total Messages</p>
            <p className="text-2xl font-bold">{messages.length}</p>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="p-4 bg-secondary rounded border border-border hover:bg-secondary/80 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold">{msg.name}</p>
                    <p className="text-sm text-muted-foreground">{msg.email}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(msg.timestamp).toLocaleString()}
                  </p>
                </div>
                <p className="text-sm">{msg.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {messages.length === 0 && !loading && !error && (
        <p className="text-muted-foreground">No messages yet</p>
      )}
    </div>
  );
}
