import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getTimerTemplates, saveTimerTemplate, deleteTimerTemplate } from '@/lib/timeUtils';
import { Plus, Trash2, Copy } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  type: string;
  workSeconds?: number;
  restSeconds?: number;
  cycles?: number;
  duration?: number;
}

export default function Templates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'countdown',
    duration: '60',
  });

  useEffect(() => {
    setTemplates(getTimerTemplates());
  }, []);

  const handleAddTemplate = () => {
    if (formData.name.trim()) {
      saveTimerTemplate(formData.name, {
        type: formData.type,
        duration: parseInt(formData.duration),
      });
      setTemplates(getTimerTemplates());
      setFormData({ name: '', type: 'countdown', duration: '60' });
      setShowForm(false);
    }
  };

  const handleDeleteTemplate = (id: string) => {
    deleteTimerTemplate(id);
    setTemplates(getTimerTemplates());
  };

  const presetTemplates = [
    { name: 'Quick Break', type: 'countdown', duration: 300, icon: '☕' },
    { name: 'Pomodoro', type: 'interval', workSeconds: 1500, restSeconds: 300, cycles: 4, icon: '🍅' },
    { name: 'HIIT Workout', type: 'interval', workSeconds: 30, restSeconds: 10, cycles: 8, icon: '💪' },
    { name: 'Cooking Timer', type: 'countdown', duration: 1800, icon: '🍳' },
    { name: 'Meditation', type: 'countdown', duration: 600, icon: '🧘' },
    { name: 'Tabata', type: 'interval', workSeconds: 20, restSeconds: 10, cycles: 8, icon: '⚡' },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-4xl font-bold mb-2">Timer Templates</h1>
        <p className="text-muted-foreground mb-8">
          Save and reuse your favorite timer configurations.
        </p>

        {/* Create Template Form */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Create New Template</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Template Name</label>
                  <Input
                    placeholder="e.g., My Custom Timer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  >
                    <option value="countdown">Countdown</option>
                    <option value="stopwatch">Stopwatch</option>
                    <option value="interval">Interval</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Duration (seconds)</label>
                  <Input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  />
                </div>
                <div className="flex gap-4">
                  <Button onClick={handleAddTemplate} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create
                  </Button>
                  <Button onClick={() => setShowForm(false)} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="mb-8 bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create Template
          </Button>
        )}

        {/* Preset Templates */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Popular Presets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {presetTemplates.map((preset) => (
              <Card key={preset.name} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-3">{preset.icon}</div>
                  <h3 className="font-semibold mb-2">{preset.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {preset.type === 'countdown'
                      ? `${Math.floor((preset.duration || 0) / 60)}m ${(preset.duration || 0) % 60}s`
                      : `${preset.workSeconds}s work / ${preset.restSeconds}s rest`}
                  </p>
                  <Button size="sm" className="w-full" variant="outline">
                    <Copy className="w-4 h-4 mr-2" />
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Custom Templates */}
        {templates.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <Card key={template.id}>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">{template.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 capitalize">
                      Type: {template.type}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1" variant="outline">
                        <Copy className="w-4 h-4 mr-2" />
                        Use
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteTemplate(template.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {templates.length === 0 && !showForm && (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <p className="text-muted-foreground mb-4">No custom templates yet</p>
              <p className="text-sm text-muted-foreground">
                Create a template to save your favorite timer configurations
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}

