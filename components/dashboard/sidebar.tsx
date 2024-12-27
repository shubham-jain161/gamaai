import { Bot, Users, Mail, Settings, BarChart3, FileText } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: BarChart3 },
  { name: 'Leads', href: '/dashboard/leads', icon: Users },
  { name: 'Campaigns', href: '/dashboard/campaigns', icon: Mail },
  { name: 'Reports', href: '/dashboard/reports', icon: FileText },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:flex-col md:w-64 md:bg-white md:border-r">
      <div className="flex items-center h-16 px-4 border-b">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Bot className="h-6 w-6" />
          <span className="font-bold">Gama AI</span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-4 py-2 text-sm rounded-md',
                pathname === item.href
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}