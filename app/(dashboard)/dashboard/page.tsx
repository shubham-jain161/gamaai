import { Card } from '@/components/ui/card';
import { BarChart3, Users, Mail, TrendingUp } from 'lucide-react';

const stats = [
  {
    name: 'Total Leads',
    value: '2,651',
    change: '+12.5%',
    icon: Users,
  },
  {
    name: 'Active Campaigns',
    value: '8',
    change: '+2.1%',
    icon: Mail,
  },
  {
    name: 'Response Rate',
    value: '24.3%',
    change: '+4.3%',
    icon: TrendingUp,
  },
  {
    name: 'Conversion Rate',
    value: '8.2%',
    change: '+1.2%',
    icon: BarChart3,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <Icon className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="mt-4">
                <span className="text-sm text-green-600">{stat.change}</span>
                <span className="text-sm text-muted-foreground"> vs last month</span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}