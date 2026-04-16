import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function DashboardHome() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.email}!</p>
    </div>
  );
}
