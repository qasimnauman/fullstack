
import React from "react";
import { Link } from "react-router-dom";
import { Search, FileText, Upload, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ItemCard from "@/components/ItemCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Sample data for recently reported items
const recentItems = [
  {
    id: "1",
    title: "Black Laptop Bag",
    description: "Found a black laptop bag with a Dell charger inside near the Science Building.",
    category: "Electronics",
    location: "Science Building",
    date: "April 5, 2025",
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1974&auto=format&fit=crop",
    status: "found" as const,
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
    title: "Blue Water Bottle",
    description: "Found a blue Hydro Flask water bottle at the soccer field yesterday evening.",
    category: "Accessories",
    location: "Sports Complex",
    date: "April 3, 2025",
    image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=1758&auto=format&fit=crop",
    status: "found" as const,
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
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-lostfound-primary to-lostfound-accent text-white py-16 md:py-24">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Find What's Lost, Return What's Found
            </h1>
            <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto opacity-90">
              A centralized platform for university students to report, search, and claim lost items in real time.
            </p>
            
            <div className="max-w-2xl mx-auto bg-white rounded-full p-1.5 flex items-center shadow-xl">
              <Input
                type="text"
                placeholder="Search for lost or found items..."
                className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full bg-transparent px-4"
              />
              <Button className="rounded-full bg-lostfound-primary hover:bg-lostfound-accent">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mt-12">
              <Link to="/lost">
                <Button className="hero-button bg-white text-lostfound-primary hover:bg-opacity-90">
                  Report Lost Item
                </Button>
              </Link>
              <Link to="/found">
                <Button className="hero-button bg-lostfound-accent text-white hover:bg-opacity-90">
                  Report Found Item
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              How Campus Finds Works
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg text-center shadow-sm">
                <div className="w-16 h-16 bg-lostfound-tertiary rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-lostfound-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Report</h3>
                <p className="text-gray-600">
                  Submit details about an item you've lost or found on campus through our simple form.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg text-center shadow-sm">
                <div className="w-16 h-16 bg-lostfound-tertiary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-lostfound-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Search</h3>
                <p className="text-gray-600">
                  Browse through reported items or search with filters to find what you're looking for.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg text-center shadow-sm">
                <div className="w-16 h-16 bg-lostfound-tertiary rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-lostfound-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Claim</h3>
                <p className="text-gray-600">
                  Verify ownership, get notified, and arrange to retrieve your belongings securely.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Recent Items Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Recently Reported Items</h2>
              <Link to="/browse" className="text-lostfound-primary font-medium flex items-center hover:underline">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {recentItems.map((item) => (
                <ItemCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-lostfound-tertiary">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-12">Making a Difference on Campus</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-lostfound-accent mb-2">94%</div>
                <p className="text-gray-600">Recovery rate for reported items</p>
              </div>
              
              <div>
                <div className="text-4xl font-bold text-lostfound-accent mb-2">1,250+</div>
                <p className="text-gray-600">Items recovered this semester</p>
              </div>
              
              <div>
                <div className="text-4xl font-bold text-lostfound-accent mb-2">800+</div>
                <p className="text-gray-600">Active student users</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-lostfound-primary text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Find Your Lost Item?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Join our university community platform and recover your belongings faster.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/browse">
                <Button className="hero-button bg-white text-lostfound-primary hover:bg-opacity-90">
                  Browse Items
                </Button>
              </Link>
              <Link to="/register">
                <Button className="hero-button bg-lostfound-accent text-white hover:bg-opacity-90">
                  Sign Up Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
