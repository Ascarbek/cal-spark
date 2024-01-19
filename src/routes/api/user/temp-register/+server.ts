import { json, type RequestHandler } from '@sveltejs/kit';
import { changePassword, saveUser } from '$srv/UserData';

export const PUT: RequestHandler = async ({ request }) => {
  const { email, displayName, password } = await request.json();

  await saveUser({ email, displayName });
  await changePassword({ email, password });
  return json({});
};
