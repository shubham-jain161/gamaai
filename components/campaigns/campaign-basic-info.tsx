'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface CampaignBasicInfoProps {
  value: {
    name: string;
    description: string;
  };
  onChange: (value: { name: string; description: string }) => void;
}

export function CampaignBasicInfo({ value, onChange }: CampaignBasicInfoProps) {
  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="name">Campaign Name</Label>
        <Input
          id="name"
          value={value.name}
          onChange={(e) => onChange({ ...value, name: e.target.value })}
          placeholder="Q4 Sales Outreach"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={value.description}
          onChange={(e) => onChange({ ...value, description: e.target.value })}
          placeholder="Campaign objectives and notes..."
        />
      </div>
    </div>
  );
}