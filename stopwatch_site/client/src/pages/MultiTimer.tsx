import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { TimerDisplay } from '@/components/TimerDisplay';
import { useCountdownTimer } from '@/hooks/useStopwatch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Play, Pause, RotateCcw, Plus, X } from 'lucide-react';

interface Timer {
  id: string;
  name: string;
  duration: number;
  timeLeft: number;
  isRunning: boolean;
}

export default function MultiTimer() {
  const [timers, setTimers] = useState<Timer[]>([
    { id: '1', name: 'Timer 1', duration: 60, timeLeft: 60, isRunning: false },
  ]);
  const [newTimerName, setNewTimerName] = useState('');
  const [newTimerSeconds, setNewTimerSeconds] = useState('60');

  const addTimer = () => {
    if (newTimerName.trim() && parseInt(newTimerSeconds) > 0) {
      const newTimer: Timer = {
        id: `timer-${Date.now()}`,
        name: newTimerName,
        duration: parseInt(newTimerSeconds),
        timeLeft: parseInt(newTimerSeconds),
        isRunning: false,
      };
      setTimers([...timers, newTimer]);
      setNewTimerName('');
      setNewTimerSeconds('60');
    }
  };

  const removeTimer = (id: string) => {
    setTimers(timers.filter(t => t.id !== id));
  };

  const startTimer = (id: string) => {
    setTimers(timers.map(t => t.id === id ? { ...t, isRunning: true } : t));
  };

  const stopTimer = (id: string) => {
    setTimers(timers.map(t => t.id === id ? { ...t, isRunning: false } : t));
  };

  const resetTimer = (id: string) => {
    setTimers(timers.map(t => t.id === id ? { ...t, timeLeft: t.duration, isRunning: false } : t));
  };

  const updateTimerTime = (id: string, timeLeft: number) => {
    setTimers(timers.map(t => t.id === id ? { ...t, timeLeft } : t));
  };

  // Update timers every 100ms
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prev => prev.map(timer => {
        if (timer.isRunning && timer.timeLeft > 0) {
          return { ...timer, timeLeft: Math.max(0, timer.timeLeft - 0.1) };
        }
        return timer;
      }));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-4xl font-bold mb-2">Multi-Timer</h1>
        <p className="text-muted-foreground mb-8">
          Run multiple timers simultaneously for complex timing scenarios.
        </p>

        {/* Add New Timer */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add New Timer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-4">
              <Input
                placeholder="Timer name (e.g., Cooking)"
                value={newTimerName}
                onChange={(e) => setNewTimerName(e.target.value)}
                className="flex-1"
              />
              <Input
                type="number"
                placeholder="Seconds"
                value={newTimerSeconds}
                onChange={(e) => setNewTimerSeconds(e.target.value)}
                className="w-24"
              />
              <Button onClick={addTimer} disabled={timers.length >= 3}>
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              You can run up to 3 timers simultaneously
            </p>
          </CardContent>
        </Card>

        {/* Timers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {timers.map((timer) => (
            <TimerCard
              key={timer.id}
              timer={timer}
              onStart={() => startTimer(timer.id)}
              onStop={() => stopTimer(timer.id)}
              onReset={() => resetTimer(timer.id)}
              onRemove={() => removeTimer(timer.id)}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              <Button
                onClick={() => {
                  setTimers(timers.map(t => ({ ...t, isRunning: true })));
                }}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Play className="w-4 h-4 mr-2" />
                Start All
              </Button>
              <Button
                onClick={() => {
                  setTimers(timers.map(t => ({ ...t, isRunning: false })));
                }}
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                <Pause className="w-4 h-4 mr-2" />
                Stop All
              </Button>
              <Button
                onClick={() => {
                  setTimers(timers.map(t => ({ ...t, timeLeft: t.duration, isRunning: false })));
                }}
                variant="outline"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset All
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

function TimerCard({
  timer,
  onStart,
  onStop,
  onReset,
  onRemove,
}: {
  timer: Timer;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onRemove: () => void;
}) {
  const percentage = (timer.timeLeft / timer.duration) * 100;
  const isLow = percentage < 20;

  return (
    <Card className={`border-2 ${isLow ? 'border-red-300 dark:border-red-800' : 'border-purple-200 dark:border-purple-900'}`}>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold">{timer.name}</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-destructive hover:text-destructive"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-accent rounded-full h-2 overflow-hidden">
            <div
              className={`h-full transition-all ${isLow ? 'bg-red-500' : 'bg-purple-500'}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Timer Display */}
        <div className="text-center mb-4">
          <div className="font-mono text-3xl font-bold">
            {Math.floor(timer.timeLeft / 60)}:{String(Math.floor(timer.timeLeft % 60)).padStart(2, '0')}
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          {!timer.isRunning ? (
            <Button
              onClick={onStart}
              size="sm"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              <Play className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={onStop}
              size="sm"
              className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              <Pause className="w-4 h-4" />
            </Button>
          )}
          <Button
            onClick={onReset}
            size="sm"
            variant="outline"
            className="flex-1"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

