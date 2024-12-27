/*
  # Initial Schema Setup for Gama AI

  1. New Tables
    - organizations
      - Stores company information and settings
      - Multi-tenant support with isolated data
    - users
      - User profiles with organization association
    - leads
      - Lead information and scoring
      - Linked to organizations for data isolation
    - email_templates
      - Reusable email templates for campaigns
    - email_campaigns
      - Campaign configurations and metrics
    - campaign_emails
      - Individual emails sent within campaigns
    - lead_scores
      - Scoring criteria and results for leads

  2. Security
    - RLS policies for multi-tenant data isolation
    - Organization-based access control
*/

-- Organizations table
CREATE TABLE organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  settings jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

-- Users table (extends auth.users)
CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users,
  organization_id uuid REFERENCES organizations,
  full_name text,
  role text DEFAULT 'user',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Leads table
CREATE TABLE leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations NOT NULL,
  email text NOT NULL,
  full_name text,
  company text,
  job_title text,
  industry text,
  company_size text,
  status text DEFAULT 'new',
  score integer DEFAULT 0,
  data jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Email templates
CREATE TABLE email_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations NOT NULL,
  name text NOT NULL,
  subject text NOT NULL,
  content text NOT NULL,
  variables jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;

-- Email campaigns
CREATE TABLE email_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations NOT NULL,
  name text NOT NULL,
  status text DEFAULT 'draft',
  settings jsonb DEFAULT '{}'::jsonb,
  metrics jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;

-- Campaign emails
CREATE TABLE campaign_emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES email_campaigns NOT NULL,
  lead_id uuid REFERENCES leads NOT NULL,
  template_id uuid REFERENCES email_templates NOT NULL,
  status text DEFAULT 'pending',
  scheduled_for timestamptz,
  sent_at timestamptz,
  opened_at timestamptz,
  replied_at timestamptz,
  metrics jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE campaign_emails ENABLE ROW LEVEL SECURITY;

-- Lead scoring criteria
CREATE TABLE lead_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations NOT NULL,
  name text NOT NULL,
  criteria jsonb NOT NULL,
  weight integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE lead_scores ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Organizations: Users can only access their own organization
CREATE POLICY "Users can view their own organization"
  ON organizations
  FOR SELECT
  USING (
    id IN (
      SELECT organization_id 
      FROM users 
      WHERE users.id = auth.uid()
    )
  );

-- Users: Can only view users in their organization
CREATE POLICY "Users can view members of their organization"
  ON users
  FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id 
      FROM users 
      WHERE users.id = auth.uid()
    )
  );

-- Leads: Organization-based access
CREATE POLICY "Users can access leads in their organization"
  ON leads
  FOR ALL
  USING (
    organization_id IN (
      SELECT organization_id 
      FROM users 
      WHERE users.id = auth.uid()
    )
  );

-- Email templates: Organization-based access
CREATE POLICY "Users can access email templates in their organization"
  ON email_templates
  FOR ALL
  USING (
    organization_id IN (
      SELECT organization_id 
      FROM users 
      WHERE users.id = auth.uid()
    )
  );

-- Email campaigns: Organization-based access
CREATE POLICY "Users can access email campaigns in their organization"
  ON email_campaigns
  FOR ALL
  USING (
    organization_id IN (
      SELECT organization_id 
      FROM users 
      WHERE users.id = auth.uid()
    )
  );

-- Campaign emails: Organization-based access through campaigns
CREATE POLICY "Users can access campaign emails in their organization"
  ON campaign_emails
  FOR ALL
  USING (
    campaign_id IN (
      SELECT id 
      FROM email_campaigns 
      WHERE organization_id IN (
        SELECT organization_id 
        FROM users 
        WHERE users.id = auth.uid()
      )
    )
  );

-- Lead scores: Organization-based access
CREATE POLICY "Users can access lead scores in their organization"
  ON lead_scores
  FOR ALL
  USING (
    organization_id IN (
      SELECT organization_id 
      FROM users 
      WHERE users.id = auth.uid()
    )
  );