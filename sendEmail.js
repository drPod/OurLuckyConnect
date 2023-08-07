const nodemailer = require('nodemailer');
const dotenv = require('dotenv'); // Add this line

dotenv.config(); // Load environment variables from .env file

// Create a transporter using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use the email provider's name or set up your own SMTP configuration
    auth: {
        user: process.env.EMAIL_USERNAME, // Use environment variable
        pass: process.env.EMAIL_PASSWORD, // Use environment variable
    },
});

// Email content
const mailOptions = {
    from: process.env.EMAIL_USERNAME, // Sender's email address
    to: 'recipient@example.com', // Recipient's email address
    subject: 'Test Email from Nodemailer',
    text: 'Hello, this is a test email sent using Nodemailer!',
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});
