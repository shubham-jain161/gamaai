'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { EmailCampaign } from '@/lib/supabase/types';
import { useToast } from '@/hooks/use-toast';

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  async function fetchCampaigns() {
    try {
      const { data, error } = await supabase
        .from('email_campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCampaigns(data || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  return { campaigns, loading, error, refetch: fetchCampaigns };
}

export function useCampaignActions() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function toggleCampaign(id: string, currentStatus: string) {
    setLoading(true);
    try {
      const newStatus = currentStatus === 'active' ? 'paused' : 'active';
      const { error } = await supabase
        .from('email_campaigns')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Campaign Updated',
        description: `Campaign ${newStatus === 'active' ? 'started' : 'paused'} successfully`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update campaign status',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return { toggleCampaign, loading };
}