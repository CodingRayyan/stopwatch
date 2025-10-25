export function formatTime(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const ms = Math.floor((milliseconds % 1000) / 10);

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
  }
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
}

export function formatTimeShort(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
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
}

export function parseTimeInput(input: string): number {
  // Parse formats like "1:30" (1 min 30 sec), "30" (30 sec), "1:30:45" (1h 30m 45s)
  const parts = input.split(':').map(p => parseInt(p, 10)).filter(p => !isNaN(p));

  if (parts.length === 1) {
    return parts[0] * 1000; // seconds to ms
  } else if (parts.length === 2) {
    return (parts[0] * 60 + parts[1]) * 1000; // mm:ss to ms
  } else if (parts.length === 3) {
    return (parts[0] * 3600 + parts[1] * 60 + parts[2]) * 1000; // hh:mm:ss to ms
  }
  return 0;
}

// LocalStorage helpers
export function saveTimerHistory(entry: any) {
  const history = getTimerHistory();
  history.push({
    ...entry,
    id: `timer-${Date.now()}`,
    timestamp: new Date().toISOString(),
  });
  localStorage.setItem('timerHistory', JSON.stringify(history));
}

export function getTimerHistory() {
  const stored = localStorage.getItem('timerHistory');
  return stored ? JSON.parse(stored) : [];
}

export function clearTimerHistory() {
  localStorage.removeItem('timerHistory');
}

export function saveTimerTemplate(name: string, config: any) {
  const templates = getTimerTemplates();
  templates.push({
    id: `template-${Date.now()}`,
    name,
    ...config,
  });
  localStorage.setItem('timerTemplates', JSON.stringify(templates));
}

export function getTimerTemplates() {
  const stored = localStorage.getItem('timerTemplates');
  return stored ? JSON.parse(stored) : [];
}

export function deleteTimerTemplate(id: string) {
  const templates = getTimerTemplates();
  const filtered = templates.filter((t: any) => t.id !== id);
  localStorage.setItem('timerTemplates', JSON.stringify(filtered));
}

export function getSettings() {
  const stored = localStorage.getItem('timerSettings');
  return stored ? JSON.parse(stored) : {
    theme: 'light',
    soundEnabled: true,
    vibrationEnabled: true,
    notificationsEnabled: true,
  };
}

export function saveSettings(settings: any) {
  localStorage.setItem('timerSettings', JSON.stringify(settings));
}

