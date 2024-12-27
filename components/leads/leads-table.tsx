'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useLeads } from '@/hooks/use-leads';

export function LeadsTable() {
  const { leads, loading } = useLeads();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Contact</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.map((lead) => (
          <TableRow key={lead.id}>
            <TableCell>{lead.full_name}</TableCell>
            <TableCell>{lead.company}</TableCell>
            <TableCell>{lead.email}</TableCell>
            <TableCell>{lead.score}</TableCell>
            <TableCell>
              <Badge variant={getStatusVariant(lead.status)}>
                {lead.status}
              </Badge>
            </TableCell>
            <TableCell>{formatDate(lead.updated_at)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function getStatusVariant(status: string) {
  switch (status.toLowerCase()) {
    case 'qualified':
      return 'success';
    case 'new':
      return 'default';
    case 'contacted':
      return 'info';
    case 'disqualified':
      return 'destructive';
    default:
      return 'secondary';
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}