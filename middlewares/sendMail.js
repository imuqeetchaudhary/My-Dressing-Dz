require('dotenv').config();
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

function getMailOptions() {
    return {
        from: '2018cs61@student.uet.edu.pk',
        // to: 'abc@gmail.com',
        subject: "My Dressing",
        text: ""
    }
}

function sendMail(email, message) {
    const mailOpts = getMailOptions();

    return transporter.sendMail({ ...mailOpts, to: email, text: message }, (err, data) => {
        if (err) {
            console.log(`Error: ${err}`)
        }
        else {
            console.log("Email Sent")
        }

    });
}



module.exports = { sendMail }