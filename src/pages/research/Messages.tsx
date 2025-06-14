
import { useState } from "react";
import ResearchLayout from "@/components/research/ResearchLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, Plus, Star, Archive, Trash2, Reply, Forward,
  Paperclip, Send, MoreHorizontal, Inbox, Users, Clock
} from "lucide-react";

const messageCategories = ["Inbox", "Starred", "Sent", "Drafts", "Archive", "Trash"];

const sampleMessages = [
  {
    id: 1,
    from: { name: "Dr. Emily Smith", email: "emily.smith@university.edu", avatar: "ES" },
    to: ["research@sciscribe.com"],
    subject: "Protein Folding Analysis - Progress Update",
    preview: "I wanted to share the latest progress on our protein folding research. The neural network model has shown promising results...",
    content: `Dear Team,

I wanted to share the latest progress on our protein folding research. The neural network model has shown promising results with a 15% improvement in accuracy over our previous approach.

Key findings:
- Model accuracy: 87.3% (up from 72.1%)
- Processing time reduced by 40%
- Memory usage optimized by 25%

Next steps:
1. Validate results with additional test cases
2. Prepare manuscript for peer review
3. Present findings at the upcoming conference

Please review the attached data and let me know your thoughts.

Best regards,
Dr. Emily Smith`,
    timestamp: "2024-01-10T09:30:00Z",
    read: false,
    starred: true,
    attachments: [
      { name: "protein_analysis_results.pdf", size: "2.4 MB" },
      { name: "model_performance_charts.xlsx", size: "1.1 MB" }
    ],
    project: "Protein Folding Analysis",
    priority: "high"
  },
  {
    id: 2,
    from: { name: "Dr. Michael Brown", email: "m.brown@pharma.com", avatar: "MB" },
    to: ["research@sciscribe.com"],
    subject: "Clinical Trial Data Review Meeting",
    preview: "Following up on our discussion about the Phase III trial data. I've scheduled a review meeting for next Tuesday...",
    content: `Hello,

Following up on our discussion about the Phase III trial data. I've scheduled a review meeting for next Tuesday at 2:00 PM.

Agenda:
- Review statistical analysis results
- Discuss data quality issues
- Plan next phase activities
- Timeline adjustments

Please confirm your attendance.

Dr. Michael Brown`,
    timestamp: "2024-01-09T14:15:00Z",
    read: true,
    starred: false,
    attachments: [],
    project: "Clinical Trial Data Management",
    priority: "medium"
  },
  {
    id: 3,
    from: { name: "Dr. Sarah Garcia", email: "s.garcia@research.org", avatar: "SG" },
    to: ["research@sciscribe.com"],
    subject: "Gene Expression Biomarker Validation Complete",
    preview: "Great news! We've completed the biomarker validation study. All markers show statistical significance...",
    content: `Team,

Great news! We've completed the biomarker validation study. All markers show statistical significance with p-values < 0.001.

Summary:
- 15 biomarkers validated
- 95% confidence intervals established
- Cross-validation successful
- Literature concordance: 92%

The manuscript is ready for final review. Can we schedule a meeting this week to discuss publication strategy?

Best,
Sarah`,
    timestamp: "2024-01-08T16:45:00Z",
    read: true,
    starred: true,
    attachments: [
      { name: "biomarker_validation_report.pdf", size: "3.8 MB" }
    ],
    project: "Gene Expression Study",
    priority: "high"
  }
];

export default function MessagesPage() {
  const [selectedCategory, setSelectedCategory] = useState("Inbox");
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [replyText, setReplyText] = useState("");
  const [showCompose, setShowCompose] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-l-red-500";
      case "medium": return "border-l-yellow-500";
      case "low": return "border-l-green-500";
      default: return "border-l-gray-300";
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  const filteredMessages = sampleMessages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.from.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.preview.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === "Starred") return matchesSearch && message.starred;
    if (selectedCategory === "Inbox") return matchesSearch;
    
    return matchesSearch;
  });

  const selectedMessageData = selectedMessage ? sampleMessages.find(m => m.id === selectedMessage) : null;

  return (
    <ResearchLayout activeView="messages">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-sciscribe-navy">Messages</h1>
            <p className="text-sciscribe-slate mt-1">Collaborate with your research team</p>
          </div>
          <Button 
            onClick={() => setShowCompose(true)}
            className="bg-sciscribe-navy hover:bg-sciscribe-blue text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Compose
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-sciscribe-navy">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {messageCategories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      selectedCategory === category ? "bg-sciscribe-navy" : ""
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === "Inbox" && <Inbox className="w-4 h-4 mr-2" />}
                    {category === "Starred" && <Star className="w-4 h-4 mr-2" />}
                    {category === "Archive" && <Archive className="w-4 h-4 mr-2" />}
                    {category === "Trash" && <Trash2 className="w-4 h-4 mr-2" />}
                    {!["Inbox", "Starred", "Archive", "Trash"].includes(category) && 
                      <Users className="w-4 h-4 mr-2" />
                    }
                    {category}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-sciscribe-navy">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-sciscribe-slate">Unread</span>
                  <Badge variant="outline" className="bg-red-100 text-red-800">2</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-sciscribe-slate">Starred</span>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">3</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-sciscribe-slate">This Week</span>
                  <span className="font-medium text-sciscribe-navy">12</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Message List */}
          <div className="lg:col-span-1 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-sciscribe-slate" />
              <Input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Card className="h-[calc(100vh-300px)] overflow-hidden">
              <CardContent className="p-0 h-full overflow-y-auto">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 border-b border-l-4 cursor-pointer hover:bg-sciscribe-mist/50 ${
                      getPriorityColor(message.priority)
                    } ${selectedMessage === message.id ? "bg-sciscribe-gold/10" : ""} ${
                      !message.read ? "bg-blue-50" : ""
                    }`}
                    onClick={() => setSelectedMessage(message.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-sciscribe-gold text-xs text-sciscribe-navy">
                          {message.from.avatar}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm ${!message.read ? "font-semibold" : "font-medium"} text-sciscribe-navy truncate`}>
                            {message.from.name}
                          </p>
                          <div className="flex items-center space-x-1">
                            {message.starred && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                            <span className="text-xs text-sciscribe-slate">{formatDate(message.timestamp)}</span>
                          </div>
                        </div>
                        
                        <p className={`text-sm ${!message.read ? "font-medium" : ""} text-sciscribe-navy truncate`}>
                          {message.subject}
                        </p>
                        
                        <p className="text-xs text-sciscribe-slate truncate mt-1">
                          {message.preview}
                        </p>
                        
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="outline" className="text-xs">
                            {message.project}
                          </Badge>
                          {message.attachments.length > 0 && (
                            <div className="flex items-center text-xs text-sciscribe-slate">
                              <Paperclip className="w-3 h-3 mr-1" />
                              {message.attachments.length}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Message Content */}
          <div className="lg:col-span-2">
            {selectedMessageData ? (
              <Card className="h-[calc(100vh-300px)] flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-sciscribe-navy">
                        {selectedMessageData.subject}
                      </h3>
                      
                      <div className="flex items-center space-x-4 mt-2 text-sm text-sciscribe-slate">
                        <div className="flex items-center">
                          <Avatar className="w-6 h-6 mr-2">
                            <AvatarFallback className="bg-sciscribe-gold text-xs text-sciscribe-navy">
                              {selectedMessageData.from.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <span>{selectedMessageData.from.name}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {formatDate(selectedMessageData.timestamp)}
                        </div>
                        
                        <Badge variant="outline">
                          {selectedMessageData.project}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <Star className={`w-4 h-4 ${selectedMessageData.starred ? "text-yellow-500 fill-current" : ""}`} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Archive className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 overflow-y-auto p-6">
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-sciscribe-navy">
                      {selectedMessageData.content}
                    </pre>
                  </div>

                  {selectedMessageData.attachments.length > 0 && (
                    <div className="mt-6 pt-4 border-t">
                      <h4 className="font-medium text-sciscribe-navy mb-3">Attachments</h4>
                      <div className="space-y-2">
                        {selectedMessageData.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-sciscribe-mist/50 rounded">
                            <div className="flex items-center">
                              <Paperclip className="w-4 h-4 mr-2 text-sciscribe-slate" />
                              <span className="text-sm text-sciscribe-navy">{attachment.name}</span>
                              <span className="text-xs text-sciscribe-slate ml-2">({attachment.size})</span>
                            </div>
                            <Button variant="ghost" size="sm">Download</Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>

                <div className="border-t p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Button variant="outline" size="sm">
                      <Reply className="w-4 h-4 mr-2" />
                      Reply
                    </Button>
                    <Button variant="outline" size="sm">
                      <Forward className="w-4 h-4 mr-2" />
                      Forward
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <Textarea
                      placeholder="Type your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex items-center justify-between">
                      <Button variant="outline" size="sm">
                        <Paperclip className="w-4 h-4 mr-2" />
                        Attach
                      </Button>
                      <Button className="bg-sciscribe-navy hover:bg-sciscribe-blue text-white">
                        <Send className="w-4 h-4 mr-2" />
                        Send Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="h-[calc(100vh-300px)] flex items-center justify-center">
                <div className="text-center">
                  <Inbox className="w-12 h-12 text-sciscribe-slate mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-sciscribe-navy mb-2">Select a message</h3>
                  <p className="text-sciscribe-slate">Choose a message from the list to view its content</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </ResearchLayout>
  );
}
