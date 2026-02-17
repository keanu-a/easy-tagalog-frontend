import { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import DashboardMobileNav from '@/components/dashboard/DashboardMobileNav';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { createClient } from '@/utils/supabase/server';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset>
          <SidebarTrigger className="ml-1 mt-1" />
        </SidebarInset>

        <DashboardMobileNav />
        <div className="flex items-center justify-center mx-auto">
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
}
