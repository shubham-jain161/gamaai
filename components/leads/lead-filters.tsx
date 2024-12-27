'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function LeadFilters() {
  return (
    <div className="flex gap-2">
      <Select defaultValue="all">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="new">New</SelectItem>
          <SelectItem value="qualified">Qualified</SelectItem>
          <SelectItem value="contacted">Contacted</SelectItem>
          <SelectItem value="disqualified">Disqualified</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="all">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Score" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Scores</SelectItem>
          <SelectItem value="high">High (80-100)</SelectItem>
          <SelectItem value="medium">Medium (50-79)</SelectItem>
          <SelectItem value="low">Low (0-49)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}