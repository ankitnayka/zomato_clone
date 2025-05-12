export interface MenuItem {
    id: string;
    name: string;
    price: number;
    tag?: string;
  }
  
  export interface MenuCategory {
    id: string;
    name: string;
    count: number;
    restaurantId: string;
    items: MenuItem[];
  }
  