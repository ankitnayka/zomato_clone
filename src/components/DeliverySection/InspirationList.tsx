'use client';

import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const items = [
  { label: "Thali", img: "/images/thali.png" },
  { label: "Veg Meal", img: "/images/vegmeal.png" },
  { label: "Biryani", img: "/images/biryani.png" },
  { label: "Pizza", img: "/images/pizza.png" },
  { label: "Chole Bhature", img: "/images/cholebhature.png" },
  { label: "No Onion No Garlic", img: "/images/noonion.png" },
  { label: "Rolls", img: "/images/rolls.png" },
];

export default function InspirationList() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = 300;
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold my-4">Inspiration for your first order</h2>

      {items.length > 5 && (
        <>
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 scroll-smooth hide-scrollbar py-2"
      >
        {items.map((item) => (
          <div key={item.label} className="flex flex-col items-center min-w-[100px]">
            <div className="w-42 h-42 rounded-full overflow-hidden border shadow-md flex items-center justify-center bg-white">
              <Image
                src={item.img}
                alt={item.label}
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-sm text-center mt-2 w-[100px] truncate">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
