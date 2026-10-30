import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendMail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Email error:', error.message);
  }
};

export const passwordReset = async (email, resetLink) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset',
        html: `
            <h2>Password Reset Request</h2>
            <p>Click the link below to reset your password.</p>
            <a href="${resetLink}">Reset Password</a>
            <p>This link expires in 15 minutes.</p>
        `
    };

    const info = await transporter.sendMail(mailOptions);

    return info;
};
