import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Discussion {
  id: string;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  lastMessage: string;
  lastMessageTime: string;
  replyCount: number;
  messages: Message[];
}

interface Message {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
}

interface DiscussionsTabProps {
  projectId: string;
}

const mockDiscussions: Discussion[] = [
  {
    id: "1",
    title: "Design System Guidelines",
    author: {
      name: "Sarah Chen",
      avatar: "",
    },
    lastMessage: "I think we should stick with the current color palette...",
    lastMessageTime: "2 hours ago",
    replyCount: 5,
    messages: [
      {
        id: "1",
        author: { name: "Sarah Chen", avatar: "" },
        content: "Let's discuss the design system guidelines for our project. What are your thoughts on the color palette?",
        timestamp: "2 days ago",
      },
      {
        id: "2",
        author: { name: "John Doe", avatar: "" },
        content: "I think the current colors work well, but we might want to add a few more accent colors for variety.",
        timestamp: "2 days ago",
      },
      {
        id: "3",
        author: { name: "Mike Wilson", avatar: "" },
        content: "Agreed. Also, should we define spacing guidelines?",
        timestamp: "1 day ago",
      },
      {
        id: "4",
        author: { name: "Sarah Chen", avatar: "" },
        content: "Good point, Mike. Let's create a comprehensive spacing scale.",
        timestamp: "2 hours ago",
      },
    ],
  },
  {
    id: "2",
    title: "API Integration Strategy",
    author: {
      name: "Alex Johnson",
      avatar: "",
    },
    lastMessage: "We should implement proper error handling...",
    lastMessageTime: "1 day ago",
    replyCount: 3,
    messages: [
      {
        id: "1",
        author: { name: "Alex Johnson", avatar: "" },
        content: "How should we approach the API integration for the user authentication flow?",
        timestamp: "3 days ago",
      },
      {
        id: "2",
        author: { name: "Jane Smith", avatar: "" },
        content: "I suggest we use JWT tokens for authentication and implement refresh token logic.",
        timestamp: "2 days ago",
      },
      {
        id: "3",
        author: { name: "Alex Johnson", avatar: "" },
        content: "That sounds good. We should also implement proper error handling for failed requests.",
        timestamp: "1 day ago",
      },
    ],
  },
  {
    id: "3",
    title: "Testing Strategy",
    author: {
      name: "Emma Davis",
      avatar: "",
    },
    lastMessage: "Unit tests should cover at least 80% of the codebase",
    lastMessageTime: "3 days ago",
    replyCount: 2,
    messages: [
      {
        id: "1",
        author: { name: "Emma Davis", avatar: "" },
        content: "What's our approach to testing for this project? Should we focus on unit tests, integration tests, or both?",
        timestamp: "4 days ago",
      },
      {
        id: "2",
        author: { name: "Tom Brown", avatar: "" },
        content: "I think we should have a mix of both. Unit tests for individual components and integration tests for user flows.",
        timestamp: "3 days ago",
      },
    ],
  },
];

export function DiscussionsTab({ projectId }: DiscussionsTabProps) {
  const navigate = useNavigate();
  const [discussions, setDiscussions] = useState<Discussion[]>(mockDiscussions);
  const [isNewThreadOpen, setIsNewThreadOpen] = useState(false);
  const [newThreadData, setNewThreadData] = useState({
    title: "",
    content: "",
  });

  const handleSelectDiscussion = (discussion: Discussion) => {
    navigate(`/project/${projectId}/discussion/${discussion.id}`);
  };


  const handleCreateThread = () => {
    if (newThreadData.title.trim() && newThreadData.content.trim()) {
      const newDiscussion: Discussion = {
        id: Date.now().toString(),
        title: newThreadData.title,
        author: { name: "You", avatar: "" },
        lastMessage: newThreadData.content,
        lastMessageTime: "just now",
        replyCount: 0,
        messages: [
          {
            id: "1",
            author: { name: "You", avatar: "" },
            content: newThreadData.content,
            timestamp: "just now",
          },
        ],
      };

      setDiscussions(prev => [newDiscussion, ...prev]);
      setNewThreadData({ title: "", content: "" });
      setIsNewThreadOpen(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Discussions</h3>
        <Dialog open={isNewThreadOpen} onOpenChange={setIsNewThreadOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-gradient-primary text-white hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" />
              New Thread
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Start New Discussion</DialogTitle>
              <DialogDescription>
                Create a new discussion thread for your team.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="thread-title">Title</Label>
                <Input
                  id="thread-title"
                  placeholder="Discussion title"
                  value={newThreadData.title}
                  onChange={(e) =>
                    setNewThreadData(prev => ({ ...prev, title: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="thread-content">Initial Message</Label>
                <Textarea
                  id="thread-content"
                  placeholder="Start the discussion..."
                  value={newThreadData.content}
                  onChange={(e) =>
                    setNewThreadData(prev => ({ ...prev, content: e.target.value }))
                  }
                  rows={4}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsNewThreadOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateThread}
                  className="bg-gradient-primary text-white hover:opacity-90"
                >
                  Create Thread
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
        {discussions.map((discussion) => (
          <Card
            key={discussion.id}
            className="cursor-pointer transition-all hover:shadow-md-custom hover:scale-[1.02]"
            onClick={() => handleSelectDiscussion(discussion)}
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                <h4 className="font-medium text-foreground text-lg">
                  {discussion.title}
                </h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {discussion.lastMessage}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={discussion.author.avatar} />
                      <AvatarFallback className="text-xs">
                        {discussion.author.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      {discussion.author.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      <MessageSquare className="mr-1 h-3 w-3" />
                      {discussion.replyCount}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {discussion.lastMessageTime}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}