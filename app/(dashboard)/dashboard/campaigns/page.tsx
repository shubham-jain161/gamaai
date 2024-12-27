'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CampaignsList } from '@/components/campaigns/campaigns-list';
import { CreateCampaignDialog } from '@/components/campaigns/create-campaign-dialog';

export default function CampaignsPage() {
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Email Campaigns</h1>
        <Button size="sm" onClick={() => setShowCreateCampaign(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      <Card className="p-6">
        <CampaignsList />
      </Card>

      <CreateCampaignDialog 
        open={showCreateCampaign} 
        onOpenChange={setShowCreateCampaign} 
      />
    </div>
  );
}