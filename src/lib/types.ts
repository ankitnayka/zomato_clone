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
    menuCategoryId:string;
    
  }
  

  export interface Dish {
  id: string;
  name: string;
  restaurantId: string;
  count: number; 
  price:number;
  menuCategoryId:string;
  dish:string;
  tag:string;
}
