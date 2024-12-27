export type Organization = {
  id: string;
  name: string;
  settings: Record<string, any>;
  created_at: string;
  updated_at: string;
};

export type User = {
  id: string;
  organization_id: string;
  full_name: string | null;
  role: string;
  created_at: string;
  updated_at: string;
};

export type Lead = {
  id: string;
  organization_id: string;
  email: string;
  full_name: string | null;
  company: string | null;
  job_title: string | null;
  industry: string | null;
  company_size: string | null;
  status: string;
  score: number;
  data: Record<string, any>;
  created_at: string;
  updated_at: string;
};

export type EmailTemplate = {
  id: string;
  organization_id: string;
  name: string;
  subject: string;
  content: string;
  variables: string[];
  created_at: string;
  updated_at: string;
};

export type EmailCampaign = {
  id: string;
  organization_id: string;
  name: string;
  status: string;
  settings: Record<string, any>;
  metrics: Record<string, any>;
  created_at: string;
  updated_at: string;
};

export type CampaignEmail = {
  id: string;
  campaign_id: string;
  lead_id: string;
  template_id: string;
  status: string;
  scheduled_for: string | null;
  sent_at: string | null;
  opened_at: string | null;
  replied_at: string | null;
  metrics: Record<string, any>;
  created_at: string;
  updated_at: string;
};

export type LeadScore = {
  id: string;
  organization_id: string;
  name: string;
  criteria: Record<string, any>;
  weight: number;
  created_at: string;
  updated_at: string;
};