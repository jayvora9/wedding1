import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const MapSection: React.FC = () => {
  const destination = "19.064800652326927,72.87216387373611"; // Fixed destination (latitude, longitude)

  const handleOpenMap = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          // Open Google Maps directions from current location to destination
          window.open(
            `https://www.google.com/maps/dir/${latitude},${longitude}/${destination}`,
            "_blank"
          );
        },
        () => {
          // If user denies location, just open destination
          window.open(`https://www.google.com/maps/place/${destination}`, "_blank");
        }
      );
    } else {
      window.open(`https://www.google.com/maps/place/${destination}`, "_blank");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-r from-pink-50 to-yellow-50">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 text-center"
      >
        📍 Wedding Venue Location
      </motion.h2>

      {/* Animated Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full max-w-5xl shadow-xl rounded-2xl overflow-hidden"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.9758213098035!2d72.87216387373611!3d19.064800652326927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c889756f385f%3A0xe60d0d04d9eee549!2sShree%20Kutchi%20Visha%20Oswal%20Jain%20Seva%20Samaj!5e0!3m2!1sen!2sin!4v1756808064192!5m2!1sen!2sin"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-72 md:h-96"
        ></iframe>
      </motion.div>

      {/* Button for Directions */}
      <motion.button
        onClick={handleOpenMap}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        <MapPin className="w-5 h-5" />
        Get Directions
      </motion.button>
    </div>
  );
};

export default MapSection;
