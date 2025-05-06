'use client';

import Image from "next/image";
import { useState } from "react";

const TabsList = [
  {
    tabName: "Dining Out",
    img: "/diningout.png",
  },
  {
    tabName: "Delivery",
    img: "/delivery.png",
  },
  {
    tabName: "OfferClose %",
    img: "/delivery.png",
  },
];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("Dining Out");

  return (
    <div>
      <div className="max-w-7xl mx-auto h-16 px-4 flex items-center gap-8">
        {TabsList.map((tab) => (
          <button
            key={tab.tabName}
            onClick={() => setActiveTab(tab.tabName)}
            className={`flex items-center gap-2 py-2 px-4 rounded-full transition ${
              activeTab === tab.tabName ? "bg-rose-100 text-rose-600" : "text-gray-600"
            }`}
          >
            <Image src={tab.img} alt={tab.tabName} width={36} height={36} className="rounded-lg p-0.5" />
            <span className="font-medium">{tab.tabName}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
