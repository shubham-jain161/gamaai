'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CampaignData {
  name: string;
  description: string;
  templateId: string;
  targetingCriteria: Record<string, any>;
}

export function useCreateCampaign() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function createCampaign(data: CampaignData) {
    setLoading(true);
    try {
      const { error } = await supabase.from('email_campaigns').insert([{
        name: data.name,
        status: 'draft',
        settings: {
          description: data.description,
          template_id: data.templateId,
          targeting: data.targetingCriteria,
        },
        metrics: {
          sent: 0,
          opened: 0,
          replied: 0,
        },
      }]);

      if (error) throw error;

      toast({
        title: 'Campaign Created',
        description: 'Your campaign has been created successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create campaign. Please try again.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return { createCampaign, loading };
}