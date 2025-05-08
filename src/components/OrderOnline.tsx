"use client";

import { useState } from "react";
import type { MenuCategory } from "@/lib/types";

interface OrderOnlineProps {
  menuCategories: MenuCategory[];
}

export default function OrderOnline({ menuCategories }: OrderOnlineProps) {
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(
    menuCategories[0]?.name || null
  );

  const selectedCategory = menuCategories.find(
    (cat) => cat.name === selectedCategoryName
  );

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-6">
      {/* CategoryMenu */}
      <aside className="md:w-1/4 border-r pr-4">
        <ul className="space-y-2 text-sm font-medium">
          {menuCategories.map((cat) => (
            <li
              key={cat.name}
              className={`cursor-pointer border-l-4 pl-2 py-1 ${
                selectedCategoryName === cat.name
                  ? "border-red-500 text-red-600 bg-red-50"
                  : "border-transparent text-gray-700"
              }`}
              onClick={() => setSelectedCategoryName(cat.name)}
            >
              {cat.name} ({cat.count})
            </li>
          ))}
        </ul>
      </aside>

      {/* Items Section */}
      <section className="md:w-3/4">
        <p className="text-sm text-red-500 mb-1">
          {/* online order accept or not  */}
        </p>

        <h2 className="text-lg font-semibold mb-2">{selectedCategory?.name}</h2>

        <div className="space-y-4">
          {selectedCategory?.items?.length ? (
            selectedCategory.items.map((item, idx) => (
              <div key={idx} className="border-b pb-2">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">₹{item.price.toFixed(2)}</p>
                {item.tag && (
                  <p className="text-xs text-green-600 mt-1">[{item.tag}]</p>
                )}
              </div>
            ))
          ) : (
            <p>No items available.</p>
          )}
        </div>
      </section>
    </div>
  );
}
