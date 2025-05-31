import DashboardMobileNav from '@/components/dashboard/DashboardMobileNav';
import DashboardNav from '@/components/dashboard/DashboardNav';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <DashboardNav />

      <DashboardMobileNav />
      {children}
    </div>
  );
}
