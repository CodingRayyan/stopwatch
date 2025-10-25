import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { TimerDisplay } from '@/components/TimerDisplay';
import { useCountdownTimer } from '@/hooks/useStopwatch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function Countdown() {
  const [inputMinutes, setInputMinutes] = useState('1');
  const [inputSeconds, setInputSeconds] = useState('0');
  const initialSeconds = parseInt(inputMinutes || '0') * 60 + parseInt(inputSeconds || '0');
  
  const { timeLeft, isRunning, isFinished, start, stop, reset, setCustomTime } = useCountdownTimer(initialSeconds);

  const handleSetTime = () => {
    const minutes = parseInt(inputMinutes || '0');
    const seconds = parseInt(inputSeconds || '0');
    const totalSeconds = minutes * 60 + seconds;
    if (totalSeconds > 0) {
      setCustomTime(totalSeconds * 1000);
    }
  };

  const presets = [
    { label: '1 min', seconds: 60 },
    { label: '5 min', seconds: 300 },
    { label: '10 min', seconds: 600 },
    { label: '15 min', seconds: 900 },
    { label: '30 min', seconds: 1800 },
  ];

  const isFinishedStyle = isFinished ? 'border-2 border-red-500 bg-red-50 dark:bg-red-950' : 'border-2 border-red-200 dark:border-red-900';

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-4xl font-bold mb-2">Countdown Timer</h1>
        <p className="text-muted-foreground mb-8">
          Set a custom timer and get notified when time is up.
        </p>

        {/* Main Timer Display */}
        <Card className={`mb-8 ${isFinishedStyle}`}>
          <CardContent className="pt-12 pb-12">
            <div className="text-center">
              <TimerDisplay time={timeLeft * 1000} size="lg" color={isFinished ? 'text-red-600' : 'text-red-600'} />
              <p className="text-muted-foreground mt-4">
                {isFinished ? '⏰ Time\'s up!' : 'Time Remaining'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Time Input */}
        {!isRunning && !isFinished && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Set Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">Minutes</label>
                  <Input
                    type="number"
                    min="0"
                    max="59"
                    value={inputMinutes}
                    onChange={(e) => setInputMinutes(e.target.value)}
                    className="text-lg"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">Seconds</label>
                  <Input
                    type="number"
                    min="0"
                    max="59"
                    value={inputSeconds}
                    onChange={(e) => setInputSeconds(e.target.value)}
                    className="text-lg"
                  />
                </div>
              </div>
              <Button onClick={handleSetTime} className="w-full mb-6">
                Set Timer
              </Button>

              {/* Presets */}
              <div>
                <p className="text-sm font-medium mb-3">Quick Presets</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {presets.map((preset) => (
                    <Button
                      key={preset.seconds}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCustomTime(preset.seconds * 1000);
                      }}
                    >
                      {preset.label}
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
              onClick={start}
              disabled={timeLeft === 0 && !isFinished}
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
            onClick={() => {
              reset(initialSeconds);
            }}
            variant="outline"
            size="lg"
            className="px-8"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset
          </Button>
        </div>

        {/* Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tips</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• Use quick presets for common timer durations</p>
            <p>• The timer will notify you with a sound when time is up</p>
            <p>• You can pause and resume the countdown at any time</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

