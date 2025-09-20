import { Heart, Instagram, Facebook, Mail } from 'lucide-react';

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
              href="#"
              className="text-background/70 hover:text-champagne transition-colors"
              aria-label="Email us"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/lifewith_shaay?igsh=MTg0azR1OG4zYTloOA=="
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
              Wedding Date: November 29th, 2025 • Garden Manor Estate
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;