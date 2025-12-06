export const emailStyles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { 
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
    line-height: 1.6; 
    color: #1a1a1a; 
    background-color: #fafafa;
  }
  .container { 
    max-width: 600px; 
    margin: 0 auto; 
    background: white;
    border-radius: 8px;
    overflow: hidden;
  }
  .header {
    padding: 32px;
    border-bottom: 1px solid #e5e5e5;
  }
  .header h1 {
    font-size: 24px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 4px;
  }
  .header p {
    font-size: 14px;
    color: #666;
  }
  .content {
    padding: 32px;
    line-height: 1.8;
  }
  .content p {
    font-size: 15px;
    margin-bottom: 16px;
    color: #333;
  }
  .message-label {
    font-size: 11px;
    font-weight: 600;
    color: #999;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    margin-bottom: 12px;
    margin-top: 28px;
  }
  .message-box {
    background: #ffffff;
    padding: 24px;
    border-radius: 0;
    border: 2px solid #1a1a1a;
    font-size: 15px;
    line-height: 1.8;
    white-space: pre-wrap;
    word-break: break-word;
    color: #1a1a1a;
    margin-bottom: 24px;
  }
  .cta-section {
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid #e5e5e5;
  }
  .cta-button {
    display: inline-block;
    background: #1a1a1a;
    color: #ffffff;
    padding: 12px 32px;
    border-radius: 0;
    text-decoration: none;
    font-weight: 500;
    font-size: 14px;
    letter-spacing: 0.3px;
  }
  .cta-button:hover {
    background: #333333;
  }
  .footer {
    background-color: #f9f9f9;
    padding: 32px;
    border-top: 1px solid #e5e5e5;
    text-align: center;
  }
  .signature {
    font-size: 15px;
    font-weight: 500;
    color: #1a1a1a;
    margin-bottom: 8px;
  }
  .contact-email {
    font-size: 13px;
    color: #666;
  }
  .contact-email a {
    color: #1a1a1a;
    text-decoration: underline;
    font-weight: 500;
  }
`;

export const adminEmailStyles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { 
    font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
    line-height: 1.6; 
    color: #a6da95;
    background-color: #1e1e2e;
  }
  .container { 
    max-width: 600px; 
    margin: 0 auto; 
    background: #11111b;
    border: 1px solid #45475a;
    border-radius: 0;
    overflow: hidden;
  }
  .header {
    background: #11111b;
    padding: 20px;
    border-bottom: 1px solid #45475a;
  }
  .header-line {
    font-size: 12px;
    color: #89dceb;
    margin-bottom: 8px;
    font-weight: bold;
  }
  .header h1 {
    font-size: 16px;
    font-weight: 600;
    color: #a6da95;
    margin: 0;
    letter-spacing: 1px;
  }
  .content {
    padding: 20px;
  }
  .field {
    margin-bottom: 20px;
  }
  .field-label {
    font-size: 11px;
    color: #89dceb;
    margin-bottom: 6px;
    font-weight: bold;
  }
  .field-value {
    font-size: 13px;
    color: #cdd6f4;
    word-break: break-word;
    padding-left: 12px;
    border-left: 2px solid #45475a;
  }
  .field-value a {
    color: #89dceb;
    text-decoration: none;
  }
  .field-value a:hover {
    text-decoration: underline;
  }
  .message-box {
    background: #1e1e2e;
    padding: 12px;
    border: 1px solid #45475a;
    border-radius: 0;
    font-size: 12px;
    line-height: 1.7;
    white-space: pre-wrap;
    word-break: break-word;
    color: #a6da95;
  }
  .footer {
    background: #11111b;
    padding: 16px 20px;
    border-top: 1px solid #45475a;
    font-size: 11px;
    color: #6c7086;
    text-align: center;
  }
`;

interface UserReplyEmailProps {
  name: string;
  message: string;
}

export function getUserReplyEmail({
  name,
  message,
}: UserReplyEmailProps): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${emailStyles}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thanks for reaching out</h1>
          <p>I've received your message</p>
        </div>
        <div class="content">
          <p>Hi ${name},</p>
          <p>I've received your message and will get back to you as soon as possible. Thanks for taking the time to connect.</p>
          
          <div class="message-label">Your message</div>
          <div class="message-box">${message}</div>
          
          <div class="cta-section">
            <p>Want to continue the conversation? Visit my portfolio or reply directly to this email.</p>
            <a href="https://psstee.dev" class="cta-button">visit portfolio</a>
          </div>
        </div>
        <div class="footer">
          <div class="signature">Pyae Sone Shin Thant</div>
          <div class="contact-email"><a href="mailto:me@psstee.dev">me@psstee.dev</a></div>
        </div>
      </div>
    </body>
    </html>
  `;
}

interface AdminNotificationEmailProps {
  name: string;
  email: string;
  message: string;
}

export function getAdminNotificationEmail({
  name,
  email,
  message,
}: AdminNotificationEmailProps): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${adminEmailStyles}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="header-line">$ portfolio/contact</div>
          <h1>new message received</h1>
        </div>
        <div class="content">
          <div class="field">
            <div class="field-label">> from</div>
            <div class="field-value">${name}</div>
          </div>
          
          <div class="field">
            <div class="field-label">> email</div>
            <div class="field-value"><a href="mailto:${email}">${email}</a></div>
          </div>
          
          <div class="field">
            <div class="field-label">> message</div>
            <div class="message-box">${message}</div>
          </div>
        </div>
        <div class="footer">
          reply to continue the conversation →
        </div>
      </div>
    </body>
    </html>
  `;
}
