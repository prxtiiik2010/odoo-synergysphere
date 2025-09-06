import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, X, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface CreateTeamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (teamData: any) => void;
}

const departmentOptions = [
  "Engineering",
  "Design", 
  "Marketing",
  "Sales",
  "Operations",
  "HR",
  "Finance",
  "Customer Success"
];

const roleOptions = [
  "Team Lead",
  "Senior Developer",
  "Developer", 
  "Junior Developer",
  "Designer",
  "Product Manager",
  "QA Engineer",
  "DevOps Engineer",
  "Data Analyst",
  "Marketing Specialist",
  "Sales Representative"
];

export function CreateTeamModal({ open, onOpenChange, onSubmit }: CreateTeamModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    department: "",
    lead: ""
  });
  
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: ""
  });

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email || !newMember.role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all member details",
        variant: "destructive"
      });
      return;
    }

    // Check for duplicate emails
    if (members.some(member => member.email === newMember.email)) {
      toast({
        title: "Duplicate Email",
        description: "A team member with this email already exists",
        variant: "destructive"
      });
      return;
    }

    const member: TeamMember = {
      id: Math.random().toString(36).substr(2, 9),
      ...newMember
    };

    setMembers(prev => [...prev, member]);
    setNewMember({ name: "", email: "", role: "" });
  };

  const handleRemoveMember = (id: string) => {
    setMembers(prev => prev.filter(member => member.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.department || !formData.lead) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (members.length === 0) {
      toast({
        title: "No Team Members",
        description: "Please add at least one team member",
        variant: "destructive"
      });
      return;
    }

    onSubmit({
      ...formData,
      members: members.map(member => ({
        ...member,
        isLead: member.name === formData.lead
      }))
    });

    // Reset form
    setFormData({ name: "", description: "", department: "", lead: "" });
    setMembers([]);
    setNewMember({ name: "", email: "", role: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Team</DialogTitle>
          <DialogDescription>
            Create a new team and add members to start collaborating
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Team Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Team Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Frontend Development Team"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select 
                  value={formData.department} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departmentOptions.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the team's responsibilities and goals..."
                rows={3}
              />
            </div>
          </div>

          {/* Add Team Members */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <h3 className="font-semibold">Team Members</h3>
            </div>

            {/* Add Member Form */}
            <div className="p-4 border rounded-lg bg-muted/50">
              <h4 className="font-medium mb-3">Add Team Member</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  placeholder="Full Name"
                  value={newMember.name}
                  onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={newMember.email}
                  onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))}
                />
                <div className="flex gap-2">
                  <Select 
                    value={newMember.role} 
                    onValueChange={(value) => setNewMember(prev => ({ ...prev, role: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roleOptions.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    onClick={handleAddMember}
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Members List */}
            {members.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Added Members ({members.length})</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.email}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {member.role}
                        </Badge>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveMember(member.id)}
                        className="h-8 w-8 p-0 hover:bg-destructive/10"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Team Lead Selection */}
            {members.length > 0 && (
              <div className="space-y-2">
                <Label htmlFor="lead">Team Lead *</Label>
                <Select 
                  value={formData.lead} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, lead: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select team lead" />
                  </SelectTrigger>
                  <SelectContent>
                    {members.map((member) => (
                      <SelectItem key={member.id} value={member.name}>
                        {member.name} - {member.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Create Team
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}