require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/book', async (req, res) => {

    const { name, email, phone, date } = req.body;

    try {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: process.env.TO_EMAILS,
            subject: 'New Appointment Booking',
            html: `
                <h2>New Appointment</h2>

                <p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Phone:</b> ${phone}</p>
                <p><b>Date:</b> ${date}</p>
            `
        });

        res.json({ success: true });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false
        });
    }

});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});