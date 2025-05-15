"use client";

import { useState } from "react";
import type { Dish, MenuCategory } from "../lib/types";

interface OrderOnlineProps {
  menuCategories: MenuCategory[];
  dishes: Dish[];
}

export default function OrderOnline({ menuCategories, dishes }: OrderOnlineProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    menuCategories[0]?.id || null
  );

  const selectedCategory = menuCategories.find(
    (cat) => cat.id === selectedCategoryId
  );

  const filteredDishes = dishes.filter(
    (dish) => dish.menuCategoryId === selectedCategoryId
  );

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-6">
      {/* Category Menu */}
      <aside className="md:w-1/4 border-r pr-4">
        <ul className="space-y-2 text-sm font-medium">
          {menuCategories.map((cat) => (
            <li
              key={cat.id}
              className={`cursor-pointer border-l-4 pl-2 py-1 ${
                selectedCategoryId === cat.id
                  ? "border-red-500 text-red-600 bg-red-50"
                  : "border-transparent text-gray-700"
              }`}
              onClick={() => setSelectedCategoryId(cat.id)}
            >
              {cat.name} ({cat.count})
            </li>
          ))}
        </ul>
      </aside>

      {/* Dishes Section */}
      <section className="md:w-3/4">
        <h2 className="text-lg font-semibold mb-2">{selectedCategory?.name}</h2>
        <div className="space-y-4">
          {filteredDishes.length ? (
            filteredDishes.map((dish) => (
              <div key={dish.id} className="border-b pb-2">
                <p className="font-medium">{dish.name}</p>
                <p className="text-sm text-gray-600">₹{dish.price.toFixed(2)}</p>
                {dish.tag && (
                  <p className="text-xs text-green-600 mt-1">[{dish.tag}]</p>
                )}
              </div>
            ))
          ) : (
            <p>No dishes available.</p>
          )}
        </div>
      </section>
    </div>
  );
}
