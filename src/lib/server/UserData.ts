import fs from 'fs-extra';
import path from 'path';

export const saveUser = async (params: { email: string; displayName: string }) => {
  const { email, displayName } = params;
  const folderPath = path.join(process.cwd(), 'data');
  await fs.ensureDir(folderPath);
  const filePath = path.join(folderPath, 'users.json');
  await fs.ensureFile(filePath);
  const rows = (await fs.readJson(filePath, { throws: false })) || {};

  rows[email] = {
    displayName,
    email,
  };
  await fs.writeJson(filePath, rows);
};

export const getUser = async (params: { email: string }) => {
  const { email } = params;
  const folderPath = path.join(process.cwd(), 'data');
  await fs.ensureDir(folderPath);
  const filePath = path.join(folderPath, 'users.json');
  await fs.ensureFile(filePath);
  const rows = (await fs.readJson(filePath, { throws: false })) || {};
  return { ...rows[email] };
};

export const saveConfirmationCode = async (params: { email: string; code: string }) => {
  const { email, code } = params;

  const folderPath = path.join(process.cwd(), 'data');
  await fs.ensureDir(folderPath);
  const filePath = path.join(folderPath, 'user_confirmation.json');
  await fs.ensureFile(filePath);
  const rows = (await fs.readJson(filePath, { throws: false })) || {};
  rows[email] = code;
  await fs.writeJson(filePath, rows);
};

export const getConfirmationCode = async (params: { code: string }) => {
  const { code } = params;
  const folderPath = path.join(process.cwd(), 'data');
  await fs.ensureDir(folderPath);
  const filePath = path.join(folderPath, 'user_confirmation.json');
  await fs.ensureFile(filePath);
  const rows = (await fs.readJson(filePath, { throws: false })) || {};

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
  const folderPath = path.join(process.cwd(), 'data');
  await fs.ensureDir(folderPath);
  const filePath = path.join(folderPath, 'users.json');
  await fs.ensureFile(filePath);
  const rows = (await fs.readJson(filePath, { throws: false })) || {};
  rows[email] = {
    ...rows[email],
    password,
  };
  await fs.writeJson(filePath, rows);
};
