import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, X, UserPlus, Search } from "lucide-react";

// Mock user data
const mockUsers = [
  { id: "1", name: "Sarah Chen", email: "sarah@company.com", avatar: "", role: "Designer" },
  { id: "2", name: "Alex Johnson", email: "alex@company.com", avatar: "", role: "Developer" },
  { id: "3", name: "Emma Davis", email: "emma@company.com", avatar: "", role: "Product Manager" },
  { id: "4", name: "Michael Brown", email: "michael@company.com", avatar: "", role: "Developer" },
  { id: "5", name: "Lisa Wang", email: "lisa@company.com", avatar: "", role: "QA Engineer" },
  { id: "6", name: "James Wilson", email: "james@company.com", avatar: "", role: "Designer" },
];

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

export function CreateProjectModal({ open, onOpenChange, onSubmit }: CreateProjectModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    key: "",
    manager: "",
    duration: "",
    priority: "medium",
    visibility: "team",
    description: "",
    coverImage: null as File | null,
    teamMembers: [] as typeof mockUsers,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [showUserSearch, setShowUserSearch] = useState(false);

  const filteredUsers = mockUsers.filter(user => 
    !formData.teamMembers.find(member => member.id === user.id) &&
    (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
     user.id.includes(searchQuery))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form
    setFormData({
      name: "",
      key: "",
      manager: "",
      duration: "",
      priority: "medium",
      visibility: "team",
      description: "",
      coverImage: null,
      teamMembers: [],
    });
    setSearchQuery("");
    setShowUserSearch(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Auto-generate key from name
      ...(name === "name" && { key: value.toLowerCase().replace(/\s+/g, "-") })
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, coverImage: file }));
  };

  const addTeamMember = (user: typeof mockUsers[0]) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, user]
    }));
    setSearchQuery("");
  };

  const removeTeamMember = (userId: string) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter(member => member.id !== userId)
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Set up a new project to start collaborating with your team.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter project name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="key">Project Key</Label>
              <Input
                id="key"
                name="key"
                placeholder="project-key"
                value={formData.key}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Manager and Duration */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="manager">Project Manager</Label>
              <Select
                value={formData.manager}
                onValueChange={(value) => setFormData(prev => ({ ...prev, manager: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select manager" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="you">You</SelectItem>
                  <SelectItem value="sarah-chen">Sarah Chen</SelectItem>
                  <SelectItem value="alex-johnson">Alex Johnson</SelectItem>
                  <SelectItem value="emma-davis">Emma Davis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (weeks)</Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                placeholder="8"
                value={formData.duration}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Priority and Visibility */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Visibility</Label>
              <Select
                value={formData.visibility}
                onValueChange={(value) => setFormData(prev => ({ ...prev, visibility: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="team">Team</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your project goals and objectives..."
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
            />
          </div>

          {/* Cover Image */}
          <div className="space-y-2">
            <Label>Cover Image</Label>
            <Card className="border-2 border-dashed border-muted-foreground/25 p-6">
              <div className="flex flex-col items-center justify-center text-center">
                {formData.coverImage ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-foreground">{formData.coverImage.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setFormData(prev => ({ ...prev, coverImage: null }))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG up to 2MB
                    </p>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
              </div>
            </Card>
          </div>

          {/* Team Members */}
          <div className="space-y-4">
            <Label>Team Members</Label>
            
            {/* Add Team Member Button */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowUserSearch(!showUserSearch)}
                className="flex items-center gap-2"
              >
                <UserPlus className="h-4 w-4" />
                Add Team Member
              </Button>
            </div>

            {/* User Search */}
            {showUserSearch && (
              <Card className="p-4 space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                {filteredUsers.length > 0 && (
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {filteredUsers.map(user => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md cursor-pointer"
                        onClick={() => addTeamMember(user)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="text-xs">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {user.role}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
                
                {filteredUsers.length === 0 && searchQuery && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No users found matching "{searchQuery}"
                  </p>
                )}
              </Card>
            )}

            {/* Selected Team Members */}
            {formData.teamMembers.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm">Selected Members ({formData.teamMembers.length})</Label>
                <div className="flex flex-wrap gap-2">
                  {formData.teamMembers.map(member => (
                    <div
                      key={member.id}
                      className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="text-xs">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{member.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto w-auto p-0 hover:bg-transparent"
                        onClick={() => removeTeamMember(member.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-primary text-white hover:opacity-90"
            >
              Create Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}