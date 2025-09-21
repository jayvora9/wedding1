import { useEffect, useState } from "react";
import logo from '../../assets/logo.png';

const Countdown = () => {
  const calculateTimeLeft = () => {
    const weddingDate = new Date("2025-11-29T15:00:00");
    const now = new Date();
    const difference = weddingDate.getTime() - now.getTime();

    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) return null;

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="py-20 bg-gradient-romantic relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <img src={logo} alt="Logo" className="mx-auto mb-6 h-20 w-20 object-contain" />
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
          Countdown to Our Wedding
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto mb-12"></div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {timeUnits.map((unit) => (
            <div
              key={unit.label}
              className="bg-card rounded-xl shadow-romantic p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform"
            >
              <div className="text-4xl md:text-5xl font-script text-primary mb-2">
                {unit.value}
              </div>
              <div className="text-lg font-serif text-muted-foreground">{unit.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Optional subtle decorative background elements */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[36rem] opacity-10 pointer-events-none select-none">
        <img src={logo} alt="decor" className="w-full h-full object-contain" />
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[36rem] opacity-10 pointer-events-none select-none">
        <img src={logo} alt="decor" className="w-full h-full object-contain" />
      </div>
    </section>
  );
};

export default Countdown;
