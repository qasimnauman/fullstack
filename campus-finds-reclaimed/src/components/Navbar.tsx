
import React from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between py-4 mx-auto">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-lostfound-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold">LF</span>
          </div>
          <span className="text-xl font-bold">Campus Finds</span>
        </Link>

        {/* Search bar - desktop */}
        <div className="hidden md:flex items-center px-3 py-1.5 bg-gray-100 rounded-full flex-1 max-w-md mx-4">
          <Search className="w-4 h-4 mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search for lost or found items..."
            className="w-full bg-transparent border-none outline-none placeholder:text-gray-500 text-sm"
          />
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/lost" className="text-sm font-medium hover:text-lostfound-primary transition-colors">
            Report Lost
          </Link>
          <Link to="/found" className="text-sm font-medium hover:text-lostfound-primary transition-colors">
            Report Found
          </Link>
          <Link to="/browse" className="text-sm font-medium hover:text-lostfound-primary transition-colors">
            Browse Items
          </Link>
          <Link to="/forum" className="text-sm font-medium hover:text-lostfound-primary transition-colors">
            Community
          </Link>

          {/* Mock user menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link to="/login" className="flex items-center w-full">
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Login / Sign Up</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-6 space-y-4 border-t animate-fade-in">
          <div className="flex items-center px-3 py-1.5 bg-gray-100 rounded-full">
            <Search className="w-4 h-4 mr-2 text-gray-500" />
            <input
              type="text"
              placeholder="Search for lost or found items..."
              className="w-full bg-transparent border-none outline-none placeholder:text-gray-500 text-sm"
            />
          </div>
          
          <nav className="flex flex-col space-y-3">
            <Link 
              to="/lost" 
              className="text-sm font-medium p-2 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Report Lost
            </Link>
            <Link 
              to="/found" 
              className="text-sm font-medium p-2 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Report Found
            </Link>
            <Link 
              to="/browse" 
              className="text-sm font-medium p-2 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Items
            </Link>
            <Link 
              to="/forum" 
              className="text-sm font-medium p-2 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
            <Link 
              to="/login" 
              className="text-sm font-medium p-2 hover:bg-gray-100 rounded-md flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Login / Sign Up
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
