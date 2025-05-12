'use client';

import { useState } from 'react';

const exploreData = [
    {
      title: "Popular cuisines near me",
      items: [
        "Bakery near me",
        "Beverages near me",
        "Biryani near me",
        "Burger near me",
        "Cafe near me",
        "Chinese near me",
        "Coffee near me",
        "Desserts near me",
        "Gujarati near me",
        "Ice Cream near me",
        "Italian near me",
        "North Indian near me",
        "Pasta near me",
        "Pizza near me",
        "Sandwich near me",
        "Shake near me",
        "Sichuan near me",
        "South Indian near me",
        "Street near me",
        "Tea near me",
      ],
    },
    {
      title: "Popular restaurant types near me",
      items: [
        "Buffet",
        "Café",
        "Casual Dining",
        "Fine Dining",
        "Food Truck",
        "Kiosk",
        "Quick Bites",
        "Sweet Shop",
      ],
    },
    {
      title: "Top restaurant chains",
      items: [
        "Domino's",
        "KFC",
        "McDonald's",
        "Pizza Hut",
        "Subway",
        "Barbeque Nation",
        "Biryani Blues",
        "Faasos",
      ],
    },
    {
      title: "Cities we deliver to",
      items: [
        "Mumbai",
        "Delhi",
        "Bangalore",
        "Hyderabad",
        "Chennai",
        "Pune",
        "Ahmedabad",
        "Kolkata",
        "Jaipur",
        "Surat",
      ],
    },
  ];
  


type Section = {
  title: string;
  items: string[];
};

interface ExploreOptionsProps {
  data: Section[];
}

export default function ExploreOptions({ data }: ExploreOptionsProps) {
  const [openSection, setOpenSection] = useState<string | null>('Popular cuisines near me');

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-semibold mb-6">Explore options near me</h2>

      {exploreData.map((section) => (
        <div key={section.title} className="bg-white border rounded-lg mb-4">
          <button
            onClick={() =>
              setOpenSection((prev) => (prev === section.title ? null : section.title))
            }
            className="w-full text-left px-5 py-4 font-medium flex justify-between items-center"
          >
            <span>{section.title}</span>
            <span>{openSection === section.title ? '▲' : '▼'}</span>
          </button>

          {openSection === section.title && (
            <div className="px-5 pb-4 flex flex-wrap gap-2 text-sm text-gray-600">
              {section.items?.map((item, idx) => (
                <span key={idx} className="whitespace-nowrap">
                  {item}
                  {idx < section?.items?.length - 1 && <span> · </span>}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}



