import { json, type RequestHandler } from '@sveltejs/kit';
import * as fs from 'fs-extra';
import * as path from 'path';

export const PUT: RequestHandler = async ({ request }) => {
  const formData = await request.formData();
  const attached_file = formData.get('attached_file');
  const name = formData.get('name');
  if (!attached_file || !name) {
    throw new Error('No file or name provided!');
  }

  const folderPath = path.join(process.cwd(), 'static', 'upload');
  await fs.ensureDir(folderPath);
  const generatedName = crypto.randomUUID() + path.extname(name.toString());

  const filePath = path.join(folderPath, `${generatedName}`);
  await fs.writeFile(filePath, Buffer.from(await (attached_file as Blob).arrayBuffer()));

  return json({
    id: generatedName,
  });
};
