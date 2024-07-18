import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export async function GET(req: NextApiRequest, res: Response) {
  try {
    await serverAuth();

    const movieCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);

    const randomMovie = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return new Response(JSON.stringify(randomMovie[0]), { status: 200 });
  } catch (e) {
    console.log(e);
    if (e instanceof Error) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 400,
      });
    } else {
      return new Response(JSON.stringify({ error: 'An error occurred' }), {
        status: 400,
      });
    }
  }
}
