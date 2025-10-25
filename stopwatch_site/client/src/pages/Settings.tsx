import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { getSettings, saveSettings } from '@/lib/timeUtils';
import { Volume2, Vibrate, Bell, Palette } from 'lucide-react';

interface Settings {
  theme: 'light' | 'dark';
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  notificationsEnabled: boolean;
}

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState<Settings>(getSettings());
  const [saved, setSaved] = useState(false);

  const handleToggleSetting = (key: keyof Settings) => {
    const updated = { ...settings, [key]: !settings[key] };
    setSettings(updated);
    setSaved(false);
  };

  const handleSaveSettings = () => {
    saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground mb-8">
          Customize your timer experience.
        </p>

        {/* Theme Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Appearance
            </CardTitle>
            <CardDescription>Customize how the app looks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">
                    Current theme: <span className="capitalize font-semibold">{theme}</span>
                  </p>
                </div>
                <Button
                  onClick={toggleTheme}
                  variant="outline"
                >
                  Toggle Theme
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sound Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="w-5 h-5" />
              Audio
            </CardTitle>
            <CardDescription>Control audio notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
                <div>
                  <p className="font-semibold">Sound Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Play a sound when timer completes
                  </p>
                </div>
                <Button
                  onClick={() => handleToggleSetting('soundEnabled')}
                  variant={settings.soundEnabled ? 'default' : 'outline'}
                >
                  {settings.soundEnabled ? 'Enabled' : 'Disabled'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vibration Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Vibrate className="w-5 h-5" />
              Haptics
            </CardTitle>
            <CardDescription>Control vibration feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
                <div>
                  <p className="font-semibold">Vibration</p>
                  <p className="text-sm text-muted-foreground">
                    Vibrate when timer completes
                  </p>
                </div>
                <Button
                  onClick={() => handleToggleSetting('vibrationEnabled')}
                  variant={settings.vibrationEnabled ? 'default' : 'outline'}
                >
                  {settings.vibrationEnabled ? 'Enabled' : 'Disabled'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
            <CardDescription>Control browser notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
                <div>
                  <p className="font-semibold">Browser Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Show notifications when timer completes
                  </p>
                </div>
                <Button
                  onClick={() => handleToggleSetting('notificationsEnabled')}
                  variant={settings.notificationsEnabled ? 'default' : 'outline'}
                >
                  {settings.notificationsEnabled ? 'Enabled' : 'Disabled'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex gap-4">
          <Button
            onClick={handleSaveSettings}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            size="lg"
          >
            Save Settings
          </Button>
          {saved && (
            <div className="flex items-center text-green-600 font-semibold">
              ✓ Saved
            </div>
          )}
        </div>

        {/* Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">About Settings</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• Your settings are saved locally in your browser</p>
            <p>• Clearing browser data will reset these settings</p>
            <p>• Sound and vibration work best on devices that support them</p>
            <p>• Browser notifications require permission from your browser</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

