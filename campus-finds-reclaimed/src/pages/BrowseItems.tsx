
import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Calendar, 
  MapPin, 
  X,
  ChevronDown,
  BookOpen
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ItemCard from "@/components/ItemCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Sample data for lost items
const lostItems = [
  {
    id: "1",
    title: "MacBook Pro 13-inch",
    description: "Lost my silver MacBook Pro with stickers on the cover in the library, 3rd floor study area.",
    category: "Electronics",
    location: "University Library",
    date: "April 5, 2025",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1626&auto=format&fit=crop",
    status: "lost" as const,
  },
  {
    id: "2",
    title: "Student ID Card",
    description: "Lost my student ID card somewhere in the library on Monday afternoon.",
    category: "Documents",
    location: "University Library",
    date: "April 4, 2025",
    status: "lost" as const,
  },
  {
    id: "3",
    title: "Car Keys with Blue Keychain",
    description: "Lost my car keys with a distinctive blue keychain near the parking lot entrance.",
    category: "Keys",
    location: "Parking Lot",
    date: "April 3, 2025",
    image: "https://images.unsplash.com/photo-1622902046580-2807878c0519?q=80&w=1887&auto=format&fit=crop",
    status: "lost" as const,
  },
  {
    id: "4",
    title: "Apple AirPods Pro",
    description: "Lost my AirPods Pro in a white case in the Student Center during lunch.",
    category: "Electronics",
    location: "Student Center",
    date: "April 2, 2025",
    image: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?q=80&w=1471&auto=format&fit=crop",
    status: "lost" as const,
  },
  {
    id: "5",
    title: "Blue Northface Backpack",
    description: "Lost my navy blue Northface backpack with books and notebooks inside.",
    category: "Bags",
    location: "Science Building",
    date: "April 1, 2025",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1887&auto=format&fit=crop",
    status: "lost" as const,
  },
  {
    id: "6",
    title: "Prescription Glasses",
    description: "Lost my black-framed prescription glasses in a brown case.",
    category: "Accessories",
    location: "Academic Block",
    date: "March 30, 2025",
    status: "lost" as const,
  },
];

// Sample data for found items
const foundItems = [
  {
    id: "7",
    title: "Black Laptop Bag",
    description: "Found a black laptop bag with a Dell charger inside near the Science Building.",
    category: "Electronics",
    location: "Science Building",
    date: "April 5, 2025",
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1974&auto=format&fit=crop",
    status: "found" as const,
  },
  {
    id: "8",
    title: "Green Water Bottle",
    description: "Found a green metal water bottle outside the gym entrance.",
    category: "Accessories",
    location: "Sports Complex",
    date: "April 4, 2025",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1887&auto=format&fit=crop",
    status: "found" as const,
  },
  {
    id: "9",
    title: "Blue Water Bottle",
    description: "Found a blue Hydro Flask water bottle at the soccer field yesterday evening.",
    category: "Accessories",
    location: "Sports Complex",
    date: "April 3, 2025",
    image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=1758&auto=format&fit=crop",
    status: "found" as const,
  },
  {
    id: "10",
    title: "USB Flash Drive",
    description: "Found a black 32GB USB flash drive in Computer Lab 2.",
    category: "Electronics",
    location: "Academic Block",
    date: "April 2, 2025",
    status: "found" as const,
  },
  {
    id: "11",
    title: "Samsung Smartphone",
    description: "Found a black Samsung phone with a cracked screen protector in the cafeteria.",
    category: "Electronics",
    location: "Cafeteria",
    date: "April 1, 2025",
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=1936&auto=format&fit=crop",
    status: "found" as const,
  },
  {
    id: "12",
    title: "Gold Ring",
    description: "Found a gold ring in the women's bathroom on the 2nd floor of the Student Center.",
    category: "Accessories",
    location: "Student Center",
    date: "March 30, 2025",
    image: "https://images.unsplash.com/photo-1568944116930-936521a10424?q=80&w=1887&auto=format&fit=crop",
    status: "found" as const,
  },
];

// Categories for filters
const categories = [
  { value: "all", label: "All Categories" },
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "accessories", label: "Accessories" },
  { value: "documents", label: "Documents" },
  { value: "keys", label: "Keys" },
  { value: "bags", label: "Bags & Luggage" },
  { value: "books", label: "Books & Stationery" },
  { value: "others", label: "Others" },
];

// Locations for filters
const locations = [
  { value: "all", label: "All Locations" },
  { value: "library", label: "University Library" },
  { value: "student_center", label: "Student Center" },
  { value: "science_building", label: "Science Building" },
  { value: "cafeteria", label: "Cafeteria" },
  { value: "sports_complex", label: "Sports Complex" },
  { value: "dormitory", label: "Dormitory" },
  { value: "parking_lot", label: "Parking Lot" },
  { value: "academic_block", label: "Academic Block" },
  { value: "cs_office", label: "CS Academic Office" },
  { value: "student_affairs", label: "Student Affairs Office" },
];

// Date ranges for filters
const dateRanges = [
  { value: "all", label: "All Time" },
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "this_week", label: "This Week" },
  { value: "last_week", label: "Last Week" },
  { value: "this_month", label: "This Month" },
  { value: "last_month", label: "Last Month" },
];

const BrowseItems = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedDateRange, setSelectedDateRange] = useState("all");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);

  // Filter items based on search query and filter criteria
  const filterItems = (items: typeof lostItems) => {
    return items.filter((item) => {
      const matchesSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory =
        selectedCategory === "all" ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();
      
      const matchesLocation =
        selectedLocation === "all" ||
        item.location.toLowerCase().includes(selectedLocation.toLowerCase());
      
      // For simplicity, we're just checking if the date contains the selected date range text
      // In a real application, you'd want to perform proper date filtering
      const matchesDateRange =
        selectedDateRange === "all" ||
        (selectedDateRange === "today" && item.date.includes("April 5")) ||
        (selectedDateRange === "yesterday" && item.date.includes("April 4")) ||
        (selectedDateRange === "this_week" && 
          (item.date.includes("April 5") || 
           item.date.includes("April 4") || 
           item.date.includes("April 3") || 
           item.date.includes("April 2") || 
           item.date.includes("April 1"))) ||
        (selectedDateRange === "last_week" && item.date.includes("March 30")) ||
        (selectedDateRange === "this_month" && 
          (item.date.includes("April"))) ||
        (selectedDateRange === "last_month" && 
          (item.date.includes("March")));
      
      return matchesSearch && matchesCategory && matchesLocation && matchesDateRange;
    });
  };

  // Get the items to display based on the active tab
  const getDisplayedItems = () => {
    if (activeTab === "found") {
      return filterItems(foundItems);
    } else if (activeTab === "lost") {
      return filterItems(lostItems);
    } else {
      // "all" tab: combine and filter both lost and found items
      return filterItems([...lostItems, ...foundItems]);
    }
  };

  // Update applied filters
  const updateAppliedFilters = () => {
    const filters: string[] = [];
    
    if (selectedCategory !== "all") {
      const categoryLabel = categories.find(c => c.value === selectedCategory)?.label || selectedCategory;
      filters.push(`Category: ${categoryLabel}`);
    }
    
    if (selectedLocation !== "all") {
      const locationLabel = locations.find(l => l.value === selectedLocation)?.label || selectedLocation;
      filters.push(`Location: ${locationLabel}`);
    }
    
    if (selectedDateRange !== "all") {
      const dateRangeLabel = dateRanges.find(d => d.value === selectedDateRange)?.label || selectedDateRange;
      filters.push(`Date: ${dateRangeLabel}`);
    }
    
    setAppliedFilters(filters);
  };

  // Apply filters
  const applyFilters = () => {
    updateAppliedFilters();
    if (showMobileFilters) {
      setShowMobileFilters(false);
    }
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedLocation("all");
    setSelectedDateRange("all");
    setAppliedFilters([]);
  };

  // Handle removing a specific filter
  const removeFilter = (filter: string) => {
    if (filter.startsWith("Category:")) {
      setSelectedCategory("all");
    } else if (filter.startsWith("Location:")) {
      setSelectedLocation("all");
    } else if (filter.startsWith("Date:")) {
      setSelectedDateRange("all");
    }
    
    setAppliedFilters(appliedFilters.filter(f => f !== filter));
  };

  // Items to display
  const displayedItems = getDisplayedItems();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Browse Items</h1>
              <p className="text-gray-600">
                Search through all reported lost and found items.
              </p>
            </div>
            
            {/* Mobile filter button */}
            <Button
              variant="outline"
              className="mt-4 md:mt-0 md:hidden"
              onClick={() => setShowMobileFilters(true)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          
          {/* Search bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name, description, or details..."
                className="pl-10 py-6 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="md:flex gap-8">
            {/* Filters - Desktop */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <div className="sticky top-20 bg-white rounded-lg border p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold flex items-center">
                    <SlidersHorizontal className="h-5 w-5 mr-2" />
                    Filters
                  </h2>
                  {appliedFilters.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetFilters}
                      className="text-xs text-gray-500 hover:text-gray-900"
                    >
                      Reset
                    </Button>
                  )}
                </div>
                
                <div className="space-y-6">
                  {/* Category filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <Select 
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {categories.map((category) => (
                            <SelectItem 
                              key={category.value} 
                              value={category.value}
                            >
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Location filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <Select 
                      value={selectedLocation}
                      onValueChange={setSelectedLocation}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {locations.map((location) => (
                            <SelectItem 
                              key={location.value} 
                              value={location.value}
                            >
                              {location.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Date range filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Date</label>
                    <Select 
                      value={selectedDateRange}
                      onValueChange={setSelectedDateRange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select time period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {dateRanges.map((dateRange) => (
                            <SelectItem 
                              key={dateRange.value} 
                              value={dateRange.value}
                            >
                              {dateRange.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    className="w-full bg-lostfound-primary hover:bg-lostfound-accent"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Mobile filters slide-in */}
            {showMobileFilters && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
                <div className="absolute inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl p-6 transform transition-transform duration-300">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowMobileFilters(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Category filter */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <Select 
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {categories.map((category) => (
                              <SelectItem 
                                key={category.value} 
                                value={category.value}
                              >
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Location filter */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Location</label>
                      <Select 
                        value={selectedLocation}
                        onValueChange={setSelectedLocation}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {locations.map((location) => (
                              <SelectItem 
                                key={location.value} 
                                value={location.value}
                              >
                                {location.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Date range filter */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Date</label>
                      <Select 
                        value={selectedDateRange}
                        onValueChange={setSelectedDateRange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select time period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {dateRanges.map((dateRange) => (
                              <SelectItem 
                                key={dateRange.value} 
                                value={dateRange.value}
                              >
                                {dateRange.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex space-x-3 pt-4">
                      <Button 
                        variant="outline" 
                        className="w-1/2"
                        onClick={resetFilters}
                      >
                        Reset
                      </Button>
                      <Button 
                        className="w-1/2 bg-lostfound-primary hover:bg-lostfound-accent"
                        onClick={applyFilters}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Main content area */}
            <div className="flex-1">
              {/* Tabs */}
              <div className="bg-white rounded-lg border mb-6">
                <Tabs 
                  defaultValue="all"
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="all">All Items</TabsTrigger>
                    <TabsTrigger value="lost">Lost Items</TabsTrigger>
                    <TabsTrigger value="found">Found Items</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              {/* Applied filters */}
              {appliedFilters.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="text-sm text-gray-500">Filters:</span>
                  {appliedFilters.map((filter) => (
                    <Badge 
                      key={filter} 
                      variant="secondary"
                      className="flex items-center gap-1 px-3 py-1"
                    >
                      {filter}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeFilter(filter)}
                      />
                    </Badge>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-gray-500 hover:text-gray-900"
                    onClick={resetFilters}
                  >
                    Clear All
                  </Button>
                </div>
              )}
              
              {/* Results count */}
              <div className="mb-6">
                <p className="text-sm text-gray-500">
                  Showing {displayedItems.length} {activeTab === "all" ? "items" : activeTab === "lost" ? "lost items" : "found items"}
                </p>
              </div>
              
              {/* Items grid */}
              {displayedItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedItems.map((item) => (
                    <ItemCard key={item.id} {...item} />
                  ))}
                </div>
              ) : (
                <div className="p-10 text-center bg-white rounded-lg border">
                  <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium">No items found</h3>
                  <p className="text-gray-500 mt-2">
                    Try adjusting your filters or search terms.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BrowseItems;
