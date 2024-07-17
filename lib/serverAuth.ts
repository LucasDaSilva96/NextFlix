import { NextApiRequest } from 'next';
import { getServerSession } from 'next-auth';
import prismadb from '@/lib/prismadb';

// This function is used to authenticate the user on the server side
const serverAuth = async () => {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      throw new Error('Not signed in');
    }

    const currentUser = await prismadb.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      throw new Error('User not found');
    }
    return currentUser;
  } catch (error) {
    throw new Error(error as string);
  }
};

export default serverAuth;
