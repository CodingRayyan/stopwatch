import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '@/components/Layout';
import { Clock, Zap, BarChart3, Bookmark, Flame, Users, Flag } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Basic Stopwatch',
    description: 'Classic stopwatch with start, stop, and reset functions',
    href: '/stopwatch',
    color: 'text-green-600',
  },
  {
    icon: Flag,
    title: 'Lap Timer',
    description: 'Record and track individual lap times with precision',
    href: '/lap-timer',
    color: 'text-blue-600',
  },
  {
    icon: Zap,
    title: 'Countdown Timer',
    description: 'Set a custom timer and get notified when time is up',
    href: '/countdown',
    color: 'text-red-600',
  },
  {
    icon: Flame,
    title: 'Interval Timer',
    description: 'Perfect for workouts, Pomodoro, and HIIT training',
    href: '/interval',
    color: 'text-orange-600',
  },
  {
    icon: Zap,
    title: 'Multi-Timer',
    description: 'Run multiple stopwatches simultaneously',
    href: '/multi-timer',
    color: 'text-purple-600',
  },
  {
    icon: BarChart3,
    title: 'Statistics',
    description: 'Track your timing history and performance metrics',
    href: '/statistics',
    color: 'text-indigo-600',
  },
];



export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="py-12 md:py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
            <span className="text-3xl">⏱</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Precision Timing
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            A comprehensive stopwatch and timer application designed for productivity, fitness, and everyday timing needs.
          </p>
          <Link href="/stopwatch">
            <a>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Start Timing Now
              </Button>
            </a>
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-12">
        <h2 className="text-3xl font-bold mb-12 text-center">All the Tools You Need</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.href} href={feature.href}>
                <a>
                  <Card className="h-full hover:shadow-lg hover:border-primary transition-all cursor-pointer">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-4 ${feature.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </a>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">15+</CardTitle>
            <CardDescription>Dedicated Pages</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Explore multiple timer modes and features</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">100%</CardTitle>
            <CardDescription>Free & Open</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No ads, no subscriptions, no tracking</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">⚡</CardTitle>
            <CardDescription>Lightning Fast</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Optimized for speed and accuracy</p>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="py-12 bg-accent rounded-2xl px-6 md:px-12 py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Choose your timer mode and start tracking time with precision and ease.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/stopwatch">
            <a>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Basic Stopwatch
              </Button>
            </a>
          </Link>
          <Link href="/help">
            <a>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

