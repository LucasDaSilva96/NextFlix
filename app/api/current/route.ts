import serverAuth from '@/lib/serverAuth';

// This is the API route that will be called when the user is already authenticated
export async function GET(_req: Request, _res: Response) {
  try {
    const currentUser = await serverAuth();

    currentUser.hashedPassword = '';

    return new Response(JSON.stringify(currentUser), { status: 200 });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      new Response(JSON.stringify({ error: error.message }), {
        status: 400,
      });
    } else {
      return new Response(
        JSON.stringify({
          error: 'Something went wrong. Check the server log.',
        }),
        {
          status: 400,
        }
      );
    }
  }
}
