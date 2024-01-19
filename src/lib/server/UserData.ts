import { getTableRows, saveTableRows } from '$srv/Database';
import type { IUser } from '$components/_shared/Types';

const getUserRows = async () => {
  return getTableRows('users.json');
};

const saveUserRows = async (rows: any) => {
  await saveTableRows(rows, 'users.json');
};

const getConfirmationRows = async () => {
  return getTableRows('user_confirmation.json');
};

const saveConfirmationRows = async (rows: any) => {
  await saveTableRows(rows, 'user_confirmation.json');
};

export const saveUser = async (params: IUser) => {
  const { email } = params;

  const rows = await getUserRows();

  rows[email] = {
    ...params,
  };

  await saveUserRows(rows);
};

export const getUser = async (params: { email: string }) => {
  const { email } = params;
  const rows = await getUserRows();
  return { ...rows[email] };
};

export const saveConfirmationCode = async (params: { email: string; code: string }) => {
  const { email, code } = params;

  const rows = await getConfirmationRows();
  rows[email] = code;
  await saveConfirmationRows(rows);
};

export const getConfirmationCode = async (params: { code: string }) => {
  const { code } = params;

  const rows = await getConfirmationRows();

  let confirmed = false;
  let email = '';

  Object.keys(rows).forEach((id) => {
    if (rows[id] && rows[id] === code) {
      confirmed = true;
      email = id;
    }
  });

  return {
    confirmed,
    email,
  };
};

export const changePassword = async (params: { email: string; password: string }) => {
  const { email, password } = params;

  const rows = await getUserRows();
  rows[email] = {
    ...rows[email],
    password,
  };

  await saveUserRows(rows);
};

export const authUser = async (params: { email: string; password: string }) => {
  const { email, password } = params;
  const rows = await getUserRows();
  const currentPassword = rows[email]?.password;
  return currentPassword === password;
};
