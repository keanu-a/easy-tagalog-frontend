'use client';

import { usePathname } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';

import {
  BadgeCheck,
  BookCheckIcon,
  ChevronRight,
  ChevronsUpDown,
  HomeIcon,
  LogOut,
} from 'lucide-react';

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
  useSidebar,
} from '../ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { signOut } from '@/app/dashboard/actions';

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

export default function DashboardSidebar({ user }: { user: User }) {
  const pathname = usePathname();

  const { isMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="mx-auto">
        <Logo />
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="space-y-2">
            {dashboardLinks.map((link, i) => {
              return (
                <SidebarMenuItem key={i}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === link.href}
                    tooltip={link.label}
                  >
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

      {/* User Nav Links */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  variant="outline"
                  className="cursor-pointer"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="bg-ph-blue text-white">
                      {user.user_metadata.name?.[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="font-medium">{user.user_metadata.name}</span>
                    <span className="text-xs">{user.email}</span>
                  </div>
                  <ChevronsUpDown className="size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="mb-2"
                side={isMobile ? 'top' : 'right'}
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/dashboard/account">
                      <BadgeCheck />
                      Account
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={signOut}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
