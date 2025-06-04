import Link from 'next/link';

export default function DashboardMobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 flex justify-around w-full h-16 items-center bg-gray-100 md:hidden">
      <Link href="/dashboard/learn">Learn</Link>
      <Link href="/dashboard/stats">Stats</Link>
      <Link href="/dashboard/profile">Profile</Link>
      <Link href="/dashboard/settings">Settings</Link>
    </nav>
  );
}
