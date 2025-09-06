import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Camera, Mail, MapPin, Phone, Calendar, Award, Users, Briefcase } from "lucide-react";
import { PhotoPicker } from "@/components/ui/PhotoPicker";
import { toast } from "sonner";

export default function Profile() {
  const navigate = useNavigate();
  
  // Dummy user data for project management context
  const [profile, setProfile] = useState({
    name: "Alex Thompson",
    email: "alex.thompson@company.com",
    avatar: "",
    title: "Senior Project Manager",
    department: "Engineering",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Experienced project manager with 8+ years in software development and team leadership. Passionate about agile methodologies and delivering high-quality products.",
    skills: ["Project Management", "Agile/Scrum", "Team Leadership", "Risk Management", "Budget Planning"],
    experience: "8 years",
    timezone: "PST (UTC-8)",
    workingHours: "9:00 AM - 6:00 PM",
    preferredTools: ["Jira", "Slack", "Figma", "GitHub"],
    certifications: ["PMP", "Scrum Master", "Agile Coach"],
    languages: ["English (Native)", "Spanish (Conversational)"]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleSkillsChange = (value: string) => {
    const skills = value.split(',').map(skill => skill.trim()).filter(skill => skill);
    setEditedProfile({ ...editedProfile, skills });
  };

  const handleCertificationsChange = (value: string) => {
    const certifications = value.split(',').map(cert => cert.trim()).filter(cert => cert);
    setEditedProfile({ ...editedProfile, certifications });
  };

  const handleToolsChange = (value: string) => {
    const tools = value.split(',').map(tool => tool.trim()).filter(tool => tool);
    setEditedProfile({ ...editedProfile, preferredTools: tools });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            ) : (
              <div className="space-x-2">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Basic Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Picture & Basic Info */}
            <Card>
              <CardHeader className="text-center">
                <PhotoPicker
                  currentImage={isEditing ? editedProfile.avatar : profile.avatar}
                  onImageSelected={(imageDataUrl) => {
                    if (isEditing) {
                      setEditedProfile({ ...editedProfile, avatar: imageDataUrl });
                    }
                  }}
                  onImageRemoved={() => {
                    if (isEditing) {
                      setEditedProfile({ ...editedProfile, avatar: "" });
                    }
                  }}
                  variant="avatar"
                  size="lg"
                  className="mx-auto mb-4"
                />
                
                {isEditing ? (
                  <div className="space-y-2">
                    <Input
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                      className="text-center text-xl font-bold"
                    />
                    <Input
                      value={editedProfile.title}
                      onChange={(e) => setEditedProfile({ ...editedProfile, title: e.target.value })}
                      className="text-center text-sm"
                    />
                  </div>
                ) : (
                  <>
                    <CardTitle className="text-xl">{profile.name}</CardTitle>
                    <p className="text-muted-foreground">{profile.title}</p>
                  </>
                )}
                
                <Badge variant="outline" className="mx-auto">
                  {isEditing ? editedProfile.department : profile.department}
                </Badge>
              </CardHeader>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                      className="flex-1"
                    />
                  ) : (
                    <span className="text-sm">{profile.email}</span>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      value={editedProfile.phone}
                      onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                      className="flex-1"
                    />
                  ) : (
                    <span className="text-sm">{profile.phone}</span>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      value={editedProfile.location}
                      onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                      className="flex-1"
                    />
                  ) : (
                    <span className="text-sm">{profile.location}</span>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Work Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Work Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Experience</Label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.experience}
                      onChange={(e) => setEditedProfile({ ...editedProfile, experience: e.target.value })}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">{profile.experience}</p>
                  )}
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Working Hours</Label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.workingHours}
                      onChange={(e) => setEditedProfile({ ...editedProfile, workingHours: e.target.value })}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">{profile.workingHours}</p>
                  )}
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Timezone</Label>
                  {isEditing ? (
                    <Select
                      value={editedProfile.timezone}
                      onValueChange={(value) => setEditedProfile({ ...editedProfile, timezone: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PST (UTC-8)">PST (UTC-8)</SelectItem>
                        <SelectItem value="EST (UTC-5)">EST (UTC-5)</SelectItem>
                        <SelectItem value="GMT (UTC+0)">GMT (UTC+0)</SelectItem>
                        <SelectItem value="CET (UTC+1)">CET (UTC+1)</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">{profile.timezone}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={editedProfile.bio}
                    onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                    rows={4}
                    placeholder="Tell us about yourself, your experience, and what drives you..."
                  />
                ) : (
                  <p className="text-muted-foreground">{profile.bio}</p>
                )}
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Award className="mr-2 h-4 w-4" />
                  Skills & Expertise
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div>
                    <Label className="text-sm">Skills (comma-separated)</Label>
                    <Input
                      value={editedProfile.skills.join(', ')}
                      onChange={(e) => handleSkillsChange(e.target.value)}
                      placeholder="Project Management, Agile, Leadership..."
                      className="mt-1"
                    />
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Award className="mr-2 h-4 w-4" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div>
                    <Label className="text-sm">Certifications (comma-separated)</Label>
                    <Input
                      value={editedProfile.certifications.join(', ')}
                      onChange={(e) => handleCertificationsChange(e.target.value)}
                      placeholder="PMP, Scrum Master, Agile Coach..."
                      className="mt-1"
                    />
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.certifications.map((cert, index) => (
                      <Badge key={index} variant="outline">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Preferred Tools */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Preferred Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div>
                    <Label className="text-sm">Tools (comma-separated)</Label>
                    <Input
                      value={editedProfile.preferredTools.join(', ')}
                      onChange={(e) => handleToolsChange(e.target.value)}
                      placeholder="Jira, Slack, Figma, GitHub..."
                      className="mt-1"
                    />
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.preferredTools.map((tool, index) => (
                      <Badge key={index} variant="outline">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Languages */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {profile.languages.map((language, index) => (
                    <div key={index} className="text-sm">
                      {language}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}