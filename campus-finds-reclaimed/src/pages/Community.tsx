
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MessageSquare, User, Clock, ThumbsUp, MoreHorizontal, Send, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Post form schema
const postFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  content: z.string().min(10, "Post content must be at least 10 characters"),
});

// Comment form schema
const commentFormSchema = z.object({
  comment: z.string().min(1, "Comment cannot be empty"),
});

// Sample data for forum posts
const initialPosts = [
  {
    id: "1",
    title: "Lost my calculator during Calculus exam",
    content:
      "I lost my TI-84 Plus graphing calculator during the Calculus final exam yesterday in room 305. It has my name written on the back. I really need it for my upcoming Physics exam. Has anyone seen it?",
    author: {
      id: "user1",
      name: "Fatima Zaidi",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256&q=80",
    },
    timestamp: "2025-04-06T10:30:00",
    likes: 5,
    comments: [
      {
        id: "c1",
        content:
          "I think I saw a calculator in the Math department office. They keep found items there. Maybe check with them?",
        author: {
          id: "user2",
          name: "Hassan Ahmed",
          avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=256&h=256&q=80",
        },
        timestamp: "2025-04-06T11:15:00",
        likes: 2,
      },
      {
        id: "c2",
        content:
          "I lost mine last semester too. Have you checked with the exam proctor?",
        author: {
          id: "user3",
          name: "Aisha Khan",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=256&h=256&q=80",
        },
        timestamp: "2025-04-06T12:40:00",
        likes: 0,
      },
    ],
  },
  {
    id: "2",
    title: "Found a set of keys at the basketball court",
    content:
      "I found a keychain with several keys at the basketball court near the Sports Complex around 6 PM today. It has a small blue carabiner and what looks like dorm keys and maybe a car key. If they're yours, please describe them in detail and I'll make sure you get them back!",
    author: {
      id: "user4",
      name: "Ibrahim Malik",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&h=256&q=80",
    },
    timestamp: "2025-04-05T18:45:00",
    likes: 12,
    comments: [
      {
        id: "c3",
        content:
          "You should turn those in to Campus Security. They maintain the official lost and found system.",
        author: {
          id: "user5",
          name: "Zain Abbas",
          avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=256&h=256&q=80",
        },
        timestamp: "2025-04-05T19:10:00",
        likes: 8,
      },
      {
        id: "c4",
        content:
          "I lost my keys yesterday but mine had a red keychain. Thanks for posting though!",
        author: {
          id: "user6",
          name: "Sana Asif",
          avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=256&h=256&q=80",
        },
        timestamp: "2025-04-05T20:25:00",
        likes: 1,
      },
      {
        id: "c5",
        content:
          "Could be my roommate's keys. He lost his yesterday and they have a blue clip. I'll ask him to contact you.",
        author: {
          id: "user7",
          name: "Ali Raza",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=256&h=256&q=80",
        },
        timestamp: "2025-04-06T09:15:00",
        likes: 3,
      },
    ],
  },
  {
    id: "3",
    title: "Has anyone seen a black leather wallet?",
    content:
      "I lost my wallet somewhere between the library and cafeteria today around noon. It's a black leather bifold with my student ID and bank cards inside. If found, please let me know ASAP as I've already had to freeze my cards. There's also a family photo that has sentimental value.",
    author: {
      id: "user8",
      name: "Tariq Mahmood",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=256&h=256&q=80",
    },
    timestamp: "2025-04-04T13:20:00",
    likes: 7,
    comments: [],
  },
];

const Community = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const { toast } = useToast();

  const postForm = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const commentForm = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      comment: "",
    },
  });

  // Handle creating a new post
  const onCreatePost = (values: z.infer<typeof postFormSchema>) => {
    const newPost = {
      id: `post-${Date.now()}`,
      title: values.title,
      content: values.content,
      author: {
        id: "current-user",
        name: "You",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=256&h=256&q=80",
      },
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setNewPostOpen(false);
    postForm.reset();

    toast({
      title: "Post created",
      description: "Your post has been published to the community forum.",
    });
  };

  // Handle adding a comment to a post
  const onAddComment = (postId: string) => {
    const commentText = commentForm.getValues("comment");

    if (!commentText.trim()) return;

    const newComment = {
      id: `comment-${Date.now()}`,
      content: commentText,
      author: {
        id: "current-user",
        name: "You",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=256&h=256&q=80",
      },
      timestamp: new Date().toISOString(),
      likes: 0,
    };

    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment],
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    setReplyingTo(null);
    commentForm.reset();

    toast({
      description: "Your comment has been posted.",
    });
  };

  // Handle liking a post
  const handleLikePost = (postId: string) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.likes + 1,
        };
      }
      return post;
    });

    setPosts(updatedPosts);
  };

  // Handle liking a comment
  const handleLikeComment = (postId: string, commentId: string) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedComments = post.comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              likes: comment.likes + 1,
            };
          }
          return comment;
        });

        return {
          ...post,
          comments: updatedComments,
        };
      }
      return post;
    });

    setPosts(updatedPosts);
  };

  // Format relative time
  const getRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) {
      return "just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
    } else if (diffInMinutes < 24 * 60) {
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
    } else {
      return format(date, "MMM d, yyyy");
    }
  };

  // Delete a post
  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter((post) => post.id !== postId));
    
    toast({
      description: "Your post has been deleted.",
    });
  };

  // Report content
  const handleReport = (type: "post" | "comment", id: string) => {
    toast({
      title: "Report submitted",
      description: "Thank you for reporting this content. Our moderators will review it.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="flex items-center text-3xl font-bold mb-2">
                  <MessageSquare className="h-7 w-7 mr-2 text-lostfound-primary" />
                  Community Forum
                </h1>
                <p className="text-gray-600">
                  Ask for help finding lost items or connect with others about found items.
                </p>
              </div>

              <Dialog open={newPostOpen} onOpenChange={setNewPostOpen}>
                <DialogTrigger asChild>
                  <Button className="mt-4 md:mt-0 bg-lostfound-primary hover:bg-lostfound-accent">
                    Create New Post
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create a New Post</DialogTitle>
                    <DialogDescription>
                      Share details about a lost or found item or ask for help from the community.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...postForm}>
                    <form onSubmit={postForm.handleSubmit(onCreatePost)} className="space-y-4">
                      <FormField
                        control={postForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Post Title"
                                {...field}
                                className="text-base"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={postForm.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                placeholder="Describe your lost or found item, or ask for help..."
                                className="min-h-[120px] text-base"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Be specific with details to increase the chance of finding your item.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button
                          type="submit"
                          className="bg-lostfound-primary hover:bg-lostfound-accent"
                        >
                          Publish Post
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="bg-white rounded-lg border p-6 mb-6">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=256&h=256&q=80" alt="User" />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
                <div 
                  className="flex-1 p-3 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={() => setNewPostOpen(true)}
                >
                  <p className="text-gray-500">Create a post or ask for help...</p>
                </div>
              </div>
            </div>

            {/* Community guidelines */}
            <Card className="mb-6 border-lostfound-tertiary">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-lostfound-primary" />
                  Community Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="text-lostfound-primary mr-2">•</span>
                    <span>Be respectful and constructive in your interactions.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lostfound-primary mr-2">•</span>
                    <span>Don't share personal contact information publicly.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lostfound-primary mr-2">•</span>
                    <span>For high-value items, consider using the formal reporting system.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Forum posts */}
            <div className="space-y-6">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={post.author.avatar} alt={post.author.name} />
                            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{post.title}</CardTitle>
                            <div className="flex items-center text-sm text-gray-500">
                              <User className="h-3.5 w-3.5 mr-1" />
                              <span>{post.author.name}</span>
                              <span className="mx-2">•</span>
                              <Clock className="h-3.5 w-3.5 mr-1" />
                              <span>{getRelativeTime(post.timestamp)}</span>
                            </div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {post.author.id === "current-user" ? (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <DropdownMenuItem 
                                    onSelect={(e) => e.preventDefault()}
                                    className="text-destructive"
                                  >
                                    Delete
                                  </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will permanently delete your post and all associated comments.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleDeletePost(post.id)}
                                      className="bg-destructive hover:bg-destructive/90"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            ) : (
                              <DropdownMenuItem 
                                onClick={() => handleReport("post", post.id)}
                              >
                                Report
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base">{post.content}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between py-3 border-t">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex items-center text-gray-500 hover:text-lostfound-primary"
                        onClick={() => handleLikePost(post.id)}
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {post.likes > 0 && <span>{post.likes}</span>}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex items-center text-gray-500 hover:text-lostfound-primary"
                        onClick={() => setReplyingTo(post.id)}
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {post.comments.length > 0 && <span>{post.comments.length}</span>}
                      </Button>
                    </CardFooter>

                    {/* Comments Section */}
                    {(post.comments.length > 0 || replyingTo === post.id) && (
                      <div className="px-6 py-3 bg-gray-50">
                        {post.comments.length > 0 && (
                          <div className="space-y-4 mb-4">
                            {post.comments.map((comment) => (
                              <div key={comment.id} className="relative pl-6 border-l-2 border-gray-200">
                                <div className="flex justify-between items-start mb-1">
                                  <div className="flex items-center">
                                    <Avatar className="h-6 w-6 mr-2">
                                      <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                                      <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <span className="text-sm font-medium">{comment.author.name}</span>
                                      <span className="mx-1.5 text-gray-500">•</span>
                                      <span className="text-xs text-gray-500">{getRelativeTime(comment.timestamp)}</span>
                                    </div>
                                  </div>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                                        <MoreHorizontal className="h-3 w-3" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem 
                                        onClick={() => handleReport("comment", comment.id)}
                                      >
                                        Report
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                                <p className="text-sm mb-2">{comment.content}</p>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 px-2 text-xs text-gray-500 hover:text-lostfound-primary"
                                  onClick={() => handleLikeComment(post.id, comment.id)}
                                >
                                  <ThumbsUp className="h-3 w-3 mr-1" />
                                  {comment.likes > 0 && <span>{comment.likes}</span>}
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Add comment form */}
                        {replyingTo === post.id && (
                          <Form {...commentForm}>
                            <form 
                              onSubmit={(e) => {
                                e.preventDefault();
                                commentForm.handleSubmit(() => onAddComment(post.id))();
                              }}
                              className="space-y-3"
                            >
                              <FormField
                                control={commentForm.control}
                                name="comment"
                                render={({ field }) => (
                                  <FormItem>
                                    <div className="flex">
                                      <Avatar className="h-8 w-8 mr-2">
                                        <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=256&h=256&q=80" alt="You" />
                                        <AvatarFallback>YO</AvatarFallback>
                                      </Avatar>
                                      <FormControl>
                                        <div className="flex-1 relative">
                                          <Textarea
                                            placeholder="Write a comment..."
                                            className="pr-10 resize-none min-h-[60px] text-sm"
                                            {...field}
                                          />
                                          <Button 
                                            type="submit"
                                            size="icon" 
                                            className="absolute right-2 bottom-2 h-6 w-6 rounded-full bg-lostfound-primary hover:bg-lostfound-accent text-white"
                                          >
                                            <Send className="h-3.5 w-3.5" />
                                          </Button>
                                        </div>
                                      </FormControl>
                                    </div>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </form>
                          </Form>
                        )}

                        {/* Show comment form button */}
                        {replyingTo !== post.id && (
                          <Button 
                            variant="ghost" 
                            className="text-sm text-lostfound-primary hover:text-lostfound-accent" 
                            onClick={() => setReplyingTo(post.id)}
                          >
                            Add a comment...
                          </Button>
                        )}
                      </div>
                    )}
                  </Card>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border">
                  <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium">No posts yet</h3>
                  <p className="text-gray-500 mt-2 mb-6">
                    Be the first to create a post in the community forum.
                  </p>
                  <Button
                    onClick={() => setNewPostOpen(true)}
                    className="bg-lostfound-primary hover:bg-lostfound-accent"
                  >
                    Create First Post
                  </Button>
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

export default Community;
