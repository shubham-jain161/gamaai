'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { Lead } from '@/lib/supabase/types';

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  }

  return { leads, loading, refetch: fetchLeads };
}

export function useAddLead() {
  const [loading, setLoading] = useState(false);

  async function addLead(leadData: Partial<Lead>) {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('leads')
        .insert([leadData]);

      if (error) throw error;
    } catch (error) {
      console.error('Error adding lead:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return { addLead, loading };
}