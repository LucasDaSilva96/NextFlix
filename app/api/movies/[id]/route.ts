import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export async function GET(req: Request, res: Response) {
  try {
    const id = req.url?.split('/')[5];
    if (id !== 'undefined') {
      await serverAuth();

      const movie = await prismadb.movie.findUnique({
        where: {
          id: id,
        },
      });

      if (!movie) {
        return new Response('Movie not found', { status: 404 });
      }

      return new Response(JSON.stringify(movie), { status: 200 });
    } else {
      return new Response('Movie not found', { status: 200 });
    }
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
