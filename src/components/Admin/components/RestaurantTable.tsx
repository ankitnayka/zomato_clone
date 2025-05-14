import { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getAllRestaurants } from '@/app/actions/getRestaurants';

interface Restaurant {
  id: string;
  name: string;
  address: string;
  imageUrl?: string;
  phoneNumber?: string;
  openTime?: string;
  closeTime?: string;
  ratings?: number;
  ratingCount?: number;
}

export default function RestaurantTable() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);
  const [editRestaurant, setEditRestaurant] = useState<Restaurant | null>(null);
  const [formData, setFormData] = useState<Partial<Restaurant>>({});

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    const res = await getAllRestaurants()
    setRestaurants(res);
  };

  const handleEditClick = (restaurant: Restaurant) => {
    setEditRestaurant(restaurant);
    setFormData(restaurant);
  };

  const handleUpdate = async () => {
    if (!editRestaurant) return;
    await axios.put(`/api/admin/restaurants/${editRestaurant.id}`, formData);
    setEditRestaurant(null);
    fetchRestaurants();
  };

  const filtered = restaurants.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / perPage);
  const currentData = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Restaurants</h2>
        <Input
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Open</TableHead>
            <TableHead>Close</TableHead>
            <TableHead>Ratings</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((r) => (
            <TableRow key={r.id}>
              <TableCell>{r.name}</TableCell>
              <TableCell>{r.address}</TableCell>
              <TableCell>{r.phoneNumber || '-'}</TableCell>
              <TableCell>{r.openTime || '-'}</TableCell>
              <TableCell>{r.closeTime || '-'}</TableCell>
              <TableCell>{r.ratings ?? '-'} ({r.ratingCount ?? 0})</TableCell>
              <TableCell>
                {r.imageUrl ? <img src={r.imageUrl} alt={r.name} className="h-12 w-12 object-cover rounded" /> : '-'}
              </TableCell>
              <TableCell>
                <Button variant="outline" onClick={() => handleEditClick(r)}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center">
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <div className="space-x-2">
          <Button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Previous</Button>
          <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</Button>
        </div>
      </div>

      <Dialog open={!!editRestaurant} onOpenChange={() => setEditRestaurant(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Restaurant</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Name"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              placeholder="Address"
              value={formData.address || ''}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            <Input
              placeholder="Phone Number"
              value={formData.phoneNumber || ''}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
            <Input
              placeholder="Open Time"
              value={formData.openTime || ''}
              onChange={(e) => setFormData({ ...formData, openTime: e.target.value })}
            />
            <Input
              placeholder="Close Time"
              value={formData.closeTime || ''}
              onChange={(e) => setFormData({ ...formData, closeTime: e.target.value })}
            />
            <Button onClick={handleUpdate}>Update</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}