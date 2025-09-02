import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const RSVP = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '1',
    attendance: '',
    dietaryRestrictions: '',
    message: ''
  });

  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.attendance) {
      toast({
        title: "Please fill required fields",
        description: "Name, email, and attendance confirmation are required.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "RSVP Submitted!",
      description: "Thank you for your response. We can't wait to celebrate with you!",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      guests: '1',
      attendance: '',
      dietaryRestrictions: '',
      message: ''
    });
  };

  return (
    <section id="rsvp" className="py-20 bg-gradient-romantic">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="ornament text-6xl mb-4">❦</div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            RSVP
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're so excited to celebrate with you! Please let us know if you'll be joining us for our special day.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-lg shadow-romantic p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-card-foreground font-semibold">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    className="border-border focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-card-foreground font-semibold">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    className="border-border focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-card-foreground font-semibold">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                    className="border-border focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guests" className="text-card-foreground font-semibold">
                    Number of Guests
                  </Label>
                  <Select value={formData.guests} onValueChange={(value) => handleInputChange('guests', value)}>
                    <SelectTrigger className="border-border focus:ring-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Guest</SelectItem>
                      <SelectItem value="2">2 Guests</SelectItem>
                      <SelectItem value="3">3 Guests</SelectItem>
                      <SelectItem value="4">4 Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="attendance" className="text-card-foreground font-semibold">
                  Will you be attending? *
                </Label>
                <Select value={formData.attendance} onValueChange={(value) => handleInputChange('attendance', value)}>
                  <SelectTrigger className="border-border focus:ring-primary">
                    <SelectValue placeholder="Select your response" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes, I'll be there!</SelectItem>
                    <SelectItem value="no">Sorry, I can't make it</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dietary" className="text-card-foreground font-semibold">
                  Dietary Restrictions or Allergies
                </Label>
                <Input
                  id="dietary"
                  value={formData.dietaryRestrictions}
                  onChange={(e) => handleInputChange('dietaryRestrictions', e.target.value)}
                  placeholder="Please let us know about any dietary needs"
                  className="border-border focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-card-foreground font-semibold">
                  Special Message
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Share your excitement or any special notes"
                  className="border-border focus:ring-primary"
                  rows={4}
                />
              </div>

              <div className="text-center pt-4">
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-3 text-lg font-semibold shadow-gold hover:shadow-lg transform hover:-translate-y-1 transition-all"
                >
                  Send RSVP
                </Button>
              </div>
            </form>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              RSVP by May 29th, 2025 • For questions, email us at{' '}
              <a href="mailto:Jay.Lisha.wedding@example.com" className="text-primary hover:underline">
                Jay.Lisha.wedding@example.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSVP;