import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, Clock, Reply, MoreVertical, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  replyTo?: string;
  likes: number;
  isLiked: boolean;
}

interface Discussion {
  id: string;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  messages: Message[];
}

// Mock data - in a real app this would come from an API
const mockDiscussions: { [key: string]: Discussion } = {
  "1": {
    id: "1",
    title: "Design System Guidelines",
    author: {
      name: "Sarah Chen",
      avatar: "",
    },
    messages: [
      {
        id: "1",
        author: { name: "Sarah Chen", avatar: "" },
        content: "Let's discuss the design system guidelines for our project. What are your thoughts on the color palette?",
        timestamp: "2 days ago",
        likes: 3,
        isLiked: false,
      },
      {
        id: "2",
        author: { name: "John Doe", avatar: "" },
        content: "I think the current colors work well, but we might want to add a few more accent colors for variety.",
        timestamp: "2 days ago",
        replyTo: "1",
        likes: 1,
        isLiked: false,
      },
      {
        id: "3",
        author: { name: "Mike Wilson", avatar: "" },
        content: "Agreed. Also, should we define spacing guidelines?",
        timestamp: "1 day ago",
        replyTo: "2",
        likes: 2,
        isLiked: true,
      },
      {
        id: "4",
        author: { name: "Sarah Chen", avatar: "" },
        content: "Good point, Mike. Let's create a comprehensive spacing scale.",
        timestamp: "2 hours ago",
        replyTo: "3",
        likes: 0,
        isLiked: false,
      },
    ],
  },
  "2": {
    id: "2",
    title: "API Integration Strategy",
    author: {
      name: "Alex Johnson",
      avatar: "",
    },
    messages: [
      {
        id: "1",
        author: { name: "Alex Johnson", avatar: "" },
        content: "How should we approach the API integration for the user authentication flow?",
        timestamp: "3 days ago",
        likes: 2,
        isLiked: false,
      },
      {
        id: "2",
        author: { name: "Jane Smith", avatar: "" },
        content: "I suggest we use JWT tokens for authentication and implement refresh token logic.",
        timestamp: "2 days ago",
        replyTo: "1",
        likes: 4,
        isLiked: true,
      },
      {
        id: "3",
        author: { name: "Alex Johnson", avatar: "" },
        content: "That sounds good. We should also implement proper error handling for failed requests.",
        timestamp: "1 day ago",
        replyTo: "2",
        likes: 1,
        isLiked: false,
      },
    ],
  },
  "3": {
    id: "3",
    title: "Testing Strategy",
    author: {
      name: "Emma Davis",
      avatar: "",
    },
    messages: [
      {
        id: "1",
        author: { name: "Emma Davis", avatar: "" },
        content: "What's our approach to testing for this project? Should we focus on unit tests, integration tests, or both?",
        timestamp: "4 days ago",
        likes: 1,
        isLiked: false,
      },
      {
        id: "2",
        author: { name: "Tom Brown", avatar: "" },
        content: "I think we should have a mix of both. Unit tests for individual components and integration tests for user flows.",
        timestamp: "3 days ago",
        replyTo: "1",
        likes: 2,
        isLiked: false,
      },
    ],
  },
};

export default function DiscussionDetail() {
  const { projectId, discussionId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [newReply, setNewReply] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const discussion = discussionId ? mockDiscussions[discussionId] : null;
  const [messages, setMessages] = useState<Message[]>(discussion?.messages || []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendReply = () => {
    if (newReply.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        author: { name: "You", avatar: "" },
        content: newReply.trim(),
        timestamp: "just now",
        replyTo: replyingTo || undefined,
        likes: 0,
        isLiked: false,
      };

      setMessages(prev => [...prev, newMessage]);
      setNewReply("");
      setReplyingTo(null);
      toast({
        title: "Message sent",
        description: "Your message has been posted to the discussion.",
      });
    }
  };

  const handleLikeMessage = (messageId: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, isLiked: !msg.isLiked, likes: msg.isLiked ? msg.likes - 1 : msg.likes + 1 }
          : msg
      )
    );
  };

  const handleReplyToMessage = (messageId: string, authorName: string) => {
    setReplyingTo(messageId);
    setNewReply(`@${authorName} `);
  };

  const getRepliedMessage = (replyToId: string) => {
    return messages.find(msg => msg.id === replyToId);
  };

  if (!discussion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Discussion Not Found</h2>
          <p className="text-muted-foreground mb-4">The discussion you're looking for doesn't exist.</p>
          <Button onClick={() => navigate(`/project/${projectId}`)}>
            Back to Project
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/project/${projectId}`)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Project
          </Button>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{discussion.title}</CardTitle>
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={discussion.author.avatar} />
                  <AvatarFallback className="text-xs">
                    {discussion.author.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">
                  Started by {discussion.author.name}
                </span>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Messages */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="space-y-6 max-h-[600px] overflow-y-auto">
              {messages.map((message) => (
                <div key={message.id} className="space-y-2">
                  {/* Replied Message Preview */}
                  {message.replyTo && (
                    <div className="ml-14 mb-2">
                      {(() => {
                        const repliedMsg = getRepliedMessage(message.replyTo);
                        return repliedMsg ? (
                          <div className="bg-muted/30 border-l-2 border-primary/30 pl-3 py-2 rounded-r-md">
                            <div className="flex items-center space-x-1 mb-1">
                              <Reply className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                Replying to {repliedMsg.author.name}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {repliedMsg.content}
                            </p>
                          </div>
                        ) : null;
                      })()}
                    </div>
                  )}
                  
                  <div className="flex space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={message.author.avatar} />
                      <AvatarFallback className="text-sm">
                        {message.author.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">
                            {message.author.name}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            {message.timestamp}
                          </span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <MoreVertical className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm text-foreground">{message.content}</p>
                      </div>
                      
                      {/* Message Actions */}
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLikeMessage(message.id)}
                          className={`h-auto p-1 ${message.isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
                        >
                          <Heart className={`h-4 w-4 mr-1 ${message.isLiked ? 'fill-current' : ''}`} />
                          <span className="text-xs">{message.likes}</span>
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReplyToMessage(message.id, message.author.name)}
                          className="h-auto p-1 text-muted-foreground hover:text-foreground"
                        >
                          <Reply className="h-4 w-4 mr-1" />
                          <span className="text-xs">Reply</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
        </Card>

        {/* Reply Box */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">
                  {replyingTo ? "Reply to Message" : "Reply to Discussion"}
                </h3>
                {replyingTo && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setReplyingTo(null);
                      setNewReply("");
                    }}
                  >
                    Cancel Reply
                  </Button>
                )}
              </div>
              
              {replyingTo && (
                <div className="bg-muted/30 border-l-2 border-primary/30 pl-3 py-2 rounded-r-md">
                  <div className="flex items-center space-x-1 mb-1">
                    <Reply className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Replying to message
                    </span>
                  </div>
                  {(() => {
                    const repliedMsg = getRepliedMessage(replyingTo);
                    return repliedMsg ? (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {repliedMsg.content}
                      </p>
                    ) : null;
                  })()}
                </div>
              )}
              
              <Textarea
                placeholder={replyingTo ? "Write your reply..." : "Write your message..."}
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                rows={4}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                    handleSendReply();
                  }
                }}
              />
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Press Ctrl+Enter to send
                </span>
                <Button
                  onClick={handleSendReply}
                  className="bg-gradient-primary text-white hover:opacity-90"
                  disabled={!newReply.trim()}
                >
                  <Send className="mr-2 h-4 w-4" />
                  {replyingTo ? "Send Reply" : "Send Message"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}