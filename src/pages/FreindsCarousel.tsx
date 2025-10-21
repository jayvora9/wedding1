import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay } from "swiper/modules";
import hitesh from "../../assets/hitesh.jpg";
import nirmal from "../../assets/nirmal.jpg";
import aarvi from "../../assets/aarvi.jpg";
import mehvish from "../../assets/mehvish.jpg";
import sejul from "../../assets/sejul.jpg";
import vinit from "../../assets/Vinit.jpg";
import shradhha from "../../assets/Shraddha .jpg";
// Example data
const messages = [
  {
    name: "Hitesh Ganger",
    img: hitesh,
    message: "May your marriage be filled with all the right ingredients: a heap of love, a dash of humor, a touch of romance, and a spoonful of understanding. May your joy last forever. Wishing you lots of love and a lifetime of happiness. [We] love you.",
  },
  {
    name: "Nirmal Rambhia",
    img: nirmal,
    message: "May your bond grow stronger with each passing day. Best wishes for a blissful married life. Congratulations on your marriage !!",
  },
  {
    name: "Vinit Soni",
    img: vinit,
    message: "From college benches to tuition classes, we have seen it all, Jay, and now you and Lisha get to ace the biggest subject of all: Love 💕📚😂 As they say, a happy marriage is built on countless little moments of laughter and care, wishing you both a lifetime full of them!",
  },
  {
    name: "Mehvish",
    img: mehvish,
    message: "Hope your honeymoon period lasts a lifetime & the companionship would lasts more then the 7 life's you have got!!! Stay blessed always ❤",
  },
  {
    name: "Aarvi and Aarohi Uthale",
    img: aarvi,
    message: "Big congratulations on finally signing the lifetime contract of love! 💍 No refunds, no returns—just endless adventures, shared snacks, and occasional arguments over what to watch and where to go for outting.😄 Wishing you both a married life full of inside jokes, spontaneous dance moves, late-night food cravings, and love that grows stronger ! Cheers to the perfect team—one slightly crazier than the other! 🥂❤ With lots of love and laughter",
  },
  {
    name: "Sejul Shah",
    img: sejul,
    message: "Lisha…you are 💎 and Jay billionaire ban gaya hai after getting a 💎 …stay as you are don’t ever change…pagalgiri kabhi rukni nai chahiye teri…innocent chehre k piche totally crazy insaan…I am so so so happy for beginning of the new chapter of your love story🥰 All the best ❤",
  },
  {
    name: "Shraddha Khatri",
    img: shradhha,
    message: "Most awaited to see you both become the most adorable married couple in the world. May your love and bond grow deeper with each passing year",
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
