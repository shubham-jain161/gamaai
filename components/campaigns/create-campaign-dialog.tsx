'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CampaignBasicInfo } from './campaign-basic-info';
import { CampaignTemplates } from './campaign-templates';
import { CampaignTargeting } from './campaign-targeting';
import { useCreateCampaign } from '@/hooks/use-campaign-creation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function CreateCampaignDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [step, setStep] = useState('basics');
  const { createCampaign, loading } = useCreateCampaign();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    templateId: '',
    targetingCriteria: {},
  });

  const handleSubmit = async () => {
    await createCampaign(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create New Campaign</DialogTitle>
        </DialogHeader>
        
        <Tabs value={step} onValueChange={setStep}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basics">Basic Info</TabsTrigger>
            <TabsTrigger value="template">Email Template</TabsTrigger>
            <TabsTrigger value="targeting">Targeting</TabsTrigger>
          </TabsList>

          <TabsContent value="basics">
            <CampaignBasicInfo
              value={formData}
              onChange={(data) => setFormData({ ...formData, ...data })}
            />
          </TabsContent>

          <TabsContent value="template">
            <CampaignTemplates
              selectedId={formData.templateId}
              onSelect={(id) => setFormData({ ...formData, templateId: id })}
            />
          </TabsContent>

          <TabsContent value="targeting">
            <CampaignTargeting
              value={formData.targetingCriteria}
              onChange={(criteria) => 
                setFormData({ ...formData, targetingCriteria: criteria })
              }
            />
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <div className="flex justify-between w-full">
            <Button
              variant="outline"
              onClick={() => {
                if (step === 'template') setStep('basics');
                if (step === 'targeting') setStep('template');
              }}
              disabled={step === 'basics'}
            >
              Previous
            </Button>
            {step === 'targeting' ? (
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Creating...' : 'Create Campaign'}
              </Button>
            ) : (
              <Button
                onClick={() => {
                  if (step === 'basics') setStep('template');
                  if (step === 'template') setStep('targeting');
                }}
              >
                Next
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}