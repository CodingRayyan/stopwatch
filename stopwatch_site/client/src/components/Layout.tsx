import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';
import { APP_TITLE } from '@/const';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Stopwatch', href: '/stopwatch' },
  { label: 'Lap Timer', href: '/lap-timer' },
  { label: 'Countdown', href: '/countdown' },
  { label: 'Interval', href: '/interval' },
  { label: 'Multi-Timer', href: '/multi-timer' },
  { label: 'History', href: '/history' },
  { label: 'Templates', href: '/templates' },
  { label: 'Statistics', href: '/statistics' },
  { label: 'Leaderboard', href: '/leaderboard' },
  { label: 'Tips', href: '/tips' },
  { label: 'Settings', href: '/settings' },
  { label: 'Help', href: '/help' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Layout({ children }: LayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                  ⏱
                </div>
                <span>{APP_TITLE}</span>
              </a>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.slice(0, 6).map(item => (
                <Link key={item.href} href={item.href}>
                  <a className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                    {item.label}
                  </a>
                </Link>
              ))}
              <div className="px-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="w-10 h-10 p-0"
                >
                  {theme === 'light' ? (
                    <Moon className="w-5 h-5" />
                  ) : (
                    <Sun className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="w-10 h-10 p-0"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 p-0"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 flex flex-col gap-2">
              {navItems.map(item => (
                <Link key={item.href} href={item.href}>
                  <a
                    className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background/50 mt-16">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/stopwatch"><a className="hover:text-foreground transition-colors">Stopwatch</a></Link></li>
                <li><Link href="/countdown"><a className="hover:text-foreground transition-colors">Countdown</a></Link></li>
                <li><Link href="/interval"><a className="hover:text-foreground transition-colors">Interval Timer</a></Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/history"><a className="hover:text-foreground transition-colors">History</a></Link></li>
                <li><Link href="/templates"><a className="hover:text-foreground transition-colors">Templates</a></Link></li>
                <li><Link href="/statistics"><a className="hover:text-foreground transition-colors">Statistics</a></Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/help"><a className="hover:text-foreground transition-colors">Help</a></Link></li>
                <li><Link href="/tips"><a className="hover:text-foreground transition-colors">Tips & Tricks</a></Link></li>
                <li><Link href="/about"><a className="hover:text-foreground transition-colors">About</a></Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/contact"><a className="hover:text-foreground transition-colors">Get in Touch</a></Link></li>
                <li><Link href="/leaderboard"><a className="hover:text-foreground transition-colors">Leaderboard</a></Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 {APP_TITLE}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

