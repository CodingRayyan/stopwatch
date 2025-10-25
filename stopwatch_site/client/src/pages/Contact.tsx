import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, MessageSquare, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to a server
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
        <p className="text-muted-foreground mb-8">
          Have a question or feedback? We would love to hear from you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Contact Info Cards */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Mail className="w-5 h-5 text-blue-600" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                <a href="mailto:support@stopwatch.app" className="hover:text-foreground transition-colors">
                  support@stopwatch.app
                </a>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageSquare className="w-5 h-5 text-green-600" />
                Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Use the form below to send us your feedback and suggestions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Phone className="w-5 h-5 text-purple-600" />
                Response Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                We typically respond within 24 hours.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>Fill out the form below and we will get back to you soon</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Name</label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="feedback">General Feedback</option>
                  <option value="support">Support</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <textarea
                  name="message"
                  placeholder="Tell us what you think..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
              >
                Send Message
              </Button>

              {submitted && (
                <div className="p-4 bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 rounded-lg">
                  Thank you for your message! We will get back to you soon.
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">How long does it take to get a response?</h4>
              <p className="text-sm text-muted-foreground">
                We aim to respond to all inquiries within 24 hours during business days.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Can I report a bug?</h4>
              <p className="text-sm text-muted-foreground">
                Absolutely! Please use the contact form above and select "Bug Report" as the subject. Include as much detail as possible about the issue.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">I have a feature request. Where should I send it?</h4>
              <p className="text-sm text-muted-foreground">
                Use the contact form and select "Feature Request" as the subject. We love hearing about new ideas!
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Is there a community forum?</h4>
              <p className="text-sm text-muted-foreground">
                Not yet, but we are considering it! Let us know if you would be interested in a community space.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

