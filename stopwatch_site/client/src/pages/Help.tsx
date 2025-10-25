import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: 'Getting Started',
    question: 'How do I use the basic stopwatch?',
    answer: 'Click the Start button to begin timing. Use Stop to pause and Reset to clear the timer. You can also record lap times by clicking Lap while the stopwatch is running.',
  },
  {
    category: 'Getting Started',
    question: 'What is the difference between the timer modes?',
    answer: 'Stopwatch counts up from zero, Countdown counts down from a set time, and Interval Timer alternates between work and rest periods. Choose based on your needs.',
  },
  {
    category: 'Features',
    question: 'Can I run multiple timers at once?',
    answer: 'Yes! The Multi-Timer page allows you to run up to 3 timers simultaneously. Perfect for complex timing scenarios.',
  },
  {
    category: 'Features',
    question: 'How do I save my timer configurations?',
    answer: 'Use the Templates page to save your favorite timer setups. You can create custom templates or use popular presets like Pomodoro or HIIT.',
  },
  {
    category: 'History & Stats',
    question: 'Where can I see my timing history?',
    answer: 'Visit the History page to view all your past timer sessions. You can also export your data as CSV for further analysis.',
  },
  {
    category: 'History & Stats',
    question: 'How do I track my progress?',
    answer: 'The Statistics page shows your total sessions, average time, and weekly activity. Use this data to monitor your productivity trends.',
  },
  {
    category: 'Settings',
    question: 'How do I enable notifications?',
    answer: 'Go to Settings and toggle Browser Notifications on. Your browser may ask for permission to send notifications.',
  },
  {
    category: 'Settings',
    question: 'Can I change the app theme?',
    answer: 'Yes! Click the theme toggle in the header or go to Settings to switch between light and dark modes.',
  },
  {
    category: 'Troubleshooting',
    question: 'Why is not the timer making a sound?',
    answer: 'Check that sound notifications are enabled in Settings. Also ensure your device volume is turned up and the browser has permission to play audio.',
  },
  {
    category: 'Troubleshooting',
    question: 'My data disappeared. How do I recover it?',
    answer: 'Your data is stored locally in your browser. Clearing browser data will delete it. Consider exporting your history regularly as backup.',
  },
  {
    category: 'Troubleshooting',
    question: 'The timer seems inaccurate. Why?',
    answer: 'Browser timers have minor accuracy variations. For critical timing, use specialized hardware. Our timers are accurate to within 10ms for most use cases.',
  },
  {
    category: 'Tips',
    question: 'What is the Pomodoro Technique?',
    answer: '25 minutes of focused work followed by 5 minutes of rest. After 4 cycles, take a longer 15-30 minute break. Great for productivity!',
  },
];

interface FAQItemProps {
  item: FAQItem;
}

function FAQItemComponent({ item }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-accent transition-colors"
      >
        <span className="font-semibold text-left">{item.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-4 text-muted-foreground">
          {item.answer}
        </div>
      )}
    </div>
  );
}

export default function Help() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = Array.from(new Set(faqs.map(faq => faq.category)));
  const filteredFAQs = selectedCategory
    ? faqs.filter(faq => faq.category === selectedCategory)
    : faqs;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-4xl font-bold mb-2">Help & Support</h1>
        <p className="text-muted-foreground mb-8">
          Find answers to common questions about using the timer app.
        </p>

        {/* Category Filter */}
        <div className="mb-8">
          <p className="font-semibold mb-3">Filter by Category</p>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => setSelectedCategory(null)}
              variant={selectedCategory === null ? 'default' : 'outline'}
            >
              All
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? 'default' : 'outline'}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>{filteredFAQs.length} questions found</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border">
              {filteredFAQs.map((faq, idx) => (
                <FAQItemComponent key={idx} item={faq} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle>Still Need Help?</CardTitle>
            <CardDescription>Cannot find what you are looking for?</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you have additional questions or need support, feel free to reach out through our contact page.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

