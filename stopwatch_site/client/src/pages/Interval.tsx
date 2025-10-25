import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { TimerDisplay } from '@/components/TimerDisplay';
import { useIntervalTimer } from '@/hooks/useStopwatch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function Interval() {
  const [workSeconds, setWorkSeconds] = useState(30);
  const [restSeconds, setRestSeconds] = useState(10);
  const [cycles, setCycles] = useState(8);
  const [isConfigurable, setIsConfigurable] = useState(true);

  const { timeLeft, isRunning, isFinished, currentCycle, isWorkPhase, start, stop, reset } = useIntervalTimer(
    workSeconds,
    restSeconds,
    cycles
  );

  const handleStart = () => {
    setIsConfigurable(false);
    start();
  };

  const handleReset = () => {
    setIsConfigurable(true);
    reset();
  };

  const presets = [
    { name: 'Pomodoro', work: 1500, rest: 300, cycles: 4 }, // 25 min work, 5 min rest
    { name: 'HIIT', work: 30, rest: 10, cycles: 8 },
    { name: 'Tabata', work: 20, rest: 10, cycles: 8 },
    { name: 'Beginner', work: 60, rest: 30, cycles: 5 },
  ];

  const isFinishedStyle = isFinished ? 'border-2 border-orange-500 bg-orange-50 dark:bg-orange-950' : 'border-2 border-orange-200 dark:border-orange-900';

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-4xl font-bold mb-2">Interval Timer</h1>
        <p className="text-muted-foreground mb-8">
          Perfect for workouts, Pomodoro sessions, and HIIT training.
        </p>

        {/* Main Timer Display */}
        <Card className={`mb-8 ${isFinishedStyle}`}>
          <CardContent className="pt-12 pb-12">
            <div className="text-center">
              <div className="mb-4">
                <span className={`text-lg font-semibold ${isWorkPhase ? 'text-orange-600' : 'text-green-600'}`}>
                  {isWorkPhase ? '💪 Work' : '😌 Rest'}
                </span>
                <span className="text-muted-foreground ml-4">
                  Cycle {currentCycle} of {cycles}
                </span>
              </div>
              <TimerDisplay time={timeLeft * 1000} size="lg" color={isWorkPhase ? 'text-orange-600' : 'text-green-600'} />
              <p className="text-muted-foreground mt-4">
                {isFinished ? '✅ Workout Complete!' : 'Time Remaining'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Configuration */}
        {isConfigurable && !isRunning && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Configure Interval</CardTitle>
              <CardDescription>Set up your interval timer parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Work Time (seconds)</label>
                  <Input
                    type="number"
                    min="1"
                    value={workSeconds}
                    onChange={(e) => setWorkSeconds(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Rest Time (seconds)</label>
                  <Input
                    type="number"
                    min="1"
                    value={restSeconds}
                    onChange={(e) => setRestSeconds(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Number of Cycles</label>
                  <Input
                    type="number"
                    min="1"
                    value={cycles}
                    onChange={(e) => setCycles(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                </div>
              </div>

              {/* Presets */}
              <div>
                <p className="text-sm font-medium mb-3">Popular Presets</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {presets.map((preset) => (
                    <Button
                      key={preset.name}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setWorkSeconds(preset.work);
                        setRestSeconds(preset.rest);
                        setCycles(preset.cycles);
                      }}
                    >
                      {preset.name}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Controls */}
        <div className="flex gap-3 justify-center flex-wrap mb-8">
          {!isRunning ? (
            <Button
              onClick={handleStart}
              className="bg-green-600 hover:bg-green-700 text-white px-8"
              size="lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Start
            </Button>
          ) : (
            <Button
              onClick={stop}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-8"
              size="lg"
            >
              <Pause className="w-5 h-5 mr-2" />
              Stop
            </Button>
          )}

          <Button
            onClick={handleReset}
            variant="outline"
            size="lg"
            className="px-8"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Total Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.floor((workSeconds + restSeconds) * cycles / 60)}:{String(((workSeconds + restSeconds) * cycles) % 60).padStart(2, '0')}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Work Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{workSeconds}s</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Rest Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{restSeconds}s</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

