import heroImage from '@/assets/hero-wedding-couple.jpg';

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
          <div className="text-champagne/80">Garden Manor Estate</div>
        </div>

        {/* Call to Action */}
        <div className="space-y-4">
          <button
            onClick={() => document.querySelector('#rsvp')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-semibold transition-all shadow-gold hover:shadow-lg transform hover:-translate-y-1"
          >
            RSVP Now
          </button>
        </div>
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

export default Hero;