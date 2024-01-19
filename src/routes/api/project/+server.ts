import { json, type RequestHandler } from '@sveltejs/kit';
import { getAllProjects, saveProject } from '$srv/ProjectData';

export const PUT: RequestHandler = async ({ request }) => {
  const { name, description, fullDescription, picture, cover, tags, incentive, category } = await request.json();
  const id = crypto.randomUUID();

  await saveProject({
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

export const GET: RequestHandler = async () => {
  const rows = await getAllProjects();
  return json([...rows]);
};
