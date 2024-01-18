import fs from 'fs-extra';
import path from 'path';

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
