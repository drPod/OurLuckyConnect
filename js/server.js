const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (if needed)
app.use(express.static('public'));

// Load environment variables from .env file (for development)
require('dotenv').config();

// Create an OAuth2 client for Gmail API
const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

// Set credentials for OAuth2 client
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

// Handle form submission
app.post('/submit', async (req, res) => {
    const { name, email, phoneNumber, websiteUrl, message } = req.body;

    try {
        // Get access token from OAuth2 client
        const accessToken = await oAuth2Client.getAccessToken();

        // Create a transporter for sending emails
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        // Create email content
        const mailOptions = {
            from: process.env.EMAIL,
            to: 'recipient@example.com',
            subject: 'New Contact Form Submission',
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phoneNumber}\nWebsite: ${websiteUrl}\nMessage: ${message}`
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).json({ message: 'An error occurred. Please try again later.' });
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({ message: 'Thank you for your submission!' });
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred. Please try again later.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
