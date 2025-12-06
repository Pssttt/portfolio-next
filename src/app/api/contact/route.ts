import { promises as fs } from "fs";
import path from "path";
import { Resend } from "resend";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const MESSAGES_FILE = path.join(process.cwd(), "data", "contact-messages.json");
const resend = new Resend(process.env.RESEND_API_KEY);

async function ensureMessagesFile() {
  try {
    await fs.access(MESSAGES_FILE);
  } catch {
    await fs.mkdir(path.dirname(MESSAGES_FILE), { recursive: true });
    await fs.writeFile(MESSAGES_FILE, JSON.stringify([], null, 2));
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await ensureMessagesFile();

    const fileContent = await fs.readFile(MESSAGES_FILE, "utf-8");
    const messages: ContactMessage[] = JSON.parse(fileContent);

    const newMessage: ContactMessage = {
      id: Date.now().toString(),
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
      read: false,
    };

    messages.push(newMessage);
    await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));

    if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
          to: process.env.CONTACT_EMAIL,
          subject: `New contact from ${name}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #a6da95 0%, #89dceb 100%); padding: 30px; border-radius: 8px 8px 0 0; color: white; }
                .header h1 { margin: 0; font-size: 24px; }
                .header p { margin: 8px 0 0 0; opacity: 0.9; }
                .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
                .message-box { background: white; padding: 20px; border-left: 4px solid #a6da95; border-radius: 4px; margin: 20px 0; }
                .message-box p { margin: 0; white-space: pre-wrap; word-break: break-word; }
                .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
                .info-item { background: white; padding: 15px; border-radius: 4px; }
                .info-label { font-size: 12px; color: #666; text-transform: uppercase; font-weight: 600; }
                .info-value { font-size: 16px; color: #000; margin-top: 5px; word-break: break-all; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; border-top: 1px solid #ddd; margin-top: 20px; }
                .cta-button { display: inline-block; background: #a6da95; color: white; padding: 12px 24px; border-radius: 4px; text-decoration: none; font-weight: 600; margin-top: 20px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>New Message Received! 🎉</h1>
                  <p>Someone reached out through your portfolio</p>
                </div>
                <div class="content">
                  <div class="info-grid">
                    <div class="info-item">
                      <div class="info-label">From</div>
                      <div class="info-value">${name}</div>
                    </div>
                    <div class="info-item">
                      <div class="info-label">Email</div>
                      <div class="info-value"><a href="mailto:${email}">${email}</a></div>
                    </div>
                  </div>
                  
                  <h3 style="margin-top: 30px; color: #000;">Message</h3>
                  <div class="message-box">
                    <p>${message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>")}</p>
                  </div>
                  
                  <a href="mailto:${email}?subject=Re: Your message" class="cta-button">Reply to ${name}</a>
                </div>
                <div class="footer">
                  <p>This is an automated notification from your portfolio contact form.</p>
                </div>
              </div>
            </body>
            </html>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send admin email:", emailError);
      }
    }

    // Send auto-reply to visitor
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL!,
          to: email,
          subject: "Thanks for reaching out!",
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #a6da95 0%, #89dceb 100%); padding: 30px; border-radius: 8px 8px 0 0; color: white; text-align: center; }
                .header h1 { margin: 0; font-size: 28px; }
                .header p { margin: 8px 0 0 0; opacity: 0.9; font-size: 16px; }
                .content { background: #f8f9fa; padding: 30px; }
                .message-preview { background: white; padding: 20px; border-left: 4px solid #89dceb; border-radius: 4px; margin: 20px 0; }
                .message-preview p { margin: 0; white-space: pre-wrap; word-break: break-word; color: #555; font-size: 14px; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; border-top: 1px solid #ddd; margin-top: 20px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <p>Thanks for reaching out, ${name}!</p>
                </div>
                <div class="content">
                  <p>I've received your message and appreciate you taking the time to connect. I'll get back to you as soon as possible.</p>
                  
                  <h3 style="margin-top: 30px; color: #000;">Your Message</h3>
                  <div class="message-preview">
                    <p>${message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>")}</p>
                  </div>
                  
                  <p style="margin-top: 30px; color: #666;">In the meantime, feel free to:</p>
                  <ul style="color: #666;">
                    <li>Check out my <a href="https://github.com/Pssttt" style="color: #a6da95;">GitHub projects</a></li>
                    <li>Connect on <a href="https://linkedin.com/in/pssteee" style="color: #a6da95;">LinkedIn</a></li>
                  </ul>
                </div>
                <div class="footer">
                  <p style="margin: 0;">Looking forward to chatting!</p>
                  <p style="margin: 10px 0 0 0;">— Pyae Sone Shin Thant</p>
                  <p style="margin: 15px 0 0 0; font-size: 13px;">
                    📧 <a href="mailto:me@psstee.dev" style="color: #a6da95; text-decoration: none;">me@psstee.dev</a>
                  </p>
                </div>
              </div>
            </body>
            </html>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send auto-reply:", emailError);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Message received! I'll get back to you soon.",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return new Response(JSON.stringify({ error: "Failed to send message" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(request: Request) {
  try {
    const headersList = request.headers;
    const authHeader = headersList.get("authorization");
    const token = process.env.ADMIN_TOKEN;

    if (
      !token ||
      !authHeader ||
      !authHeader.startsWith("Bearer ") ||
      authHeader.slice(7) !== token
    ) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    await ensureMessagesFile();
    const fileContent = await fs.readFile(MESSAGES_FILE, "utf-8");
    const messages: ContactMessage[] = JSON.parse(fileContent);

    return new Response(JSON.stringify(messages), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
