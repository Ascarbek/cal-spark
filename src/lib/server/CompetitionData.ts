import { getTableRows, saveTableRows } from '$srv/Database';

const getCompetitionRows = async () => {
  return getTableRows('competitions.json');
};

const saveCompetitionRows = async (rows: any[]) => {
  await saveTableRows(rows, 'competitions.json');
};

export const getAllCompetitions = async () => {
  const rows = await getCompetitionRows();

  return Object.keys(rows).map((id) => ({ ...rows[id] }));
};

export const saveCompetition = async (params: ICompetition) => {
  const rows = await getCompetitionRows();
  rows[params.id] = { ...params };
  await saveCompetitionRows(rows);
};
