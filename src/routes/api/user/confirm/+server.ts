import { json, type RequestHandler } from '@sveltejs/kit';
import { getConfirmationCode, getUser } from '$srv/UserData';

export const POST: RequestHandler = async ({ request }) => {
  const { code } = await request.json();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await getConfirmationCode({ code });
  const user = await getUser({ email: res.email });

  return json({
    ...res,
    ...user,
  });
};
