import { useState } from 'react';
import { X } from 'lucide-react';

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
              <div>Garden Manor Estate</div>
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

export default Gallery;