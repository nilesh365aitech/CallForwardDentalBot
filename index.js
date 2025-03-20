const express = require('express');
const plivo = require('plivo');
const app = express();

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Define the port
const PORT = process.env.PORT || 3000;

// Create an endpoint to handle incoming calls
app.all('/answer/', (req, res) => {
    // Create a new Response object
    const response = plivo.Response();

    // Set caller ID to your Plivo number (replace with your actual Plivo number)
    const params = {
        callerId: "+12623966056", // Replace with your actual Plivo number
        dialMusic: "real" // Optional: plays ringing sound while connecting
    };

    // Create a Dial element
    const dial = response.addDial(params);
    
    // Add the destination number (with India country code +91)
    dial.addNumber("+918875506226");
    
    // Set proper content type for Plivo XML
    res.set({
        'Content-Type': 'text/xml'
    });
    
    // Send the response
    res.send(response.toXML());
});

app.get('/', (req, res) => {
    res.send('Plivo Node.js Apps');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});