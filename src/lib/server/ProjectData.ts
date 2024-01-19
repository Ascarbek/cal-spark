import { getTableRows, saveTableRows } from '$srv/Database';
import type { IProject } from '$components/_shared/Types';

const getProjectRows = async () => {
  return getTableRows('projects.json');
};

const saveProjectRows = async (rows: any[]) => {
  await saveTableRows(rows, 'projects.json');
};

export const getAllProjects = async () => {
  const rows = await getProjectRows();
  return Object.keys(rows).map((id) => ({ ...rows[id] }));
};

export const saveProject = async (row: IProject) => {
  const rows = await getProjectRows();
  rows[row.id] = row;
  await saveProjectRows(rows);
};
