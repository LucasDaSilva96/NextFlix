import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
import { NextResponse } from 'next/server';

export async function GET(req: Request, res: Response) {
  try {
    await serverAuth();

    const movies = await prismadb.movie.findMany();

    return NextResponse.json(movies, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Internal server error', { status: 500 });
  }
}
