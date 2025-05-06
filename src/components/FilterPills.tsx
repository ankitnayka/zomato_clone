'use client';

import { useState } from 'react';
import { Button } from './ui/button';

const filters = [
  "Filters",
  "Offers",
  "Rating: 4.5+",
  "Pet Friendly",
  "Outdoor Seating",
  "Open Now",
];

const FilterPills = () => {
  const [active, setActive] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 mt-4 overflow-x-auto scrollbar-hide">
      <div className="flex md:flex-wrap gap-2">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={active === filter ? "default" : "outline"}
            className="rounded-full whitespace-nowrap"
            onClick={() => setActive(filter === active ? null : filter)}
          >
            {filter}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FilterPills;
