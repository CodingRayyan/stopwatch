import { Layout } from '@/components/Layout';
import { TimerDisplay } from '@/components/TimerDisplay';
import { TimerControls } from '@/components/TimerControls';
import { useStopwatch } from '@/hooks/useStopwatch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Stopwatch() {
  const { time, isRunning, laps, start, stop, reset, recordLap } = useStopwatch();

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-4xl font-bold mb-2">Basic Stopwatch</h1>
        <p className="text-muted-foreground mb-8">
          A simple and reliable stopwatch for everyday timing needs.
        </p>

        {/* Main Timer Display */}
        <Card className="mb-8 border-2 border-green-200 dark:border-green-900">
          <CardContent className="pt-12 pb-12">
            <div className="text-center">
              <TimerDisplay time={time} size="lg" color="text-green-600" />
              <p className="text-muted-foreground mt-4">Elapsed Time</p>
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

        {/* Laps List */}
        {laps.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Lap Times</CardTitle>
              <CardDescription>{laps.length} laps recorded</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {laps.map((lap) => (
                  <div key={lap.id} className="flex justify-between items-center p-3 bg-accent rounded-lg">
                    <span className="font-semibold">Lap {lap.lapNumber}</span>
                    <div className="text-right">
                      <div className="font-mono text-sm text-muted-foreground">
                        {Math.floor(lap.lapTime / 60000)}:{String(Math.floor((lap.lapTime % 60000) / 1000)).padStart(2, '0')}.{String(Math.floor((lap.lapTime % 1000) / 10)).padStart(2, '0')}
                      </div>
                      <div className="font-mono text-xs text-muted-foreground">
                        Total: {Math.floor(lap.totalTime / 60000)}:{String(Math.floor((lap.totalTime % 60000) / 1000)).padStart(2, '0')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}

