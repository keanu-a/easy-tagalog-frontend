'use client';

import { usePathname } from 'next/navigation';

import { BookCheckIcon, ChevronRight, HomeIcon } from 'lucide-react';
import Logo from '../Logo';
import { Separator } from '../ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';
import Link from 'next/link';

const dashboardLinks = [
  {
    label: 'Home',
    href: '/dashboard',
    icon: HomeIcon,
  },
  {
    label: 'Learn',
    href: '/dashboard/learn',
    icon: BookCheckIcon,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="mx-auto">
        <Logo />
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="space-y-4">
            {dashboardLinks.map((link, i) => {
              return (
                <SidebarMenuItem key={i}>
                  <SidebarMenuButton asChild isActive={pathname === link.href}>
                    <Link href={link.href}>
                      {link.icon && <link.icon />}
                      <span>{link.label}</span>
                      <ChevronRight className="ml-auto" />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div>U</div>
      </SidebarFooter>
    </Sidebar>
  );
}
