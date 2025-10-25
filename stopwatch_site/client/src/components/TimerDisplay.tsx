import { formatTime } from '@/lib/timeUtils';

interface TimerDisplayProps {
  time: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  showMilliseconds?: boolean;
}

export function TimerDisplay({
  time,
  size = 'lg',
  color = 'text-foreground',
  showMilliseconds = true,
}: TimerDisplayProps) {
  const sizeClasses = {
    sm: 'text-3xl',
    md: 'text-5xl',
    lg: 'text-7xl',
  };

  const totalSeconds = Math.floor(time / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const ms = Math.floor((time % 1000) / 10);

  let displayText = '';
  if (hours > 0) {
    displayText = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  } else {
    displayText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  if (showMilliseconds) {
    displayText += `.${String(ms).padStart(2, '0')}`;
  }

  return (
    <div className={`font-mono font-bold ${sizeClasses[size]} ${color} tracking-tighter`}>
      {displayText}
    </div>
  );
}

