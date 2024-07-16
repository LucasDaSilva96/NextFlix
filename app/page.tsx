import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
export default async function Home() {
  const session = await getServerSession();

  if (!session) {
    return redirect('/auth');
  }
  return (
    <main className=''>
      <h1 className='heading text-slate-100'>NextFlix</h1>
    </main>
  );
}
