import { Resend } from 'resend';

const resend = new Resend('re_123456789');

export async function sendWelcomeEmail(toEmail) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [toEmail],
      subject: 'Welcome to Photo Album App',
      html: '<strong>Thank you for registering!</strong>',
    });
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
}