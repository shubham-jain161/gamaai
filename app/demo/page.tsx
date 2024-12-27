'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Bot } from 'lucide-react';
import Link from 'next/link';

export default function DemoPage() {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle demo request
  };

  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center">
      <Link href="/" className="absolute left-4 top-4 flex items-center space-x-2 md:left-8 md:top-8">
        <Bot className="h-6 w-6" />
        <span className="font-bold">Gama AI</span>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Request a Demo</h1>
          <p className="text-sm text-muted-foreground">
            See how Gama AI can transform your sales development process
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <Input
              id="company"
              placeholder="Acme Inc."
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Work Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Request Demo
          </Button>
        </form>
      </div>
    </div>
  );
}