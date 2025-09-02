import { Heart } from 'lucide-react';

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

export default OurStory;