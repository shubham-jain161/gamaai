'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Pause, Settings } from 'lucide-react';
import type { EmailCampaign } from '@/lib/supabase/types';
import { useCampaignActions } from '@/hooks/use-campaigns';

export function CampaignCard({ campaign }: { campaign: EmailCampaign }) {
  const { toggleCampaign, loading } = useCampaignActions();

  const metrics = campaign.metrics as {
    sent: number;
    opened: number;
    replied: number;
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{campaign.name}</h3>
          <p className="text-sm text-muted-foreground">
            Created {new Date(campaign.created_at).toLocaleDateString()}
          </p>
        </div>
        <Badge variant={campaign.status === 'active' ? 'success' : 'secondary'}>
          {campaign.status}
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="text-2xl font-bold">{metrics?.sent || 0}</div>
          <div className="text-xs text-muted-foreground">Sent</div>
        </div>
        <div>
          <div className="text-2xl font-bold">
            {((metrics?.opened || 0) / (metrics?.sent || 1) * 100).toFixed(1)}%
          </div>
          <div className="text-xs text-muted-foreground">Open Rate</div>
        </div>
        <div>
          <div className="text-2xl font-bold">
            {((metrics?.replied || 0) / (metrics?.sent || 1) * 100).toFixed(1)}%
          </div>
          <div className="text-xs text-muted-foreground">Reply Rate</div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          disabled={loading}
          onClick={() => toggleCampaign(campaign.id, campaign.status)}
        >
          {campaign.status === 'active' ? (
            <><Pause className="h-4 w-4 mr-2" /> Pause</>
          ) : (
            <><Play className="h-4 w-4 mr-2" /> Start</>
          )}
        </Button>
        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4 mr-2" /> Settings
        </Button>
      </div>
    </Card>
  );
}