import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const sendActivationMail = async (to, link) => {
  try {
    const transport = await createTransport();
    const info = await transport.sendMail({
      from: ` Zerno Fırın <${process.env.SMTP_USER}>`,
      to,
      subject: "Hesabınızı aktifleştirin. " + process.env.CLIENT_URL,
      text: "",
      html: `
                <div>
                    <h1>Hesabınızı aktifleştirmek için aşağıdaki linke tıklayın</h1>
                    <a href="${link}">${link}</a>
                </div>
                `,
    });
    console.log(`Message sent to ${info.messageId}`);
  } catch (error) {
    console.log(error);
  }
};

const createTransport = async () => {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_CLIENT_SECRET,
    process.env.OAUTH_REDIRECT_URI
  );
  oAuth2Client.setCredentials({
    refresh_token: process.env.OAUTH_REFRESH_TOKEN,
  });

  const accessToken = await oAuth2Client.getAccessToken();

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      type: "OAuth2",
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      accessToken,
    },
  });
  return transport;
};

const MailService = { sendActivationMail };
export default MailService;
