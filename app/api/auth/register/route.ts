import bcrypt from 'bcrypt';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request, res: Response) {
  try {
    const data = await req.json();
    const { email, password, name } = data;

    if (!email || !password || !name) {
      throw new Error('Missing fields');
    }
    const existingUser = await prismadb.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        hashedPassword,
        name,
        image: '',
        emailVerified: new Date(),
      },
    });

    return new Response(JSON.stringify(user), { status: 201 });
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({ error: 'Failed to create new user' }),
      {
        status: 400,
      }
    );
  }
}
