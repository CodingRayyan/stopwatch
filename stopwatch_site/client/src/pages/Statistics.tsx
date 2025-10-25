import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getTimerHistory } from '@/lib/timeUtils';
import { BarChart3, TrendingUp, Clock, Zap } from 'lucide-react';

interface HistoryEntry {
  id: string;
  type: string;
  duration: number;
  timestamp: string;
  laps?: number;
}

export default function Statistics() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setHistory(getTimerHistory());
  }, []);

  const stats = {
    totalSessions: history.length,
    totalTime: history.reduce((sum, entry) => sum + entry.duration, 0),
    averageTime: history.length > 0 ? history.reduce((sum, entry) => sum + entry.duration, 0) / history.length : 0,
    longestSession: Math.max(...history.map(e => e.duration), 0),
    shortestSession: Math.min(...history.map(e => e.duration), Infinity),
    byType: history.reduce((acc, entry) => {
      acc[entry.type] = (acc[entry.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };

  const formatDuration = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    }
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  };

  const getWeekData = () => {
    const weekData = Array(7).fill(0);
    const today = new Date();
    
    history.forEach(entry => {
      const entryDate = new Date(entry.timestamp);
      const dayDiff = Math.floor((today.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
      if (dayDiff < 7) {
        weekData[6 - dayDiff]++;
      }
    });

    return weekData;
  };

  const weekData = getWeekData();
  const maxWeekValue = Math.max(...weekData, 1);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-4xl font-bold mb-2">Statistics</h1>
        <p className="text-muted-foreground mb-8">
          Track your timing performance and usage patterns.
        </p>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Total Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalSessions}</div>
              <p className="text-xs text-muted-foreground mt-1">timers used</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Total Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{formatDuration(stats.totalTime)}</div>
              <p className="text-xs text-muted-foreground mt-1">tracked</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Average Session
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{formatDuration(stats.averageTime)}</div>
              <p className="text-xs text-muted-foreground mt-1">per session</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Longest Session
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{formatDuration(stats.longestSession)}</div>
              <p className="text-xs text-muted-foreground mt-1">personal best</p>
            </CardContent>
          </Card>
        </div>

        {/* Usage by Type */}
        {Object.keys(stats.byType).length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Usage by Type</CardTitle>
              <CardDescription>How you use different timer modes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(stats.byType).map(([type, count]) => (
                  <div key={type}>
                    <div className="flex justify-between mb-2">
                      <span className="capitalize font-semibold">{type}</span>
                      <span className="text-muted-foreground">{count} sessions</span>
                    </div>
                    <div className="w-full bg-accent rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                        style={{ width: `${(count / stats.totalSessions) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Weekly Activity */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>Sessions in the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-32">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
                <div key={day} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t transition-all"
                    style={{
                      height: `${(weekData[idx] / maxWeekValue) * 100}%`,
                      minHeight: weekData[idx] > 0 ? '4px' : '0px',
                    }}
                  />
                  <span className="text-xs text-muted-foreground">{day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {stats.totalSessions === 0 ? (
              <p className="text-muted-foreground">No data yet. Start using timers to see insights!</p>
            ) : (
              <>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📊</span>
                  <div>
                    <p className="font-semibold">Most Used Mode</p>
                    <p className="text-sm text-muted-foreground">
                      {Object.entries(stats.byType).sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⏱️</span>
                  <div>
                    <p className="font-semibold">Average Daily Usage</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDuration((stats.totalTime / 7) * 1000)} per day
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <p className="font-semibold">Consistency</p>
                    <p className="text-sm text-muted-foreground">
                      {Math.round((weekData.filter(d => d > 0).length / 7) * 100)}% of days active
                    </p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

