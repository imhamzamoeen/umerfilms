// Test script to verify Gmail SMTP email sending
// Run with: node scripts/test-email.js

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  const envContent = fs.readFileSync(envPath, 'utf8');

  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      const value = valueParts.join('=');
      if (key && value) {
        process.env[key.trim()] = value.trim();
      }
    }
  });
}

async function sendTestEmail() {
  console.log('Loading environment variables...');
  loadEnv();

  console.log('Creating transporter...');
  console.log('SMTP Host:', process.env.SMTP_HOST);
  console.log('SMTP User:', process.env.SMTP_USER);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const timestamp = new Date().toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: #1a1a1a;
          color: #ffffff;
          padding: 40px;
          margin: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: linear-gradient(135deg, #1f1f1f 0%, #2d2d2d 100%);
          border-radius: 16px;
          padding: 40px;
          border: 1px solid #333;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          background: linear-gradient(90deg, #450E93, #D5007F);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        h2 {
          color: #D5007F;
          margin-bottom: 20px;
        }
        .field {
          margin-bottom: 20px;
          padding: 15px;
          background: rgba(255,255,255,0.05);
          border-radius: 8px;
        }
        .label {
          color: #888;
          font-size: 12px;
          text-transform: uppercase;
          margin-bottom: 5px;
        }
        .value {
          color: #fff;
          font-size: 16px;
        }
        .message-box {
          background: rgba(213, 0, 127, 0.1);
          border-left: 4px solid #D5007F;
          padding: 20px;
          border-radius: 0 8px 8px 0;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #333;
          color: #666;
          font-size: 12px;
        }
        .success-badge {
          display: inline-block;
          background: linear-gradient(90deg, #450E93, #D5007F);
          color: white;
          padding: 8px 20px;
          border-radius: 20px;
          font-weight: bold;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">UmerFilms</div>
        </div>

        <h2>Test Contact Form Submission</h2>

        <div class="field">
          <div class="label">Name</div>
          <div class="value">Test User</div>
        </div>

        <div class="field">
          <div class="label">Email</div>
          <div class="value">test@example.com</div>
        </div>

        <div class="field">
          <div class="label">Project Type</div>
          <div class="value">Commercial</div>
        </div>

        <div class="message-box">
          <div class="label">Message</div>
          <div class="value">
            This is a test email to verify the Gmail SMTP configuration is working correctly.
            If you received this email, your contact form email functionality is properly configured!
          </div>
        </div>

        <div style="text-align: center;">
          <span class="success-badge">Email System Working!</span>
        </div>

        <div class="footer">
          <p>Submitted on: ${timestamp}</p>
          <p>This is an automated test email from UmerFilms contact form system.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  console.log('\nSending test email to haamzaaay@gmail.com...');

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: 'haamzaaay@gmail.com',
      subject: 'UmerFilms Contact Form Test',
      html: htmlTemplate,
    });

    console.log('\n=================================');
    console.log('EMAIL SENT SUCCESSFULLY!');
    console.log('=================================');
    console.log('Message ID:', info.messageId);
    console.log('Check haamzaaay@gmail.com inbox for the test email.');
    console.log('\nIf successful, the contact form is ready to use!');

  } catch (error) {
    console.error('\n=================================');
    console.error('EMAIL SEND FAILED!');
    console.error('=================================');
    console.error('Error:', error.message);

    if (error.message.includes('Invalid login')) {
      console.error('\nPossible causes:');
      console.error('1. App password is incorrect');
      console.error('2. 2-Step Verification not enabled on Gmail account');
      console.error('3. App password not properly generated');
    }

    process.exit(1);
  }
}

sendTestEmail();
