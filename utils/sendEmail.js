const { Resend } = require("resend");

const sendEmail = async ({ to, name, service, date, time }) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject: "Your Booking is Confirmed! ✅",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #f9f9f9;">
        <div style="background: #fff; border-radius: 12px; padding: 40px;">
          <h1 style="color: #1a1a2e;">Booking Confirmed! 🎉</h1>
          <p style="color: #666;">Hi <strong>${name}</strong>, your appointment has been successfully booked.</p>
          <div style="background: #f0f4ff; border-radius: 10px; padding: 24px; margin: 24px 0;">
            <h3 style="color: #1a1a2e;">Booking Details</h3>
            <table style="width: 100%;">
              <tr>
                <td style="color: #888; padding: 8px 0;">Service</td>
                <td style="font-weight: 600; color: #1a1a2e;">${service}</td>
              </tr>
              <tr>
                <td style="color: #888; padding: 8px 0;">Date</td>
                <td style="font-weight: 600; color: #1a1a2e;">${date}</td>
              </tr>
              <tr>
                <td style="color: #888; padding: 8px 0;">Time</td>
                <td style="font-weight: 600; color: #1a1a2e;">${time}</td>
              </tr>
            </table>
          </div>
          <p style="color: #666; font-size: 14px;">If you need to reschedule or cancel, please contact us.</p>
        </div>
      </div>
    `,
  });
};

module.exports = sendEmail;