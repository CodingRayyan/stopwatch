import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getTimerHistory, clearTimerHistory } from '@/lib/timeUtils';
import { Trash2, Download } from 'lucide-react';

interface HistoryEntry {
  id: string;
  type: string;
  duration: number;
  timestamp: string;
  laps?: number;
}

export default function History() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setHistory(getTimerHistory());
  }, []);

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      clearTimerHistory();
      setHistory([]);
    }
  };

  const handleExport = () => {
    const csv = [
      ['ID', 'Type', 'Duration (ms)', 'Timestamp', 'Laps'].join(','),
      ...history.map(entry =>
        [
          entry.id,
          entry.type,
          entry.duration,
          entry.timestamp,
          entry.laps || 0,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `timer-history-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
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

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const totalTime = history.reduce((sum, entry) => sum + entry.duration, 0);
  const averageTime = history.length > 0 ? totalTime / history.length : 0;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-4xl font-bold mb-2">Timer History</h1>
        <p className="text-muted-foreground mb-8">
          View and manage your timing history.
        </p>

        {/* Statistics */}
        {history.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Total Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{history.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Total Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatDuration(totalTime)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Average Session</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatDuration(averageTime)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Longest Session</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatDuration(Math.max(...history.map(e => e.duration), 0))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Actions */}
        {history.length > 0 && (
          <div className="flex gap-4 mb-8">
            <Button onClick={handleExport} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export as CSV
            </Button>
            <Button
              onClick={handleClearHistory}
              variant="destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear History
            </Button>
          </div>
        )}

        {/* History List */}
        {history.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Recent Sessions</CardTitle>
              <CardDescription>{history.length} total sessions recorded</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {history.map((entry, idx) => (
                  <div
                    key={entry.id}
                    className="flex justify-between items-center p-4 bg-accent rounded-lg hover:bg-accent/80 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-muted-foreground">#{history.length - idx}</span>
                        <span className="font-semibold capitalize">{entry.type}</span>
                        {entry.laps && <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">{entry.laps} laps</span>}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{formatDate(entry.timestamp)}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold">{formatDuration(entry.duration)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <p className="text-muted-foreground mb-4">No timer history yet</p>
              <p className="text-sm text-muted-foreground">
                Start using the timers to build your history
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}

