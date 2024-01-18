import { error, json, type RequestHandler } from '@sveltejs/kit';
import { saveConfirmationCode } from '$srv/UserData';
import { sendMail } from '$srv/sendMail';

export const PUT: RequestHandler = async ({ request }) => {
  const { email, displayName } = await request.json();
  if (!email || !displayName) {
    throw error(400, 'No username or password provided!');
  }

  const code = crypto.randomUUID();
  await saveConfirmationCode({ email, code });
  await sendMail({ email, displayName, code });

  return json({
    success: true,
  });
};
