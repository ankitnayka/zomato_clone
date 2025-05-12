"use client";

import { useState } from "react";
import Image from "next/image";
import OverviewSection from "./OverView";
import OrderOnline from "./OrderOnline";
import { CollectionCard } from "./CollectionCard";
import dynamic from "next/dynamic";

// const dummyCuisines = [
//   "North Indian",
//   "South Indian",
//   "Gujarati",
//   "Punjabi",
//   "Chinese",
//   "Italian",
//   "Mexican",
//   "Biryani",
//   "Desserts",
//   "Continental",
//   "Salad",
//   "Asian",
//   "Beverages",
// ];

export default function RestaurantDetails({ dish, restaurant }: any) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  return (
    <div className="max-w-7xl mx-auto p-6">
      
      {dish &&(
        <h1 className="text-3xl font-bold mb-1">{dish.name}</h1>
      )
      }
      <p className="text-gray-600">{restaurant.name}</p>
      <p className="text-sm text-gray-500">{restaurant.address}</p>

      <div className="text-sm text-gray-600 my-2 flex gap-6 flex-wrap">
      
      {dish&& (
        <span>₹{dish?.price} for two</span>
      )}  
      
        <span>📞 {restaurant?.phoneNumber}</span>
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-500 hover:underline"
        >
          💬 WhatsApp
        </a>
        <span>🕒 opne Time : {restaurant?.openTime}</span>
      </div>

{
  dish && (

 
      <Image
        src={dish?.imageUrl || "/placeholder.jpg"}
        alt={dish?.name}
        width={700}
        height={400}
        className="rounded-xl my-4"
        />
        
 )
}
      {/* Tabs */}
      <div className="border-b mb-4">
        {["Overview", "Order Online", "Reviews", "Photos", "Menu"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 border-b-2 transition-colors duration-150 ${
              activeTab === tab
                ? "border-red-500 text-red-600"
                : "border-transparent text-gray-500 hover:text-red-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content + Direction */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Tab Content */}
        <div className="flex-1">
          {activeTab === "Overview" && (
            <OverviewSection 
              restaurant={{
                cuisines: restaurant.cuisines,
                menuImages: ["/menu1.png", "/menu2.png"],
              }}
            />
          )}
          {activeTab === "Order Online" && <OrderOnline menuCategories={restaurant.menuCategories} />}
          {activeTab === "Reviews" && <div>Reviews section</div>}
          {activeTab === "Photos" && <div>Photos section</div>}
          {activeTab === "Menu" && (
            <div>
              <p className="font-semibold">Cuisines</p>
              <span className="inline-block px-2 py-1 mt-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                Gujarati
              </span>
              <div className="mt-4 cursor-pointer" onClick={() => setSelectedImage("/menu.png")}>
                <Image
                  src="/menu.png"
                  alt="Menu"
                  width={300}
                  height={300}
                  className="rounded shadow"
                />
                <p className="text-sm mt-1">Menu</p>
              </div>
            </div>
          )}
        </div>

        {/* Direction */}
        <div className="w-full md:w-[320px]">
          <p className="font-semibold">Direction</p>
          <iframe
            className="mt-2 rounded"
            src="https://www.openstreetmap.org/export/embed.html?bbox=72.8282,21.1956,72.8392,21.2016"
            width="100%"
            height="200"
            loading="lazy"
          />
          <p className="text-sm mt-1 text-gray-500">{restaurant.address}</p>
          <button className="mt-2 px-3 py-1 border rounded text-red-500 border-red-500 hover:bg-red-50 text-sm">
            📍 Direction
          </button>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <Image
            src={selectedImage}
            alt="Full view"
            width={900}
            height={900}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
}


