'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAxios } from '@/app/hooks/useAxios'

type GalleryItem = {
  _id: string;
  heading: string;
  description: string;
  category: string;
  image: {
    url: string;
    public_id: string;
  };
};

const categories = ['annual', 'sport', 'featured'];

export function GalleryManager() {
  const axiosInstance  = useAxios(); // Get the axios instance
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [newItem, setNewItem] = useState({
    heading: '',
    description: '',
    category: '',
  });
  const [newImage, setNewImage] = useState<File | null>(null);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get('/gallery');
      setGalleryItems(data);
    } catch (err) {
      setError('Failed to fetch gallery items: ' + err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editingItem) {
      setEditingItem({ ...editingItem, [name]: value });
    } else {
      setNewItem((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCategoryChange = (value: string) => {
    if (editingItem) {
      setEditingItem({ ...editingItem, category: value });
    } else {
      setNewItem((prev) => ({ ...prev, category: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      if (newImage) {
        formData.append('image', newImage);
      }
      formData.append('heading', editingItem?.heading || newItem.heading);
      formData.append('description', editingItem?.description || newItem.description);
      formData.append('category', editingItem?.category || newItem.category);

      if (editingItem) {
        await axiosInstance.put(`/gallery/${editingItem._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axiosInstance.post('/gallery', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      fetchGalleryItems();
      setNewItem({ heading: '', description: '', category: '' });
      setNewImage(null);
      setEditingItem(null);
    } catch (err) {
      setError('Failed to save gallery item: ' + err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (_id: string) => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(`/gallery/${_id}`);
      fetchGalleryItems();
    } catch (err) {
      setError('Failed to delete gallery item: ' + err);
    } finally {
      setIsLoading(false);
    }
  };

  const groupedGalleryItems = galleryItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, GalleryItem[]>);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Tabs defaultValue="view" className="w-full">
      <TabsList>
        <TabsTrigger value="view">View Gallery</TabsTrigger>
        <TabsTrigger value="add">Add New Item</TabsTrigger>
      </TabsList>
      <TabsContent value="view">
        {Object.entries(groupedGalleryItems).map(([category, items]) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 capitalize">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => (
                <Card key={item._id}>
                  <CardHeader>
                    <CardTitle>{item.heading}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img
                      src={item.image.url}
                      alt={item.heading}
                      className="w-full h-48 object-cover mb-2 rounded"
                    />
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <span className="bg-gray-200 px-2 py-1 rounded text-xs">{item.category}</span>
                    <div className="flex justify-end space-x-2 mt-2">
                      <Button onClick={() => setEditingItem(item)}>Edit</Button>
                      <Button variant="destructive" onClick={() => handleDelete(item._id)}>
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </TabsContent>
      <TabsContent value="add">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="heading">Heading</Label>
            <Input
              id="heading"
              name="heading"
              value={editingItem?.heading || newItem.heading}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={editingItem?.description || newItem.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select 
              onValueChange={handleCategoryChange}
              defaultValue={editingItem?.category || newItem.category}
            >
              <SelectTrigger className=''>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className='bg-slate-200'>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="image">Choose Image</Label>
            <Input
              id="image"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>
          <Button type="submit">{editingItem ? 'Update' : 'Add'} Gallery Item</Button>
          {editingItem && (
            <Button type="button" variant="outline" onClick={() => setEditingItem(null)}>
              Cancel Edit
            </Button>
          )}
        </form>
      </TabsContent>
    </Tabs>
  );
}

