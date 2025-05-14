'use client'

import AddRestaurantForm from "@/components/Admin/components/AddRestaurantForm"
import RestaurantTable from "@/components/Admin/components/RestaurantTable"


export default function UserPage() {
        console.log("Userr page from admin...")
  return (
    <div>
       <AddRestaurantForm />
       <RestaurantTable />
    </div>
  )
}
