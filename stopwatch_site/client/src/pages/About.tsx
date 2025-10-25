import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Zap, Shield, Globe } from 'lucide-react';

export default function About() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-4xl font-bold mb-2">About Full-Featured Stopwatch</h1>
        <p className="text-muted-foreground mb-8">
          Precision timing for productivity, fitness, and everyday use.
        </p>

        {/* Mission */}
        <Card className="mb-8 border-blue-200 dark:border-blue-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-600" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              We believe that time is one of our most valuable resources. Our mission is to provide a simple, elegant, and powerful timing tool that helps people make the most of every moment.
            </p>
            <p>
              Whether you are training for a marathon, practicing the Pomodoro Technique, or cooking dinner, Full-Featured Stopwatch is designed to be your trusted companion.
            </p>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  Lightning Fast
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Optimized for speed and accuracy. Our timers are precise to within milliseconds.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="w-5 h-5 text-green-600" />
                  Privacy First
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Your data stays on your device. We do not collect, store, or share any personal information.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Globe className="w-5 h-5 text-blue-600" />
                  Completely Free
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                No ads, no subscriptions, no hidden fees. Use all features without any limitations.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Heart className="w-5 h-5 text-red-600" />
                  Built with Care
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Designed with attention to detail and user experience in mind.
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-blue-600">15+</div>
              <p className="text-sm text-muted-foreground mt-2">Dedicated Pages</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-green-600">5</div>
              <p className="text-sm text-muted-foreground mt-2">Timer Modes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-purple-600">100%</div>
              <p className="text-sm text-muted-foreground mt-2">Free</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-orange-600">0</div>
              <p className="text-sm text-muted-foreground mt-2">Ads</p>
            </CardContent>
          </Card>
        </div>

        {/* Technology */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Built With Modern Technology</CardTitle>
            <CardDescription>Leveraging the latest web technologies for optimal performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Frontend</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• React 19 for modern UI</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• shadcn/ui for components</li>
                  <li>• Wouter for routing</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Responsive design</li>
                  <li>• Dark mode support</li>
                  <li>• Local storage</li>
                  <li>• Web Audio API</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <Card>
          <CardHeader>
            <CardTitle>Support & Feedback</CardTitle>
            <CardDescription>We love hearing from our users</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Have a suggestion? Found a bug? Want to share your experience? We would love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/contact" className="inline-block">
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                  Send Feedback
                </button>
              </a>
              <a href="/help" className="inline-block">
                <button className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors">
                  Get Help
                </button>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>Full-Featured Stopwatch v1.0.0</p>
          <p className="mt-2">Made with passion for productivity enthusiasts everywhere</p>
        </div>
      </div>
    </Layout>
  );
}

