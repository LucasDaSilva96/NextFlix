import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
import { NextApiRequest } from 'next';

export async function POST(req: Request, res: Response) {
  try {
    const user = await serverAuth();
    const body = await req.json();

    const { movieId } = body;

    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!existingMovie) {
      return new Response('Movie not found', { status: 404 });
    }

    const updatedUserFavs = await prismadb.user.update({
      where: {
        email: user.email || '',
      },
      data: {
        favoritesIds: {
          push: movieId,
        },
      },
    });

    return new Response(JSON.stringify(updatedUserFavs), { status: 200 });
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

export async function DELETE(req: Response, res: Response) {
  try {
    const user = await serverAuth();
    const body = await req.json();
    const { movieId } = body;

    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!existingMovie) {
      return new Response('Movie not found', { status: 404 });
    }

    const updatedUserFavs = await prismadb.user.update({
      where: {
        email: user.email || '',
      },
      data: {
        favoritesIds: {
          set: user.favoritesIds.filter((id) => id !== movieId),
        },
      },
    });

    return new Response(JSON.stringify(updatedUserFavs), { status: 200 });
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

export async function GET(req: NextApiRequest, res: Response) {
  try {
    const user = await serverAuth();

    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: user.favoritesIds,
        },
      },
    });

    return new Response(JSON.stringify(favoriteMovies), { status: 200 });
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
