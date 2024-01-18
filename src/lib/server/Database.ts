import path from 'path';
import fs from 'fs-extra';

export const getTableRows = async (table: string) => {
	const folderPath = path.join(process.cwd(), 'data');
	await fs.ensureDir(folderPath);
	const filePath = path.join(folderPath, table);
	await fs.ensureFile(filePath);
	return (await fs.readJson(filePath, { throws: false })) || {};
};

export const saveTableRows = async (rows: any, table: string) => {
	const folderPath = path.join(process.cwd(), 'data');
	await fs.ensureDir(folderPath);
	const filePath = path.join(folderPath, table);
	await fs.ensureFile(filePath);
	await fs.writeJson(filePath, rows);
};