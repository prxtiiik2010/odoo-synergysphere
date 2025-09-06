import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PhotoPicker } from "@/components/ui/PhotoPicker";
import { TeamMemberCard } from "@/components/features/TeamMemberCard";
import { ProjectCard } from "@/components/features/ProjectCard";
import { ArrowLeft } from "lucide-react";

export default function PhotoDemo() {
  const navigate = useNavigate();
  
  const [profileImage, setProfileImage] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [cardImage, setCardImage] = useState("");
  
  const [teamMember, setTeamMember] = useState({
    id: "1",
    name: "John Smith",
    role: "UI/UX Designer",
    avatar: undefined as string | undefined,
    status: "active" as const
  });

  const [project, setProject] = useState({
    id: "1",
    title: "Mobile App Redesign",
    description: "Complete redesign of our mobile application with modern UI patterns and improved user experience.",
    coverImage: undefined as string | undefined,
    progress: 65,
    dueDate: "2024-03-15",
    memberCount: 5,
    priority: "high" as const
  });

  const handleTeamMemberUpdate = (updatedMember: typeof teamMember) => {
    setTeamMember(updatedMember);
  };

  const handleProjectUpdate = (updatedProject: typeof project) => {
    setProject(updatedProject);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div>
            <h1 className="text-3xl font-bold">Photo Library Demo</h1>
            <p className="text-muted-foreground mt-2">
              See how you can add photos from your device library across different components.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Photo Picker Examples */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Avatar</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <PhotoPicker
                  currentImage={profileImage}
                  onImageSelected={setProfileImage}
                  onImageRemoved={() => setProfileImage("")}
                  variant="avatar"
                  size="lg"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Banner Image</CardTitle>
              </CardHeader>
              <CardContent>
                <PhotoPicker
                  currentImage={bannerImage}
                  onImageSelected={setBannerImage}
                  onImageRemoved={() => setBannerImage("")}
                  variant="banner"
                  placeholder="Add a banner image"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Card Image</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <PhotoPicker
                  currentImage={cardImage}
                  onImageSelected={setCardImage}
                  onImageRemoved={() => setCardImage("")}
                  variant="card"
                  size="md"
                  placeholder="Add card image"
                />
              </CardContent>
            </Card>
          </div>

          {/* Interactive Components */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Member Card</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Click edit to add/change the member's photo
                </p>
              </CardHeader>
              <CardContent>
                <TeamMemberCard
                  member={teamMember}
                  onUpdate={handleTeamMemberUpdate}
                  canEdit={true}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Card</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Click edit to add/change the project cover image
                </p>
              </CardHeader>
              <CardContent>
                <ProjectCard
                  project={project}
                  onUpdate={handleProjectUpdate}
                  canEdit={true}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How it works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium">On Mobile Devices:</h4>
                  <p className="text-muted-foreground">
                    Photos are selected directly from your device's photo library or camera.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">On Web Browsers:</h4>
                  <p className="text-muted-foreground">
                    Uses the standard file picker to select images from your computer.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Features:</h4>
                  <ul className="text-muted-foreground space-y-1 ml-4 list-disc">
                    <li>Choose from photo library</li>
                    <li>Take new photos (mobile only)</li>
                    <li>Edit and crop images</li>
                    <li>Remove uploaded images</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}