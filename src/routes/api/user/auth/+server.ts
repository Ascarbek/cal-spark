import { json, type RequestHandler } from '@sveltejs/kit';
import { authUser, getUser } from '$srv/UserData';
import jsonwebtoken from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';
import type { IUser } from '$components/_shared/Types';

export const POST: RequestHandler = async ({ request }) => {
  const { email, password } = await request.json();

  const valid = await authUser({ email, password });

  let data: IUser | undefined;
  let accessToken: string | undefined;

  if (valid) {
    accessToken = jsonwebtoken.sign(
      {
        email,
      },
      JWT_SECRET || 'default'
    );

    const user = await getUser({ email });
    data = {
      displayName: user.displayName,
      email: user.email,
      bio: user.bio,
      picture: user.picture,
      cover: user.cover,
    };
  }

  return json({ valid, data, accessToken });
};
