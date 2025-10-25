import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Star } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  name: string;
  category: string;
  time: string;
  record: string;
  icon: string;
}

export default function Leaderboard() {
  const leaderboards: Record<string, LeaderboardEntry[]> = {
    'Fastest 100m Sprint': [
      { rank: 1, name: 'Lightning McQueen', category: 'Sprint', time: '9.58s', record: 'World Record', icon: '⚡' },
      { rank: 2, name: 'Speed Demon', category: 'Sprint', time: '9.69s', record: 'Personal Best', icon: '🏃' },
      { rank: 3, name: 'Quick Silver', category: 'Sprint', time: '9.95s', record: 'Personal Best', icon: '💨' },
    ],
    'Longest Meditation': [
      { rank: 1, name: 'Zen Master', category: 'Meditation', time: '2h 45m', record: 'Personal Best', icon: '🧘' },
      { rank: 2, name: 'Peaceful Mind', category: 'Meditation', time: '2h 30m', record: 'Personal Best', icon: '☮️' },
      { rank: 3, name: 'Calm Soul', category: 'Meditation', time: '2h 15m', record: 'Personal Best', icon: '🌿' },
    ],
    'Most Pomodoro Sessions': [
      { rank: 1, name: 'Productivity King', category: 'Pomodoro', time: '156 sessions', record: 'This Month', icon: '👑' },
      { rank: 2, name: 'Focus Master', category: 'Pomodoro', time: '142 sessions', record: 'This Month', icon: '🎯' },
      { rank: 3, name: 'Time Tracker', category: 'Pomodoro', time: '128 sessions', record: 'This Month', icon: '⏰' },
    ],
    'HIIT Champion': [
      { rank: 1, name: 'Fitness Pro', category: 'HIIT', time: '45 workouts', record: 'This Month', icon: '💪' },
      { rank: 2, name: 'Gym Rat', category: 'HIIT', time: '38 workouts', record: 'This Month', icon: '🏋️' },
      { rank: 3, name: 'Cardio King', category: 'HIIT', time: '32 workouts', record: 'This Month', icon: '🔥' },
    ],
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-4xl font-bold mb-2">Leaderboard</h1>
        <p className="text-muted-foreground mb-8">
          See how you compare with other timer enthusiasts. These are example leaderboards to inspire your goals!
        </p>

        {/* Leaderboards */}
        <div className="space-y-8">
          {Object.entries(leaderboards).map(([category, entries]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {entries.map((entry) => (
                    <div
                      key={entry.rank}
                      className={`flex items-center gap-4 p-4 rounded-lg ${
                        entry.rank === 1
                          ? 'bg-yellow-100 dark:bg-yellow-950 border-2 border-yellow-400'
                          : entry.rank === 2
                            ? 'bg-gray-100 dark:bg-gray-800 border-2 border-gray-400'
                            : entry.rank === 3
                              ? 'bg-orange-100 dark:bg-orange-950 border-2 border-orange-400'
                              : 'bg-accent'
                      }`}
                    >
                      <div className="flex items-center justify-center w-12 h-12">
                        {entry.rank === 1 && <Trophy className="w-6 h-6 text-yellow-600" />}
                        {entry.rank === 2 && <Medal className="w-6 h-6 text-gray-500" />}
                        {entry.rank === 3 && <Medal className="w-6 h-6 text-orange-600" />}
                        {entry.rank > 3 && <span className="text-lg font-bold text-muted-foreground">#{entry.rank}</span>}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{entry.icon}</span>
                          <div>
                            <p className="font-semibold">{entry.name}</p>
                            <p className="text-sm text-muted-foreground">{entry.category}</p>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-mono font-bold text-lg">{entry.time}</p>
                        <Badge variant="outline" className="mt-1">
                          {entry.record}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="mt-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-200 dark:border-blue-900">
          <CardContent className="pt-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Ready to Join?</h3>
              <p className="text-muted-foreground mb-6">
                Start using the timers to build your own records and compete with others!
              </p>
              <p className="text-sm text-muted-foreground">
                🎯 Set goals • ⏱️ Track progress • 🏆 Achieve greatness
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">How to Get on the Leaderboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>• Use the timers consistently to build your records</p>
            <p>• Try different timer modes to find your specialty</p>
            <p>• Set personal goals and track your progress</p>
            <p>• Share your achievements with friends</p>
            <p>• The leaderboard updates based on your activity</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

