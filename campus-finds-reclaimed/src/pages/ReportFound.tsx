
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar as CalendarIcon, UploadCloud } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Form schema definition
const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  category: z.string().min(1, "Please select a category"),
  subcategory: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  foundDate: z.date({
    required_error: "Please select the date when the item was found",
  }),
  foundLocation: z.string().min(3, "Location must be at least 3 characters"),
  currentLocation: z.string().min(3, "Current location must be at least 3 characters"),
  contactName: z.string().optional(),
  contactEmail: z.string().email("Invalid email address").optional(),
  contactPhone: z.string().optional(),
  isAnonymous: z.boolean().default(false),
  turnedInToOffice: z.boolean().default(false),
});

// Categories for the form
const categories = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "accessories", label: "Accessories" },
  { value: "documents", label: "Documents" },
  { value: "keys", label: "Keys" },
  { value: "bags", label: "Bags & Luggage" },
  { value: "books", label: "Books & Stationery" },
  { value: "others", label: "Others" },
];

// Campus locations for the form
const campusLocations = [
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
  { value: "other", label: "Other Location" },
];

// Current item locations for the form
const currentLocations = [
  { value: "cs_office", label: "Turned in to CS Academic Office" },
  { value: "student_affairs", label: "Turned in to Student Affairs Office" },
  { value: "security", label: "Turned in to Security Office" },
  { value: "library_desk", label: "Turned in to Library Front Desk" },
  { value: "department", label: "With Department Secretary" },
  { value: "with_me", label: "Still with me" },
];

const ReportFound = () => {
  const { toast } = useToast();
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      isAnonymous: false,
      turnedInToOffice: false,
    },
  });

  // Handle image upload preview
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Here we would typically send the data to the server
    console.log(values);
    
    toast({
      title: "Report submitted!",
      description: "Thank you for reporting a found item.",
    });

    form.reset();
    setPreviewImage(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Report a Found Item</h1>
            <p className="text-gray-600 mb-8">
              Help reunite lost items with their owners by reporting what you've found on campus.
            </p>
            
            <Card>
              <CardHeader>
                <CardTitle>Item Details</CardTitle>
                <CardDescription>
                  Provide accurate information about the item you found to help identify the owner.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Item title */}
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Item Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Silver Watch" {...field} />
                          </FormControl>
                          <FormDescription>
                            Provide a clear, concise name for the found item.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Category selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                              </FormControl>
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Subcategory - optional */}
                      <FormField
                        control={form.control}
                        name="subcategory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subcategory (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Smartphone, Textbook" {...field} />
                            </FormControl>
                            <FormDescription>
                              Specify a subcategory if applicable.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* Description */}
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the item in detail (color, brand, distinguishing features, contents, etc.)"
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Provide a detailed description to help the owner identify their item. You can include visible identifying details, but don't reveal unique details that only the owner would know.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Image upload */}
                    <div className="space-y-2">
                      <FormLabel>Item Image (Optional)</FormLabel>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="file"
                          id="image-upload"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                          {previewImage ? (
                            <div className="mx-auto">
                              <img
                                src={previewImage}
                                alt="Preview"
                                className="mx-auto max-h-[200px] object-contain mb-2"
                              />
                              <p className="text-sm text-gray-500">
                                Click to change image
                              </p>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">
                              <UploadCloud className="h-12 w-12 text-gray-400 mb-2" />
                              <p className="text-base font-medium">
                                Click to upload an image
                              </p>
                              <p className="text-sm text-gray-500">
                                PNG, JPG, GIF up to 5MB
                              </p>
                            </div>
                          )}
                        </label>
                      </div>
                      <FormDescription>
                        Upload a clear image of the item. Please don't include personal information or unique identifiers in the photo.
                      </FormDescription>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Date found */}
                      <FormField
                        control={form.control}
                        name="foundDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date Found</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date()
                                  }
                                  initialFocus
                                  className="p-3 pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              Select the date when you found the item.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Location found */}
                      <FormField
                        control={form.control}
                        name="foundLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Where Found</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select location" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectGroup>
                                  {campusLocations.map((location) => (
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
                            <FormDescription>
                              Select the location where you found the item.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* Current item location */}
                    <FormField
                      control={form.control}
                      name="currentLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Item Location</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              // If the item was turned in to an office, set turnedInToOffice to true
                              if (value !== "with_me") {
                                form.setValue("turnedInToOffice", true);
                              } else {
                                form.setValue("turnedInToOffice", false);
                              }
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Where is the item now?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                {currentLocations.map((location) => (
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
                          <FormDescription>
                            Let others know where the item is currently located.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                      
                      <FormField
                        control={form.control}
                        name="isAnonymous"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                Submit anonymously (hide my contact details)
                              </FormLabel>
                              <FormDescription>
                                If checked, your contact information will be hidden from the public.
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      {/* Only show contact fields if not anonymous and the item is still with the finder */}
                      {!form.watch("isAnonymous") && !form.watch("turnedInToOffice") && (
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="contactName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Your Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="contactEmail"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email Address</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="email"
                                      placeholder="your.email@university.edu"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="contactPhone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone Number (Optional)</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="tel"
                                      placeholder="+92 XXX XXXXXXX"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <CardFooter className="flex justify-end px-0 pb-0">
                      <Button type="submit" className="bg-lostfound-primary hover:bg-lostfound-accent">
                        Submit Report
                      </Button>
                    </CardFooter>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReportFound;
