import { Calendar, MapPin, Clock, Music } from 'lucide-react';

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
                    <p className="text-muted-foreground">4:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-card-foreground">Venue</h4>
                    <p className="text-muted-foreground">
                      Garden Manor Estate<br />
                      123 Rose Garden Lane<br />
                      Bloomfield, CA 90210
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-sm text-muted-foreground italic">
                    Outdoor ceremony in the rose garden. Weather permitting.
                  </p>
                </div>
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
                    <p className="text-muted-foreground">6:00 PM - 11:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-card-foreground">Venue</h4>
                    <p className="text-muted-foreground">
                      Garden Manor Estate<br />
                      Grand Ballroom<br />
                      Same location as ceremony
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Music className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-card-foreground">Entertainment</h4>
                    <p className="text-muted-foreground">
                      Live band, DJ, and dancing<br />
                      Open bar and dinner
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-sm text-muted-foreground italic">
                    Cocktail hour begins at 5:00 PM in the garden pavilion.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-12 bg-blush/50 rounded-lg p-8 text-center">
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
              Important Information
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Dress Code</h4>
                <p>Semi-formal / Cocktail attire</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Parking</h4>
                <p>Complimentary valet parking available</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Accommodations</h4>
                <p>Room blocks available at nearby hotels</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingDetails;