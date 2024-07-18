import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
import { NextApiRequest } from 'next';

export async function GET(req: NextApiRequest, res: Response) {
  try {
    await serverAuth();

    const movies = await prismadb.movie.findMany();

    return new Response(JSON.stringify(movies), { status: 200 });
  } catch (error) {
    console.error(error);
    new Response('Internal server error', { status: 500 });
  }
}
