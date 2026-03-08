import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async (formData) => {
  try {
    const { firstName, lastName, email, phone, projectType, message } =
      formData;

    const textContent = `New Project Inquiry - SD Studio

Client Information:
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || "Not provided"}
Project Type: ${projectType}

Project Details:
${message}

Automated message from SD Studio Website`;

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Project Inquiry</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #082c2b; -webkit-font-smoothing: antialiased;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #082c2b; padding: 40px 20px;">
            <tr>
              <td align="center">
                <!-- Main Card container -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #f7f5ef; border-radius: 4px; overflow: hidden; margin: 0 auto; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  
                  <!-- Header Section -->
                  <tr>
                    <td style="padding: 40px 40px 20px 40px; text-align: center; border-bottom: 1px solid #e5e1d8;">
                      <h1 style="color: #082c2b; margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase;">SD Studio</h1>
                      <p style="color: #555555; margin: 10px 0 0 0; font-size: 14px; letter-spacing: 1px;">ARCHITECTURE & DESIGN</p>
                    </td>
                  </tr>

                  <!-- Main Content Section -->
                  <tr>
                    <td style="padding: 40px 40px 20px 40px;">
                      <h2 style="color: #082c2b; margin: 0 0 30px 0; font-size: 22px; font-weight: 500;">New Project Inquiry</h2>
                      
                      <!-- Client Information -->
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 30px;">
                        <tr>
                          <td style="padding-bottom: 16px;">
                            <span style="color: #777777; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 4px;">Name</span>
                            <span style="color: #222222; font-size: 16px;">${firstName} ${lastName}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom: 16px;">
                            <span style="color: #777777; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 4px;">Email</span>
                            <a href="mailto:${email}" style="color: #082c2b; font-size: 16px; text-decoration: none;">${email}</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom: 16px;">
                            <span style="color: #777777; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 4px;">Phone</span>
                            <span style="color: #222222; font-size: 16px;">${phone || "Not provided"}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom: 16px;">
                            <span style="color: #777777; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 4px;">Project Type</span>
                            <span style="color: #222222; font-size: 16px;">${projectType}</span>
                          </td>
                        </tr>
                      </table>

                      <!-- Project Details Box -->
                      <div style="background-color: #ffffff; padding: 25px; border-left: 4px solid #082c2b; border-radius: 2px;">
                        <span style="color: #777777; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 15px;">Project Details</span>
                        <p style="color: #444444; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
                      </div>
                      
                    </td>
                  </tr>

                  <!-- Footer Section -->
                  <tr>
                    <td style="padding: 30px 40px; background-color: #efece5; text-align: center;">
                      <p style="color: #777777; margin: 0 0 10px 0; font-size: 13px;">&copy; 2026 Sandeep3DStudio. All rights reserved.</p>
                      <p style="color: #999999; margin: 0; font-size: 11px; line-height: 1.5;">
                        This is an automated message generated from the SD Studio website contact form.<br>
                        Please do not reply directly to this email address.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    const userTextContent = `Hello ${firstName},

Thank you for contacting SD Studio. We have received your inquiry regarding your ${projectType} project.

Our team will review your message and get back to you shortly.

Your Message Summary:
${message}

Best regards,
SD Studio
ARCHITECTURE & DESIGN`;

    const userHtmlContent = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Inquiry Received - SD Studio</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #082c2b; -webkit-font-smoothing: antialiased;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #082c2b; padding: 40px 20px;">
            <tr>
              <td align="center">
                <!-- Main Card container -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #f7f5ef; border-radius: 4px; overflow: hidden; margin: 0 auto; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  
                  <!-- Header Section -->
                  <tr>
                    <td style="padding: 40px 40px 20px 40px; text-align: center; border-bottom: 1px solid #e5e1d8;">
                      <h1 style="color: #082c2b; margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase;">SD Studio</h1>
                      <p style="color: #555555; margin: 10px 0 0 0; font-size: 14px; letter-spacing: 1px;">ARCHITECTURE & DESIGN</p>
                    </td>
                  </tr>

                  <!-- Main Content Section -->
                  <tr>
                    <td style="padding: 40px 40px 20px 40px;">
                      <h2 style="color: #082c2b; margin: 0 0 20px 0; font-size: 22px; font-weight: 500;">Thank You for Your Inquiry</h2>
                      
                      <!-- Message -->
                      <p style="color: #444444; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                        Hello <strong>${firstName}</strong>,<br><br>
                        We have successfully received your inquiry regarding your <strong>${projectType}</strong> project. Our team will review your details and get back to you shortly to discuss the next steps.
                      </p>

                      <!-- Project Details Box -->
                      <div style="background-color: #ffffff; padding: 25px; border-left: 4px solid #082c2b; border-radius: 2px;">
                        <span style="color: #777777; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 15px;">Your Submitted Message</span>
                        <p style="color: #444444; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
                      </div>
                      
                      <p style="color: #444444; font-size: 16px; line-height: 1.6; margin: 30px 0 0 0;">
                        Best regards,<br>
                        <strong>The SD Studio Team</strong>
                      </p>
                    </td>
                  </tr>

                  <!-- Footer Section -->
                  <tr>
                    <td style="padding: 30px 40px; background-color: #efece5; text-align: center;">
                      <p style="color: #777777; margin: 0 0 10px 0; font-size: 13px;">&copy; 2026 Sandeep3DStudio. All rights reserved.</p>
                      <p style="color: #999999; margin: 0; font-size: 11px; line-height: 1.5;">
                        This is an automated confirmation email.<br>
                        Please do not reply directly to this email address.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    const [adminResponse, userResponse] = await Promise.all([
      resend.emails.send({
        from: "SD Studio Website <noreply@sd.studio>",
        to: [process.env.OWNER_EMAIL,process.env.OWNER2_EMAIL],
        subject: `New Project Inquiry: ${projectType} - SD Studio`,
        text: textContent,
        html: htmlContent,
      }),
      resend.emails.send({
        from: "SD Studio Website <noreply@sd.studio>",
        to: [email],
        subject: "We've Received Your Inquiry - SD Studio",
        text: userTextContent,
        html: userHtmlContent,
      }),
    ]);

    if (adminResponse.error || userResponse.error) {
      console.error("Resend Error (Admin):", adminResponse.error);
      console.error("Resend Error (User):", userResponse.error);
      return {
        success: false,
        error: adminResponse.error || userResponse.error,
      };
    }

    return {
      success: true,
      data: { admin: adminResponse.data, user: userResponse.data },
    };
  } catch (error) {
    console.error("Resend Exception:", error);
    return { success: false, error };
  }
};
