import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Bell, CheckCircle, MessageSquare, UserPlus, Calendar, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "task" | "mention" | "assignment" | "deadline";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  icon: React.ReactNode;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "assignment",
    title: "Task assigned to you",
    message: "You've been assigned to 'Design new landing page' in Project Alpha",
    timestamp: "2 min ago",
    isRead: false,
    icon: <UserPlus className="h-4 w-4" />,
  },
  {
    id: "2",
    type: "mention",
    title: "You were mentioned",
    message: "Sarah mentioned you in a discussion about 'Marketing Strategy'",
    timestamp: "5 min ago",
    isRead: false,
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    id: "3",
    type: "task",
    title: "Task status updated",
    message: "Task 'User research' has been moved to 'In Progress'",
    timestamp: "1 hour ago",
    isRead: true,
    icon: <CheckCircle className="h-4 w-4" />,
  },
  {
    id: "4",
    type: "deadline",
    title: "Upcoming deadline",
    message: "Project Beta milestone is due tomorrow",
    timestamp: "3 hours ago",
    isRead: true,
    icon: <Calendar className="h-4 w-4" />,
  },
];

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const navigate = useNavigate();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "assignment":
        return "text-primary";
      case "mention":
        return "text-warning";
      case "task":
        return "text-success";
      case "deadline":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    
    // Navigate to relevant page based on notification type
    switch (notification.type) {
      case "assignment":
      case "task":
        navigate("/my-tasks");
        break;
      case "mention":
        navigate("/documents");
        break;
      case "deadline":
        navigate("/dashboard");
        break;
      default:
        navigate("/dashboard");
        break;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative h-9 w-9 p-0">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-4">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="h-auto p-0 text-xs text-primary hover:underline"
            >
              Mark all as read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No notifications yet
            </div>
          ) : (
            notifications.map((notification, index) => (
              <div key={notification.id}>
                <div
                  className={cn(
                    "group relative flex cursor-pointer items-start space-x-3 p-4 hover:bg-muted/50",
                    !notification.isRead && "bg-primary/5"
                  )}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className={cn("mt-0.5", getNotificationColor(notification.type))}>
                    {notification.icon}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto w-auto p-0 opacity-0 group-hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNotification(notification.id);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.timestamp}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <div className="mt-2 h-2 w-2 rounded-full bg-primary" />
                  )}
                </div>
                {index < notifications.length - 1 && <DropdownMenuSeparator />}
              </div>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}