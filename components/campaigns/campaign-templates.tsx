'use client';

import { useEmailTemplates } from '@/hooks/use-email-templates';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Plus } from 'lucide-react';
import { CreateTemplateDialog } from './create-template-dialog';
import { useState } from 'react';

interface CampaignTemplatesProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export function CampaignTemplates({ selectedId, onSelect }: CampaignTemplatesProps) {
  const { templates, loading } = useEmailTemplates();
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-4 py-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Select Email Template</h3>
        <Button variant="outline" size="sm" onClick={() => setShowCreateTemplate(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Template
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`p-4 cursor-pointer hover:border-primary transition-colors ${
              selectedId === template.id ? 'border-primary' : ''
            }`}
            onClick={() => onSelect(template.id)}
          >
            <h4 className="font-medium">{template.name}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {template.subject}
            </p>
          </Card>
        ))}
      </div>

      <CreateTemplateDialog
        open={showCreateTemplate}
        onOpenChange={setShowCreateTemplate}
      />
    </div>
  );
}