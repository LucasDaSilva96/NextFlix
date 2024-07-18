import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
import { NextApiRequest } from 'next';

export async function GET(req: NextApiRequest, res: Response) {
  try {
    await serverAuth();
    const id = req.url?.split('/')[5];

    const movie = await prismadb.movie.findUnique({
      where: {
        id: id,
      },
    });

    if (!movie) {
      return new Response('Movie not found', { status: 404 });
    }

    return new Response(JSON.stringify(movie), { status: 200 });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    } else {
      return new Response('Internal server error', { status: 500 });
    }
  }
}
