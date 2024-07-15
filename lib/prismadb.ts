import { PrismaClient } from '@prisma/client';

let client: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  client = global.prismadb || new PrismaClient();
  global.prismadb = client;
} else {
  if (!global.prismadb) {
    global.prismadb = new PrismaClient();
  }
  client = global.prismadb;
}

export default client;
