import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Upload, 
  Search, 
  Filter, 
  Download, 
  Share, 
  Eye,
  Calendar,
  User,
  FolderOpen,
  Plus,
  ArrowLeft,
  MoreHorizontal
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: "pdf" | "doc" | "xls" | "ppt" | "txt" | "img";
  size: string;
  lastModified: string;
  author: {
    name: string;
    avatar: string;
  };
  shared: boolean;
  folder: string;
  tags: string[];
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Project Requirements.pdf",
    type: "pdf",
    size: "2.4 MB",
    lastModified: "2024-01-15",
    author: { name: "Sarah Chen", avatar: "" },
    shared: true,
    folder: "Projects",
    tags: ["requirements", "planning"]
  },
  {
    id: "2", 
    name: "Team Meeting Notes.doc",
    type: "doc",
    size: "156 KB",
    lastModified: "2024-01-14",
    author: { name: "John Doe", avatar: "" },
    shared: false,
    folder: "Meetings",
    tags: ["meeting", "notes"]
  },
  {
    id: "3",
    name: "Budget Analysis.xls", 
    type: "xls",
    size: "890 KB",
    lastModified: "2024-01-13",
    author: { name: "Mike Wilson", avatar: "" },
    shared: true,
    folder: "Finance",
    tags: ["budget", "analysis"]
  },
  {
    id: "4",
    name: "Design Mockups.ppt",
    type: "ppt", 
    size: "5.2 MB",
    lastModified: "2024-01-12",
    author: { name: "Emma Davis", avatar: "" },
    shared: true,
    folder: "Design",
    tags: ["design", "mockup"]
  }
];

const folders = ["All", "Projects", "Meetings", "Finance", "Design", "Archive"];

export default function Documents() {
  const navigate = useNavigate();
  const [documents] = useState<Document[]>(mockDocuments);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return "📄";
      case "doc":
        return "📝";
      case "xls":
        return "📊";
      case "ppt":
        return "📊";
      case "img":
        return "🖼️";
      default:
        return "📄";
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFolder = selectedFolder === "All" || doc.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Document Library</h1>
              <p className="text-muted-foreground">
                Centralized document management and collaboration
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
              <Button className="bg-gradient-primary text-white">
                <Plus className="mr-2 h-4 w-4" />
                Create Folder
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-[300px]"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              List
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Folders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {folders.map((folder) => (
                  <Button
                    key={folder}
                    variant={selectedFolder === folder ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedFolder(folder)}
                  >
                    <FolderOpen className="mr-2 h-4 w-4" />
                    {folder}
                    {folder !== "All" && (
                      <Badge variant="secondary" className="ml-auto">
                        {documents.filter(d => d.folder === folder).length}
                      </Badge>
                    )}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Storage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Used</span>
                      <span>8.4 GB / 50 GB</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "16.8%" }}></div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Upgrade Storage
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="documents" className="space-y-6">
              <TabsList>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="shared">Shared with me</TabsTrigger>
              </TabsList>

              <TabsContent value="documents">
                {viewMode === "grid" ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredDocuments.map((doc) => (
                      <Card key={doc.id} className="group cursor-pointer hover:shadow-md-custom transition-all">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="text-3xl">{getFileIcon(doc.type)}</div>
                              <Button variant="ghost" size="sm" className="h-auto w-auto p-0 opacity-0 group-hover:opacity-100">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <div>
                              <h4 className="font-medium text-foreground line-clamp-2">{doc.name}</h4>
                              <p className="text-sm text-muted-foreground">{doc.size}</p>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={doc.author.avatar} />
                                <AvatarFallback className="text-xs">
                                  {doc.author.name.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-muted-foreground">{doc.author.name}</span>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {doc.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between pt-2">
                              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(doc.lastModified).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Button variant="ghost" size="sm" className="h-auto w-auto p-1">
                                  <Eye className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-auto w-auto p-1">
                                  <Download className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-auto w-auto p-1">
                                  <Share className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredDocuments.map((doc) => (
                      <Card key={doc.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <div className="text-2xl">{getFileIcon(doc.type)}</div>
                            
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-foreground truncate">{doc.name}</h4>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <span>{doc.size}</span>
                                <span>•</span>
                                <div className="flex items-center space-x-1">
                                  <User className="h-3 w-3" />
                                  <span>{doc.author.name}</span>
                                </div>
                                <span>•</span>
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{new Date(doc.lastModified).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              {doc.shared && (
                                <Badge variant="outline" className="text-xs">
                                  Shared
                                </Badge>
                              )}
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="recent">
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Recent Documents</h3>
                  <p className="text-muted-foreground">Documents you've accessed recently will appear here</p>
                </div>
              </TabsContent>

              <TabsContent value="shared">
                <div className="space-y-4">
                  {filteredDocuments.filter(doc => doc.shared).map((doc) => (
                    <Card key={doc.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl">{getFileIcon(doc.type)}</div>
                          
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">{doc.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Shared by {doc.author.name} • {new Date(doc.lastModified).toLocaleDateString()}
                            </p>
                          </div>

                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}