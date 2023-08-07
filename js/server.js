const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (if needed)
app.use(express.static('public'));

// Define a route for handling the contact form submission
app.post('/submit', (req, res) => {
    const { name, email, phoneNumber, websiteUrl, message } = req.body;

    // Create a transporter object using nodemailer
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // You can use any email service you prefer
        auth: {
            user: 'your@gmail.com', // Replace with your email
            pass: 'your-password' // Replace with your password
        }
    });

    // Email configuration
    const mailOptions = {
        from: 'your@gmail.com', // Sender's email address
        to: 'recipient@example.com', // Recipient's email address
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
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
