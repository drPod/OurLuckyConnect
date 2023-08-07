const emailjs = require('emailjs-com');

// Set up EmailJS with your user ID from the .env file
emailjs.init(process.env.EMAILJS_USER_ID);

// Email content using environment variables from the .env file
const emailData = {
    to: process.env.EMAIL_TO,
    subject: process.env.EMAIL_SUBJECT,
    text: process.env.EMAIL_TEXT,
};

// Send the email using the service and template IDs from the .env file
emailjs.send(process.env.EMAIL_SERVICE_ID, process.env.EMAIL_TEMPLATE_ID, emailData)
    .then((response) => {
        console.log('Email sent:', response);
    })
    .catch((error) => {
        console.error('Error sending email:', error);
    });
