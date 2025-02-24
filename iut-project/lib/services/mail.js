'use strict';

const { Service } = require('@hapipal/schmervice');
const nodemailer = require('nodemailer');

module.exports = class MailService extends Service {

    constructor(server, options) {
        super(server, options);

        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });
    }

    async sendMail(to, subject, text) {
        const mailOptions = {
            from: process.env.MAIL_USER,
            to,
            subject,
            text
        };

        return this.transporter.sendMail(mailOptions);
    }
};