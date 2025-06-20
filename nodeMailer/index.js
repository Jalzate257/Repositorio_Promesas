const nodemailer = require('nodemailer');


const emails = [
    'johnortega1357@gmail.com'
];

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'johnortega13579@gmail.com',
        pass: '.....',
    },
});

async function sendMassEmails() {
    const sendEmail = async (to) => {
        try {
            const info = await transporter.sendMail({
                from: '"John Doe" <tucorreo@gmail.com>', 
                to,
                subject: 'Correo Masivo',
                text: 'Este es un correo masivo enviado con Node.js',
                html: '<b>Hola!</b> Este correo fue enviado masivamente.',
            });
            console.log(`Correo enviado a ${to}: ${info.messageId}`);
        } catch (err) {
            console.error(`Error con ${to}: ${err.message}`);
        }
    };

    await Promise.all(emails.map(sendEmail));
}

sendMassEmails();