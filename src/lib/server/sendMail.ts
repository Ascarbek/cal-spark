import nodeMailer from 'nodemailer';
import { env } from '$env/dynamic/private';

export const sendMail = async (params: { email: string; displayName: string; code: string }) => {
  const { email, displayName, code } = params;
  console.log(env.APP_PASSWORD);
  const transporter = nodeMailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'ascarbek@gmail.com',
      pass: 'pfmq lzcm zjar tomk',
    },
  });

  await transporter.sendMail({
    from: 'ascarbek@gmail.com',
    to: email,
    subject: 'CalSpark Registration',
    text: `
Hello ${displayName}!

To complete your registration with CalSpark you have to click on the link below:
http://localhost:5173/confirm-email/${code}
`,
  });
};
