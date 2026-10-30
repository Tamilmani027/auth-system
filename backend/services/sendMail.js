import { BrevoClient } from '@getbrevo/brevo';

export const sendMail = async (to, subject, text) => {
    try {
        const brevo = new BrevoClient({
            apiKey: process.env.BREVO_API_KEY
        });

        const response = await brevo.transactionalEmails.sendTransacEmail({
            sender: {
                name: 'Auth System',
                email: process.env.EMAIL_USER
            },
            to: [{ email: to }],
            subject: subject,
            textContent: text
        });

        console.log('Email sent successfully:', response.messageId);
        return response;

    } catch (error) {
        console.error('Email error:', error.message);
        throw error;
    }
};


export const passwordReset = async (email, resetLink) => {
    try {
        const brevo = new BrevoClient({
            apiKey: process.env.BREVO_API_KEY
        });

        const response = await brevo.transactionalEmails.sendTransacEmail({
            sender: {
                name: 'Auth System',
                email: process.env.EMAIL_USER
            },
            to: [{ email: email }],
            subject: 'Password Reset Request',
            htmlContent: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Password Reset Request</h2>

                    <p>We received a request to reset your password.</p>

                    <p>Click the button below to reset your password:</p>

                    <a href="${resetLink}"
                       style="background-color: #007bff;
                              color: white;
                              padding: 12px 20px;
                              text-decoration: none;
                              border-radius: 5px;">
                        Reset Password
                    </a>

                    <p>This link expires in 15 minutes.</p>

                    <p>If you didn't request this, please ignore this email.</p>
                </div>
            `
        });

        console.log('Password reset email sent:', response.messageId);
        return response;

    } catch (error) {
        console.error('Password reset email error:', error.message);
        throw error;
    }
};
