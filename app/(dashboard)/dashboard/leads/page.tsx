'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LeadsTable } from '@/components/leads/leads-table';
import { LeadFilters } from '@/components/leads/lead-filters';
import { Plus, Upload, Download } from 'lucide-react';
import { AddLeadDialog } from '@/components/leads/add-lead-dialog';

export default function LeadsPage() {
  const [showAddLead, setShowAddLead] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Leads</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={() => setShowAddLead(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Lead
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Search leads..."
              className="max-w-sm"
            />
            <LeadFilters />
          </div>
          <LeadsTable />
        </div>
      </Card>

      <AddLeadDialog open={showAddLead} onOpenChange={setShowAddLead} />
    </div>
  );
}