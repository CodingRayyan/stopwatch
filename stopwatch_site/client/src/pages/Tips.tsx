import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, BookOpen, Target, Zap } from 'lucide-react';

export default function Tips() {
  const tips = [
    {
      icon: '🍅',
      title: 'Pomodoro Technique',
      description: '25 minutes of focused work followed by 5 minutes of rest. Perfect for productivity.',
      details: [
        'Set work time to 25 minutes',
        'Set rest time to 5 minutes',
        'Complete 4 cycles for a long break',
        'Great for deep work and learning',
      ],
    },
    {
      icon: '💪',
      title: 'HIIT Training',
      description: 'High-Intensity Interval Training for maximum fitness gains in minimal time.',
      details: [
        'Alternate 30 seconds of intense exercise with 10 seconds rest',
        'Complete 8 rounds for a quick 5-minute workout',
        'Increases metabolism and builds endurance',
        'Perfect for busy schedules',
      ],
    },
    {
      icon: '🧘',
      title: 'Meditation & Mindfulness',
      description: 'Use the countdown timer for guided meditation sessions.',
      details: [
        'Start with 5-10 minute sessions',
        'Gradually increase duration as you progress',
        'Use the timer to avoid checking the clock',
        'Reduces stress and improves focus',
      ],
    },
    {
      icon: '📚',
      title: 'Study Sessions',
      description: 'Optimize your learning with strategic timing.',
      details: [
        'Study for 50 minutes, rest for 10 minutes',
        'Review material during rest breaks',
        'Use multiple sessions for better retention',
        'Combine with lap timer to track progress',
      ],
    },
    {
      icon: '🍳',
      title: 'Cooking & Recipes',
      description: 'Perfect timing for culinary success.',
      details: [
        'Use countdown timer for precise cooking times',
        'Set multiple timers for different dishes',
        'Avoid overcooking or burning food',
        'Save your favorite cooking times as templates',
      ],
    },
    {
      icon: '🏃',
      title: 'Running & Exercise',
      description: 'Track your athletic performance with precision.',
      details: [
        'Use lap timer to track split times',
        'Monitor your pace and progress',
        'Set interval timers for tempo runs',
        'Compare your personal records',
      ],
    },
  ];

  const productivity_hacks = [
    {
      title: 'The 2-Minute Rule',
      description: 'If a task takes less than 2 minutes, do it immediately. Use the countdown timer to stay accountable.',
    },
    {
      title: 'Time Blocking',
      description: 'Divide your day into blocks of focused time. Use interval timers to switch between tasks.',
    },
    {
      title: 'The 5-Minute Break',
      description: 'After every 25-minute work session, take a 5-minute break. Use the timer to enforce this habit.',
    },
    {
      title: 'Sprint Sessions',
      description: 'Set a timer for 15-20 minutes and work intensely on one task. Great for overcoming procrastination.',
    },
    {
      title: 'Meeting Timer',
      description: 'Use the countdown timer to keep meetings on schedule and respect everyone\'s time.',
    },
    {
      title: 'Habit Tracking',
      description: 'Use the history page to track how long you spend on different activities and build better habits.',
    },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-4xl font-bold mb-2">Tips & Tricks</h1>
        <p className="text-muted-foreground mb-8">
          Learn how to maximize productivity and achieve your goals with strategic timing.
        </p>

        {/* Timer Techniques */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Target className="w-6 h-6" />
            Popular Timing Techniques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips.map((tip, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <span className="text-4xl">{tip.icon}</span>
                    <div>
                      <CardTitle className="text-lg">{tip.title}</CardTitle>
                      <CardDescription>{tip.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tip.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-green-600 font-bold mt-0.5">✓</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Productivity Hacks */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Lightbulb className="w-6 h-6" />
            Productivity Hacks
          </h2>
          <div className="space-y-4">
            {productivity_hacks.map((hack, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center font-bold text-blue-600 dark:text-blue-300">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{hack.title}</h3>
                      <p className="text-sm text-muted-foreground">{hack.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Best Practices */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Best Practices
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">🎯 Set Clear Goals</h4>
              <p className="text-sm text-muted-foreground">
                Before starting a timer, know exactly what you want to accomplish. This increases focus and productivity.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">📊 Track Your Progress</h4>
              <p className="text-sm text-muted-foreground">
                Use the history and statistics pages to monitor your patterns. Data-driven insights help you improve.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">⚙️ Customize Your Settings</h4>
              <p className="text-sm text-muted-foreground">
                Adjust sound, vibration, and notification settings to match your preferences and environment.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">💾 Save Templates</h4>
              <p className="text-sm text-muted-foreground">
                Create templates for your most-used timer configurations to save time and maintain consistency.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🔄 Experiment & Adapt</h4>
              <p className="text-sm text-muted-foreground">
                Try different timing techniques to find what works best for you. Everyone's productivity rhythm is different.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Start Guide */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Quick Start Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3">
              <span className="text-2xl">1️⃣</span>
              <div>
                <p className="font-semibold">Choose Your Timer Mode</p>
                <p className="text-sm text-muted-foreground">Stopwatch, Countdown, or Interval</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">2️⃣</span>
              <div>
                <p className="font-semibold">Configure Your Settings</p>
                <p className="text-sm text-muted-foreground">Set duration, enable notifications, adjust theme</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">3️⃣</span>
              <div>
                <p className="font-semibold">Start Timing</p>
                <p className="text-sm text-muted-foreground">Click Start and focus on your task</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">4️⃣</span>
              <div>
                <p className="font-semibold">Review Your History</p>
                <p className="text-sm text-muted-foreground">Check statistics and track your progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

