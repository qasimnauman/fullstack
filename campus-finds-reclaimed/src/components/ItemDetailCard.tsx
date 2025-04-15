
import React from "react";
import { CalendarClock, MapPin, User, Calendar, Info, Phone, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface ItemDetailProps {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  location: string;
  dateLost: string;
  dateReported: string;
  image?: string;
  status: "lost" | "found";
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  isAnonymous: boolean;
}

const ItemDetailCard = ({
  id,
  title,
  description,
  category,
  subcategory,
  location,
  dateLost,
  dateReported,
  image,
  status,
  contactName,
  contactEmail,
  contactPhone,
  isAnonymous,
}: ItemDetailProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden border">
      <div className="md:flex">
        <div className="md:w-1/2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">{title}</h2>
            <Badge 
              className={cn(
                status === "lost" ? "bg-red-500" : "bg-green-500"
              )}
            >
              {status === "lost" ? "Lost" : "Found"}
            </Badge>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Description</h3>
              <p className="mt-1">{description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Category</h3>
                <p className="mt-1">{category}</p>
                {subcategory && (
                  <p className="text-sm text-gray-500">{subcategory}</p>
                )}
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                <div className="mt-1 flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                  <span>{location}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  {status === "lost" ? "Date Lost" : "Date Found"}
                </h3>
                <div className="mt-1 flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                  <span>{dateLost}</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Reported On</h3>
                <div className="mt-1 flex items-center">
                  <CalendarClock className="h-4 w-4 mr-1 text-gray-400" />
                  <span>{dateReported}</span>
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">Contact Information</h3>
            
            {isAnonymous ? (
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Info className="h-5 w-5 mr-2 text-lostfound-primary" />
                <p className="text-sm">
                  This item was reported anonymously. Please use the claim button below to contact.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {contactName && (
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{contactName}</span>
                  </div>
                )}
                
                {contactEmail && (
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{contactEmail}</span>
                  </div>
                )}
                
                {contactPhone && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{contactPhone}</span>
                  </div>
                )}
              </div>
            )}
            
            <div className="mt-6">
              <Button className="w-full bg-lostfound-primary hover:bg-lostfound-accent">
                {status === "found" ? "Claim This Item" : "I Found This Item"}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="md:w-1/2">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-gray-100 text-gray-400">
              No Image Available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetailCard;
