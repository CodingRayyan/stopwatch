import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';

interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onLap?: () => void;
  showLapButton?: boolean;
  disabled?: boolean;
}

export function TimerControls({
  isRunning,
  onStart,
  onStop,
  onReset,
  onLap,
  showLapButton = false,
  disabled = false,
}: TimerControlsProps) {
  return (
    <div className="flex gap-3 justify-center flex-wrap">
      {!isRunning ? (
        <Button
          onClick={onStart}
          disabled={disabled}
          className="bg-green-600 hover:bg-green-700 text-white px-8"
          size="lg"
        >
          <Play className="w-5 h-5 mr-2" />
          Start
        </Button>
      ) : (
        <Button
          onClick={onStop}
          disabled={disabled}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-8"
          size="lg"
        >
          <Pause className="w-5 h-5 mr-2" />
          Stop
        </Button>
      )}

      <Button
        onClick={onReset}
        disabled={disabled}
        variant="outline"
        size="lg"
        className="px-8"
      >
        <RotateCcw className="w-5 h-5 mr-2" />
        Reset
      </Button>

      {showLapButton && onLap && (
        <Button
          onClick={onLap}
          disabled={disabled}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
          size="lg"
        >
          <Flag className="w-5 h-5 mr-2" />
          Lap
        </Button>
      )}
    </div>
  );
}

