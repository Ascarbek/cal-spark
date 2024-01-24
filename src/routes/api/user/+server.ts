import { error, json, type RequestHandler } from '@sveltejs/kit';
import { getAllUsers, getUser, saveConfirmationCode, saveUser } from '$srv/UserData';
import { sendMail } from '$srv/sendMail';
import type { IUser } from '$components/_shared/Types';

export const PUT: RequestHandler = async ({ request }) => {
  const { email, displayName } = await request.json();
  if (!email || !displayName) {
    throw error(400, 'No username or password provided!');
  }

  const code = crypto.randomUUID();
  await saveUser({ email, displayName });
  await saveConfirmationCode({ email, code });
  await sendMail({ email, displayName, code });

  return json({
    success: true,
  });
};

export const GET: RequestHandler = async () => {
  const raw: any[] = await getAllUsers();
  let result: IUser[] = [];
  result = raw.map<IUser>((row) => ({
    email: row.email,
    displayName: row.displayName,
    bio: row.bio,
    picture: row.picture,
    cover: row.cover,
  }));

  return json({
    rows: result,
  });
};
