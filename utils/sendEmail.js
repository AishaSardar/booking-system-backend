const nodemailer = require("nodemailer");

const sendEmail = async ({ to, name, service, date, time }) => {
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

  const mailOptions = {
    from: `"Booking System" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your Booking is Confirmed! ✅",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #f9f9f9;">
        
        <div style="background: #fff; border-radius: 12px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
          
          <h1 style="color: #1a1a2e; font-size: 24px; margin-bottom: 8px;">
            Booking Confirmed! 🎉
          </h1>
          
          <p style="color: #666; font-size: 16px; margin-bottom: 32px;">
            Hi <strong>${name}</strong>, your appointment has been successfully booked.
          </p>

          <div style="background: #f0f4ff; border-radius: 10px; padding: 24px; margin-bottom: 32px;">
            <h3 style="color: #1a1a2e; margin-bottom: 16px; font-size: 16px;">Booking Details</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 14px; width: 40%;">Service</td>
                <td style="padding: 8px 0; color: #1a1a2e; font-weight: 600; font-size: 14px;">${service}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 14px;">Date</td>
                <td style="padding: 8px 0; color: #1a1a2e; font-weight: 600; font-size: 14px;">${date}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 14px;">Time</td>
                <td style="padding: 8px 0; color: #1a1a2e; font-weight: 600; font-size: 14px;">${time}</td>
              </tr>
            </table>
          </div>

          <p style="color: #666; font-size: 14px; line-height: 1.6;">
            If you need to reschedule or cancel, please contact us as soon as possible.
          </p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />

          <p style="color: #aaa; font-size: 12px; text-align: center;">
            This is an automated confirmation email. Please do not reply.
          </p>

        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;