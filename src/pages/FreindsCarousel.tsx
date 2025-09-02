import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay } from "swiper/modules";
import person from "../../assets/person.jpeg";
// Example data
const messages = [
  {
    name: "Aarav Mehta",
    img: person,
    message: "Wishing you both a lifetime full of love, laughter, and happiness!",
  },
  {
    name: "Ishita Shah",
    img: person,
    message: "May this beautiful journey bring endless joy and togetherness.",
  },
  {
    name: "Rahul Patel",
    img: person,
    message: "Cheers to love, friendship, and a future full of sweet memories.",
  },
  {
    name: "Nisha Kapoor",
    img: person,
    message: "Wishing you a blessed married life and everlasting companionship.",
  },
  {
    name: "Aarav Mehta",
    img: person,
    message: "Wishing you both a lifetime full of love, laughter, and happiness!",
  },
  {
    name: "Ishita Shah",
    img: person,
    message: "May this beautiful journey bring endless joy and togetherness.",
  },
  {
    name: "Rahul Patel",
    img: person,
    message: "Cheers to love, friendship, and a future full of sweet memories.",
  },
  {
    name: "Nisha Kapoor",
    img: person,
    message: "Wishing you a blessed married life and everlasting companionship.",
  },
  {
    name: "Aarav Mehta",
    img: person,
    message: "Wishing you both a lifetime full of love, laughter, and happiness!",
  },
  {
    name: "Ishita Shah",
    img: person,
    message: "May this beautiful journey bring endless joy and togetherness.",
  },
  {
    name: "Rahul Patel",
    img: person,
    message: "Cheers to love, friendship, and a future full of sweet memories.",
  },
  {
    name: "Nisha Kapoor",
    img: person,
    message: "Wishing you a blessed married life and everlasting companionship.",
  },
];

export default function FriendsCarousel() {
  return (
    <div className="w-full py-12 bg-gradient-to-b from-pink-50 to-white">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8 text-pink-600">
        💕 Messages from Close Friends 💕
      </h2>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        breakpoints={{
          768: { slidesPerView: 2 }, // tablets
          1024: { slidesPerView: 3 }, // laptops
          1440: { slidesPerView: 4 }, // big screens
        }}
        className="max-w-6xl mx-auto px-4"
      >
        {messages.map((friend, i) => (
          <SwiperSlide key={i}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow"
            >
              <img
                src={friend.img}
                alt={friend.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-pink-200 shadow-md mb-4"
              />
              <h3 className="text-lg font-bold text-pink-700">{friend.name}</h3>
              <p className="text-gray-600 mt-2 text-sm">{friend.message}</p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
