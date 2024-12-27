import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, LineChart, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <Bot className="h-6 w-6" />
            <span className="text-xl font-bold">Gama AI</span>
          </div>
          <nav className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 py-24 text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight">
            Your AI-Powered Sales Development Representative
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Automate lead qualification, personalize outreach, and close more deals with
            our intelligent SDR platform powered by artificial intelligence.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/signup">
              <Button size="lg" className="gap-2">
                Start Free Trial <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline">
                Request Demo
              </Button>
            </Link>
          </div>
        </section>

        <section className="border-t bg-muted/50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Key Features</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg border bg-card p-6">
                <Bot className="mb-4 h-10 w-10 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">Lead Qualification</h3>
                <p className="text-muted-foreground">
                  Automatically analyze and score leads based on your criteria
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <Mail className="mb-4 h-10 w-10 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">Email Automation</h3>
                <p className="text-muted-foreground">
                  Personalized outreach campaigns with smart follow-ups
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <LineChart className="mb-4 h-10 w-10 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">Analytics Dashboard</h3>
                <p className="text-muted-foreground">
                  Comprehensive insights into your sales pipeline
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Gama AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}