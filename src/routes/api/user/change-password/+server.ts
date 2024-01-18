import { json, type RequestHandler } from '@sveltejs/kit';
import { changePassword } from '$srv/UserData';

export const POST: RequestHandler = async ({ request }) => {
  const { email, password } = await request.json();

  await changePassword({ email, password });
  return json({});
};
