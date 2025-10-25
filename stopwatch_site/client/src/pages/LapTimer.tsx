import { Layout } from '@/components/Layout';
import { TimerDisplay } from '@/components/TimerDisplay';
import { TimerControls } from '@/components/TimerControls';
import { useStopwatch } from '@/hooks/useStopwatch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export default function LapTimer() {
  const { time, isRunning, laps, start, stop, reset, recordLap } = useStopwatch();

  const bestLap = laps.length > 0 ? Math.min(...laps.map(l => l.lapTime)) : 0;
  const totalLapTime = laps.reduce((sum, lap) => sum + lap.lapTime, 0);
  const avgLapTime = laps.length > 0 ? totalLapTime / laps.length : 0;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-4xl font-bold mb-2">Lap Timer</h1>
        <p className="text-muted-foreground mb-8">
          Record and analyze individual lap times with detailed statistics.
        </p>

        {/* Main Timer Display */}
        <Card className="mb-8 border-2 border-blue-200 dark:border-blue-900">
          <CardContent className="pt-12 pb-12">
            <div className="text-center">
              <TimerDisplay time={time} size="lg" color="text-blue-600" />
              <p className="text-muted-foreground mt-4">Total Elapsed Time</p>
            </div>
          </CardContent>
        </Card>

        {/* Controls */}
        <div className="mb-8">
          <TimerControls
            isRunning={isRunning}
            onStart={start}
            onStop={stop}
            onReset={reset}
            onLap={recordLap}
            showLapButton={true}
          />
        </div>

        {/* Statistics */}
        {laps.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Best Lap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-mono text-2xl font-bold text-green-600">
                  {Math.floor(bestLap / 60000)}:{String(Math.floor((bestLap % 60000) / 1000)).padStart(2, '0')}.{String(Math.floor((bestLap % 1000) / 10)).padStart(2, '0')}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Average Lap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-mono text-2xl font-bold text-blue-600">
                  {Math.floor(avgLapTime / 60000)}:{String(Math.floor((avgLapTime % 60000) / 1000)).padStart(2, '0')}.{String(Math.floor((avgLapTime % 1000) / 10)).padStart(2, '0')}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Total Laps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{laps.length}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Laps List */}
        {laps.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Lap History</CardTitle>
                  <CardDescription>{laps.length} laps recorded</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={reset}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {laps.map((lap, idx) => {
                  const isBest = lap.lapTime === bestLap;
                  return (
                    <div
                      key={lap.id}
                      className={`flex justify-between items-center p-3 rounded-lg ${
                        isBest ? 'bg-green-100 dark:bg-green-950 border-l-4 border-green-600' : 'bg-accent'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-semibold w-16">Lap {lap.lapNumber}</span>
                        {isBest && <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">Best</span>}
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold">
                          {Math.floor(lap.lapTime / 60000)}:{String(Math.floor((lap.lapTime % 60000) / 1000)).padStart(2, '0')}.{String(Math.floor((lap.lapTime % 1000) / 10)).padStart(2, '0')}
                        </div>
                        <div className="font-mono text-xs text-muted-foreground">
                          +{Math.floor(lap.totalTime / 60000)}:{String(Math.floor((lap.totalTime % 60000) / 1000)).padStart(2, '0')}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}

