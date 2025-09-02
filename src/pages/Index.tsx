import { useState } from 'react';
import { Menu, X, Heart, Calendar, MapPin, Clock, Music, Instagram, Facebook, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import heroImage from '../../assets/Web_Photo_Editor.jpg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Our Story', href: '#story' },
    { label: 'Wedding Details', href: '#details' },
    { label: 'Gallery', href: '#gallery' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="font-script text-3xl text-primary font-semibold">
            Jay & Lisha
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border/50">
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-foreground hover:text-primary transition-colors font-medium"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Jay and Lisha - Wedding Couple"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        {/* Ornamental Element */}
        <div className="mb-8">
          <div className="text-6xl mb-4 text-champagne">
            ❦
          </div>
          <div className="font-serif text-lg tracking-wider uppercase">
            The Wedding Of
          </div>
        </div>

        {/* Couple Names */}
        <div className="mb-8">
          <h1 className="font-script text-6xl md:text-8xl font-bold mb-4 text-champagne">
            Jay & Lisha
          </h1>
        </div>

        {/* Wedding Date */}
        <div className="font-serif text-xl md:text-2xl mb-8">
          <div className="mb-2">November 29th, 2025</div>
          {/* <div className="text-champagne/80">Garden Manor Estate</div> */}
        </div>

        {/* Call to Action */}
        {/* <div className="space-y-4">
          <button
            onClick={() => document.querySelector('#rsvp')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-semibold transition-all shadow-gold hover:shadow-lg transform hover:-translate-y-1"
          >
            RSVP Now
          </button>
        </div> */}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const OurStory = () => {
  return (
    <section id="story" className="py-20 bg-gradient-romantic">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="ornament text-6xl mb-4">❦</div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Love Story
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Story Content */}
            <div className="space-y-8">
              <div className="bg-card p-8 rounded-lg shadow-romantic">
                <div className="flex items-center mb-4">
                  <Heart className="w-6 h-6 text-primary mr-3" />
                  <h3 className="font-serif text-2xl font-semibold text-card-foreground">
                    How We Met
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Our story began on a rainy Tuesday at a cozy coffee shop downtown. Lisha was reading his favorite novel when Jay accidentally spilled her latte on his book. What started as an embarrassing moment turned into hours of conversation and endless laughter.
                </p>
              </div>

              <div className="bg-card p-8 rounded-lg shadow-romantic">
                <div className="flex items-center mb-4">
                  <Heart className="w-6 h-6 text-primary mr-3" />
                  <h3 className="font-serif text-2xl font-semibold text-card-foreground">
                    The Proposal
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Three years later, Lisha took Jay back to that same coffee shop. As she ordered her usual latte, the barista handed her a cup with "Will you marry me?" written on it. When she turned around, Lisha was on one knee with the most beautiful ring she had ever seen.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-8">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/30"></div>
                
                <div className="relative pl-12 pb-8">
                  <div className="absolute left-2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                  <div className="font-serif text-lg font-semibold text-foreground">March 2019</div>
                  <div className="text-muted-foreground">First met at Corner Café</div>
                </div>

                <div className="relative pl-12 pb-8">
                  <div className="absolute left-2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                  <div className="font-serif text-lg font-semibold text-foreground">August 2019</div>
                  <div className="text-muted-foreground">First vacation together in Paris</div>
                </div>

                <div className="relative pl-12 pb-8">
                  <div className="absolute left-2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                  <div className="font-serif text-lg font-semibold text-foreground">December 2021</div>
                  <div className="text-muted-foreground">Moved in together</div>
                </div>

                <div className="relative pl-12 pb-8">
                  <div className="absolute left-2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                  <div className="font-serif text-lg font-semibold text-foreground">February 2022</div>
                  <div className="text-muted-foreground">Lisha proposed at Corner Café</div>
                </div>

                <div className="relative pl-12">
                  <div className="absolute left-2 w-4 h-4 bg-rose-gold rounded-full border-4 border-background"></div>
                  <div className="font-serif text-lg font-semibold text-rose-gold">November 2025</div>
                  <div className="text-muted-foreground">Our Wedding Day!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const WeddingDetails = () => {
  return (
    <section id="details" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="ornament text-6xl mb-4">❦</div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Wedding Details
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Ceremony */}
            <div className="bg-card rounded-lg shadow-romantic overflow-hidden">
              <div className="bg-gradient-gold p-6">
                <h3 className="font-serif text-2xl font-bold text-white text-center">
                  Ceremony
                </h3>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex items-start space-x-4">
                  <Calendar className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-card-foreground">Date</h4>
                    <p className="text-muted-foreground">Saturday, November 29th, 2025</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-card-foreground">Time</h4>
                    <p className="text-muted-foreground">3:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-card-foreground">Venue</h4>
                    <p className="text-muted-foreground">
                      Shri KVO Jain Seva Samaj<br />
                      279, LBS Marg, Near Kurla Court<br />
                      Kurla West, Mumbai - 400070
                    </p>
                  </div>
                </div>

                {/* <div className="pt-4">
                  <p className="text-sm text-muted-foreground italic">
                    Outdoor ceremony in the rose garden. Weather permitting.
                  </p>
                </div> */}
              </div>
            </div>

            {/* Reception */}
            <div className="bg-card rounded-lg shadow-romantic overflow-hidden">
              <div className="bg-gradient-gold p-6">
                <h3 className="font-serif text-2xl font-bold text-white text-center">
                  Reception
                </h3>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-card-foreground">Time</h4>
                    <p className="text-muted-foreground">6:00 PM - 10:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-card-foreground">Venue</h4>
                    <p className="text-muted-foreground">
                       Shri KVO Jain Seva Samaj<br />
                      279, LBS Marg, Near Kurla Court<br />
                      Kurla West, Mumbai - 400070
                    </p>
                  </div>
                </div>

                {/* <div className="flex items-start space-x-4">
                  <Music className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-card-foreground">Entertainment</h4>
                    <p className="text-muted-foreground">
                      Live band, DJ, and dancing<br />
                      Open bar and dinner
                    </p>
                  </div>
                </div> */}

                {/* <div className="pt-4">
                  <p className="text-sm text-muted-foreground italic">
                    Cocktail hour begins at 5:00 PM in the garden pavilion.
                  </p>
                </div> */}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-12 bg-blush/50 rounded-lg p-8 text-center">
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
              Important Information
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
              {/* <div>
                <h4 className="font-semibold text-foreground mb-2">Dress Code</h4>
                <p>Semi-formal / Cocktail attire</p>
              </div> */}
              <div>
                <h4 className="font-semibold text-foreground mb-2">Parking</h4>
                <p>Complimentary valet parking available</p>
              </div>
              {/* <div>
                <h4 className="font-semibold text-foreground mb-2">Accommodations</h4>
                <p>Room blocks available at nearby hotels</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Placeholder images - in a real app, these would be actual engagement photos
  const galleryImages = [
    { id: 1, src: '/placeholder.svg', alt: 'Jay and Lisha at the beach' },
    { id: 2, src: '/placeholder.svg', alt: 'Proposal moment at the coffee shop' },
    { id: 3, src: '/placeholder.svg', alt: 'Engagement ring close-up' },
    { id: 4, src: '/placeholder.svg', alt: 'Couple walking in the park' },
    { id: 5, src: '/placeholder.svg', alt: 'Dancing at engagement party' },
    { id: 6, src: '/placeholder.svg', alt: 'Romantic dinner date' },
    { id: 7, src: '/placeholder.svg', alt: 'Hiking together' },
    { id: 8, src: '/placeholder.svg', alt: 'Jay and Lisha laughing' },
  ];

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="ornament text-6xl mb-4">❦</div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Journey
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of our favorite moments together leading up to our special day.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer group shadow-romantic hover:shadow-lg transition-all"
                onClick={() => openLightbox(index)}
              >
                <div className="w-full h-full bg-gradient-romantic flex items-center justify-center group-hover:scale-105 transition-transform">
                  <div className="text-center text-muted-foreground">
                    <div className="text-4xl mb-2">📷</div>
                    <div className="text-sm font-medium">Photo {index + 1}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save the Date Card */}
        <div className="max-w-md mx-auto mt-16">
          <div className="bg-card rounded-lg shadow-romantic p-8 text-center border border-border/50">
            <div className="ornament text-4xl mb-4 text-primary">❦</div>
            <h3 className="font-serif text-2xl font-bold text-card-foreground mb-2">
              Save the Date
            </h3>
            <div className="font-script text-3xl text-primary mb-4">
              Jay & Lisha
            </div>
            <div className="text-muted-foreground mb-4">
              <div className="font-semibold">November 29th, 2025</div>
              <div>Kurla Mahajanwadi</div>
            </div>
            <div className="text-sm text-muted-foreground italic">
              "Two hearts, one love, forever together"
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="bg-white rounded-lg p-4">
              <div className="aspect-square bg-gradient-romantic rounded flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <div className="text-6xl mb-4">📷</div>
                  <div className="text-xl font-medium">
                    {galleryImages[selectedImage].alt}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white text-2xl"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white text-2xl"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

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

  // return (
  //   <section id="rsvp" className="py-20 bg-gradient-romantic">
  //     <div className="container mx-auto px-4">
  //       <div className="text-center mb-16">
  //         <div className="ornament text-6xl mb-4">❦</div>
  //         <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
  //           RSVP
  //         </h2>
  //         <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
  //         <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
  //           We're so excited to celebrate with you! Please let us know if you'll be joining us for our special day.
  //         </p>
  //       </div>

  //       <div className="max-w-2xl mx-auto">
  //         <div className="bg-card rounded-lg shadow-romantic p-8">
  //           <form onSubmit={handleSubmit} className="space-y-6">
  //             <div className="grid md:grid-cols-2 gap-6">
  //               <div className="space-y-2">
  //                 <Label htmlFor="name" className="text-card-foreground font-semibold">
  //                   Full Name *
  //                 </Label>
  //                 <Input
  //                   id="name"
  //                   value={formData.name}
  //                   onChange={(e) => handleInputChange('name', e.target.value)}
  //                   placeholder="Enter your full name"
  //                   className="border-border focus:ring-primary"
  //                 />
  //               </div>

  //               <div className="space-y-2">
  //                 <Label htmlFor="email" className="text-card-foreground font-semibold">
  //                   Email Address *
  //                 </Label>
  //                 <Input
  //                   id="email"
  //                   type="email"
  //                   value={formData.email}
  //                   onChange={(e) => handleInputChange('email', e.target.value)}
  //                   placeholder="Enter your email"
  //                   className="border-border focus:ring-primary"
  //                 />
  //               </div>
  //             </div>

  //             <div className="grid md:grid-cols-2 gap-6">
  //               <div className="space-y-2">
  //                 <Label htmlFor="phone" className="text-card-foreground font-semibold">
  //                   Phone Number
  //                 </Label>
  //                 <Input
  //                   id="phone"
  //                   type="tel"
  //                   value={formData.phone}
  //                   onChange={(e) => handleInputChange('phone', e.target.value)}
  //                   placeholder="Enter your phone number"
  //                   className="border-border focus:ring-primary"
  //                 />
  //               </div>

  //               <div className="space-y-2">
  //                 <Label htmlFor="guests" className="text-card-foreground font-semibold">
  //                   Number of Guests
  //                 </Label>
  //                 <Select value={formData.guests} onValueChange={(value) => handleInputChange('guests', value)}>
  //                   <SelectTrigger className="border-border focus:ring-primary">
  //                     <SelectValue />
  //                   </SelectTrigger>
  //                   <SelectContent>
  //                     <SelectItem value="1">1 Guest</SelectItem>
  //                     <SelectItem value="2">2 Guests</SelectItem>
  //                     <SelectItem value="3">3 Guests</SelectItem>
  //                     <SelectItem value="4">4 Guests</SelectItem>
  //                   </SelectContent>
  //                 </Select>
  //               </div>
  //             </div>

  //             <div className="space-y-2">
  //               <Label htmlFor="attendance" className="text-card-foreground font-semibold">
  //                 Will you be attending? *
  //               </Label>
  //               <Select value={formData.attendance} onValueChange={(value) => handleInputChange('attendance', value)}>
  //                 <SelectTrigger className="border-border focus:ring-primary">
  //                   <SelectValue placeholder="Select your response" />
  //                 </SelectTrigger>
  //                 <SelectContent>
  //                   <SelectItem value="yes">Yes, I'll be there!</SelectItem>
  //                   <SelectItem value="no">Sorry, I can't make it</SelectItem>
  //                 </SelectContent>
  //               </Select>
  //             </div>

  //             <div className="space-y-2">
  //               <Label htmlFor="dietary" className="text-card-foreground font-semibold">
  //                 Dietary Restrictions or Allergies
  //               </Label>
  //               <Input
  //                 id="dietary"
  //                 value={formData.dietaryRestrictions}
  //                 onChange={(e) => handleInputChange('dietaryRestrictions', e.target.value)}
  //                 placeholder="Please let us know about any dietary needs"
  //                 className="border-border focus:ring-primary"
  //               />
  //             </div>

  //             <div className="space-y-2">
  //               <Label htmlFor="message" className="text-card-foreground font-semibold">
  //                 Special Message
  //               </Label>
  //               <Textarea
  //                 id="message"
  //                 value={formData.message}
  //                 onChange={(e) => handleInputChange('message', e.target.value)}
  //                 placeholder="Share your excitement or any special notes"
  //                 className="border-border focus:ring-primary"
  //                 rows={4}
  //               />
  //             </div>

  //             <div className="text-center pt-4">
  //               <Button
  //                 type="submit"
  //                 className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-3 text-lg font-semibold shadow-gold hover:shadow-lg transform hover:-translate-y-1 transition-all"
  //               >
  //                 Send RSVP
  //               </Button>
  //             </div>
  //           </form>
  //         </div>

  //         <div className="text-center mt-8">
  //           <p className="text-sm text-muted-foreground">
  //             RSVP by May 29th, 2025 • For questions, email us at{' '}
  //             <a href="mailto:Jay.Lisha.wedding@example.com" className="text-primary hover:underline">
  //               Jay.Lisha.wedding@example.com
  //             </a>
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  // );
};

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="mb-8">
            <div className="font-script text-4xl text-champagne mb-4">
              Jay & Lisha
            </div>
            <div className="ornament text-4xl text-primary mb-4">❦</div>
            <p className="text-lg text-background/80 max-w-md mx-auto">
              Thank you for being part of our love story. We can't wait to celebrate with you!
            </p>
          </div>

          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="mailto:Jay.Lisha.wedding@example.com"
              className="text-background/70 hover:text-champagne transition-colors"
              aria-label="Email us"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-background/70 hover:text-champagne transition-colors"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-background/70 hover:text-champagne transition-colors"
              aria-label="Follow us on Facebook"
            >
              <Facebook className="w-6 h-6" />
            </a>
          </div>

          <div className="border-t border-background/20 pt-8">
            <div className="flex items-center justify-center space-x-2 text-background/60">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-primary fill-current" />
              <span>for Jay & Lisha</span>
            </div>
            <div className="text-sm text-background/50 mt-2">
              Wedding Date: November 29th, 2025 • Kurla Mahajanwadi
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <OurStory />
      <WeddingDetails />
      <Gallery />
      <Footer />
    </div>
  );
};

export default Index;
