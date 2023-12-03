/* eslint-disable no-undef */
import nodemailer from 'nodemailer';

const send = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
      pool: true,
    });

    await transporter.sendMail({ from: process.env.GMAIL, ...options });
    transporter.close();
  } catch (err) {
    console.log(err)
  }
};

export const sendLikeNotification = (userEmail) => {
  send({
    to: userEmail,
    subject: 'New like on Your Question',
    text: 'Someone has liked your question!'
  });
};

export const sendAnswerNotification = (userEmail) => {
  send({
    to: userEmail,
    subject: 'New answer on Your Question',
    text: 'Someone has answered your question!'
  });
};

export const sendResetPasswordEmail = (userEmail, message) => {
  send({
    to: userEmail,
    subject: 'Gwala Password Recovery',
    text: message
  });
};
