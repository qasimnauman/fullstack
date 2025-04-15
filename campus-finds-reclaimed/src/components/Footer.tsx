
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-lostfound-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold">LF</span>
              </div>
              <span className="text-xl font-bold">Campus Finds</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              A centralized platform for university students to report, search, and claim lost items in real time.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Quick Links</h3>
            <div className="mt-4 space-y-2">
              <Link to="/lost" className="block text-sm text-gray-600 hover:text-lostfound-primary">Report Lost Item</Link>
              <Link to="/found" className="block text-sm text-gray-600 hover:text-lostfound-primary">Report Found Item</Link>
              <Link to="/browse" className="block text-sm text-gray-600 hover:text-lostfound-primary">Browse Items</Link>
              <Link to="/forum" className="block text-sm text-gray-600 hover:text-lostfound-primary">Community Forum</Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Contact</h3>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Air University, E-9, Islamabad</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                <span>support@campusfinds.com</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                <span>+92 123 456 7890</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Campus Finds. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-lostfound-primary">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-lostfound-primary">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-lostfound-primary">
                FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
