
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ItemDetailCard from "@/components/ItemDetailCard";
import { Button } from "@/components/ui/button";

// Combined sample data for both lost and found items
const allItems = [
  {
    id: "1",
    title: "MacBook Pro 13-inch",
    description: "Lost my silver MacBook Pro with stickers on the cover in the library, 3rd floor study area. It has a black case and the power button is a bit finicky. I was last using it around 3PM and left for a coffee break. When I returned at 3:30PM, it was gone. It contains important study materials and projects that I need for my finals. If found, please contact me as soon as possible.",
    category: "Electronics",
    subcategory: "Laptop",
    location: "University Library, 3rd Floor",
    dateLost: "April 5, 2025",
    dateReported: "April 5, 2025",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1626&auto=format&fit=crop",
    status: "lost" as const,
    contactName: "Ahmed Khan",
    contactEmail: "ahmed.khan@university.edu",
    contactPhone: "+92 300 1234567",
    isAnonymous: false
  },
  {
    id: "2",
    title: "Student ID Card",
    description: "Lost my student ID card somewhere in the library on Monday afternoon. It's a blue university ID card with my photo and student number AB12345. I need it for access to the dorms and to check out books. Last used it at the library's self-checkout kiosk around 2:30 PM.",
    category: "Documents",
    subcategory: "ID Card",
    location: "University Library",
    dateLost: "April 4, 2025",
    dateReported: "April 4, 2025",
    status: "lost" as const,
    contactName: "Sarah Ahmad",
    contactEmail: "sarah.a@university.edu",
    isAnonymous: false
  },
  {
    id: "7",
    title: "Black Laptop Bag",
    description: "Found a black laptop bag with a Dell charger inside near the Science Building entrance. It was sitting on one of the benches outside the main doors. There are also some notebooks and a pencil case inside. I've turned it in to the CS Academic Office for safekeeping.",
    category: "Electronics",
    subcategory: "Accessories",
    location: "Science Building, Main Entrance",
    dateLost: "April 5, 2025",
    dateReported: "April 5, 2025",
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1974&auto=format&fit=crop",
    status: "found" as const,
    isAnonymous: true
  },
  {
    id: "9",
    title: "Blue Water Bottle",
    description: "Found a blue Hydro Flask water bottle at the soccer field yesterday evening after the intramural games. It has a few stickers on it including one for the University Engineering department. I currently have it with me and can arrange to return it to the owner.",
    category: "Accessories",
    subcategory: "Water Bottle",
    location: "Sports Complex, Soccer Field",
    dateLost: "April 3, 2025",
    dateReported: "April 3, 2025",
    image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=1758&auto=format&fit=crop",
    status: "found" as const,
    contactName: "Mohammad Ali",
    contactEmail: "mohammad.ali@university.edu",
    contactPhone: "+92 333 7654321",
    isAnonymous: false
  }
];

const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find the item with the matching id
  const item = allItems.find((item) => item.id === id);
  
  // If item not found, show error
  if (!item) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1 py-12 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <Link 
                to="/browse" 
                className="inline-flex items-center text-lostfound-primary hover:underline mb-6"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Browse
              </Link>
              
              <div className="bg-white rounded-lg border p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Item Not Found</h2>
                <p className="text-gray-600 mb-6">
                  Sorry, the item you're looking for doesn't exist or may have been removed.
                </p>
                <Button 
                  asChild 
                  className="bg-lostfound-primary hover:bg-lostfound-accent"
                >
                  <Link to="/browse">Browse Items</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap justify-between items-center mb-6">
              <Link 
                to="/browse" 
                className="inline-flex items-center text-lostfound-primary hover:underline"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Browse
              </Link>
              
              {/* Additional actions could go here */}
            </div>
            
            <ItemDetailCard {...item} />
            
            {/* Related Items (could be added in the future) */}
            {/* <div className="mt-12">
              <h3 className="text-xl font-bold mb-6">Similar Items</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                 Related item cards would go here 
              </div>
            </div> */}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ItemDetail;
