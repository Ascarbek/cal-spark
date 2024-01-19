import { json, type RequestHandler } from '@sveltejs/kit';
import jsonwebtoken from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';
import { getUser } from '$srv/UserData';

export const POST: RequestHandler = async ({ request }) => {
  const { token } = await request.json();
  try {
    const resp = <{ email: string }>jsonwebtoken.verify(token, JWT_SECRET || 'default');
    const { email } = resp;
    const data = await getUser({ email });

    return json({
      valid: true,
      data,
    });
  } catch (e) {
    return json({
      valid: false,
    });
  }
};
