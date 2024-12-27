'use client';

import { useCampaigns } from '@/hooks/use-campaigns';
import { CampaignCard } from './campaign-card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export function CampaignsList() {
  const { campaigns, loading, error } = useCampaigns();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        Failed to load campaigns. Please try again.
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="text-center p-4 text-muted-foreground">
        No campaigns yet. Create your first campaign to get started.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
}