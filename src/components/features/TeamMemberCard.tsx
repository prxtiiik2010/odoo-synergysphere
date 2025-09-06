import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PhotoPicker } from "@/components/ui/PhotoPicker";
import { User, Edit3, Check, X } from "lucide-react";
import { toast } from "sonner";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  status: "active" | "away" | "busy";
}

interface TeamMemberCardProps {
  member: TeamMember;
  onUpdate?: (member: TeamMember) => void;
  canEdit?: boolean;
}

export function TeamMemberCard({ member, onUpdate, canEdit = false }: TeamMemberCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMember, setEditedMember] = useState(member);

  const handleSave = () => {
    onUpdate?.(editedMember);
    setIsEditing(false);
    toast.success("Team member updated!");
  };

  const handleCancel = () => {
    setEditedMember(member);
    setIsEditing(false);
  };

  const handleImageSelected = (imageDataUrl: string) => {
    setEditedMember({ ...editedMember, avatar: imageDataUrl });
  };

  const handleImageRemoved = () => {
    setEditedMember({ ...editedMember, avatar: undefined });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "busy":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="relative">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              {isEditing ? (
                <PhotoPicker
                  currentImage={editedMember.avatar}
                  onImageSelected={handleImageSelected}
                  onImageRemoved={handleImageRemoved}
                  variant="avatar"
                  size="sm"
                />
              ) : (
                <div className="relative">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                    {member.avatar ? (
                      <img 
                        src={member.avatar} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(member.status)}`} />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-1">
                  <Input
                    value={editedMember.name}
                    onChange={(e) => setEditedMember({ ...editedMember, name: e.target.value })}
                    className="h-8 text-sm font-medium"
                  />
                  <Input
                    value={editedMember.role}
                    onChange={(e) => setEditedMember({ ...editedMember, role: e.target.value })}
                    className="h-7 text-xs"
                  />
                </div>
              ) : (
                <>
                  <h3 className="font-medium text-sm">{member.name}</h3>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </>
              )}
            </div>
          </div>

          {canEdit && (
            <div className="flex items-center space-x-1">
              {isEditing ? (
                <>
                  <Button size="sm" variant="outline" onClick={handleCancel} className="h-7 w-7 p-0">
                    <X className="h-3 w-3" />
                  </Button>
                  <Button size="sm" onClick={handleSave} className="h-7 w-7 p-0">
                    <Check className="h-3 w-3" />
                  </Button>
                </>
              ) : (
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => setIsEditing(true)}
                  className="h-7 w-7 p-0"
                >
                  <Edit3 className="h-3 w-3" />
                </Button>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <Badge variant="outline" className="text-xs capitalize">
          {member.status}
        </Badge>
      </CardContent>
    </Card>
  );
}