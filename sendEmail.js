// Initialize EmailJS with your public key
emailjs.init(process.env.EMAILJS_PUBLIC_KEY);

// Function to send the email
function sendEmail() {
    // Gather data from form fields
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const websiteUrl = document.getElementById('websiteUrl').value;
    const message = document.getElementById('message').value;

    // Email content
    const emailData = {
        to: process.env.EMAIL_TO,
        subject: process.env.EMAIL_SUBJECT,
        text: `Name: ${name}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nWebsite: ${websiteUrl}\n\nMessage:\n${message}`,
    };

    // Send the email using the service and template IDs from Vercel environment variables
    emailjs.send(process.env.EMAIL_SERVICE_ID, process.env.EMAIL_TEMPLATE_ID, emailData)
        .then((response) => {
            console.log('Email sent:', response);
            // You can add additional code to handle success, display messages, etc.
        })
        .catch((error) => {
            console.error('Error sending email:', error);
            // You can add additional code to handle errors, display messages, etc.
        });
}

// Attach the sendEmail function to the "Send Message" button
document.getElementById('send-button').addEventListener('click', sendEmail);
