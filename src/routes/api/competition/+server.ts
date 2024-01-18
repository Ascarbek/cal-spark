import { json, type RequestHandler } from '@sveltejs/kit';
import { getAllCompetitions, saveCompetition } from '$srv/CompetitionData';

export const GET: RequestHandler = async () => {
  const rows = await getAllCompetitions();
  return json([...rows]);
};

export const POST: RequestHandler = async ({ request }) => {
  const { id, name, description, fullDescription, picture, cover, tags, incentive, category } = await request.json();

  await saveCompetition({
    id,
    name,
    description,
    fullDescription,
    picture,
    cover,
    tags,
    incentive,
    category,
  });

  return json({});
};

export const PUT: RequestHandler = async ({ request }) => {
  const { name, description, fullDescription, picture, cover, tags, incentive, category } = await request.json();
  const id = crypto.randomUUID();

  await saveCompetition({
    id,
    name,
    description,
    fullDescription,
    picture,
    cover,
    tags,
    incentive,
    category,
  });

  return json({});
};
