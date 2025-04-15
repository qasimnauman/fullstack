
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ItemCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  image?: string;
  status: "lost" | "found";
  className?: string;
}

const ItemCard = ({
  id,
  title,
  description,
  category,
  location,
  date,
  image,
  status,
  className,
}: ItemCardProps) => {
  return (
    <div className={cn(
      "item-card rounded-lg overflow-hidden border bg-white",
      className
    )}>
      <div className="relative">
        <div className="aspect-[4/3] bg-gray-100">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>
        <Badge 
          className={cn(
            "absolute top-2 right-2",
            status === "lost" ? "bg-red-500" : "bg-green-500"
          )}
        >
          {status === "lost" ? "Lost" : "Found"}
        </Badge>
      </div>
      <div className="p-4">
        <Badge variant="outline" className="mb-2">
          {category}
        </Badge>
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
        
        <div className="space-y-1.5">
          <div className="flex items-center text-xs text-gray-500">
            <MapPin className="h-3 w-3 mr-1" />
            <span className="truncate">{location}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{date}</span>
          </div>
        </div>
        
        <Link 
          to={`/items/${id}`} 
          className="mt-4 flex items-center justify-end text-sm text-lostfound-primary font-medium"
        >
          View Details
          <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;
