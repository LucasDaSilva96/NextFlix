import serverAuth from '@/lib/serverAuth';
import { NextRequest, NextResponse } from 'next/server';

// This is the API route that will be called when the user is already authenticated
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const currentUser = await serverAuth();

    currentUser.hashedPassword = '';

    return NextResponse.json(currentUser, { status: 200 });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ error: 'An error occurred' }, { status: 400 });
    }
  }
}
