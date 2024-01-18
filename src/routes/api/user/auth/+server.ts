import { json, type RequestHandler } from '@sveltejs/kit';
import { authUser, getUser } from '$srv/UserData';

export const POST: RequestHandler = async ({ request }) => {
  const { email, password } = await request.json();

  const valid = await authUser({ email, password });
  let displayName: string | undefined;
  if (valid) {
    const user = await getUser({ email });
    displayName = user.displayName;
  }

  return json({ valid, displayName });
};
