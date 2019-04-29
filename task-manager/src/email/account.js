const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/*
// Sending email example
sgMail.send({
    to: 'thetkpark@gmail.com',
    from: 'thetkpark@gmail.com',
    subject: 'this is my first email',
    text: 'I hope it work...'
})
*/

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'the_tkpark@hotmail.com',
        subject: 'Thank you joining in!',
        text: `Welcome to the app, ${name}!. Let's me know how you get along with the app.`
    });
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'the_tkpark@hotmail.com',
        subject: 'Sorry to see you go',
        text: `So sorry that you are going to left us, ${name}. Is there anything we could improve?`
    });
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}