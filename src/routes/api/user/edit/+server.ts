import { json, type RequestHandler } from '@sveltejs/kit';
import { getUser, saveUser } from '$srv/UserData';
import type { IUser } from '$components/_shared/Types';

export const POST: RequestHandler = async ({ request }) => {
  const params: IUser = await request.json();

  const { displayName, email, bio, picture, cover } = params;

  const currentUser = await getUser({ email });

  await saveUser({
    password: currentUser.password,
    email,
    displayName,
    cover,
    picture,
    bio,
  });

  return json({});
};
