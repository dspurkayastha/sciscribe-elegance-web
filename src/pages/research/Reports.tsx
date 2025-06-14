
import { useState } from "react";
import ResearchLayout from "@/components/research/ResearchLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from "recharts";
import { 
  Download, FileText, TrendingUp, TrendingDown, Users, Clock,
  Calendar, Target, CheckCircle, AlertCircle, DollarSign, Activity
} from "lucide-react";

const projectProgressData = [
  { name: "Protein Folding", completed: 75, remaining: 25, budget: 125000 },
  { name: "Clinical Trial", completed: 45, remaining: 55, budget: 89000 },
  { name: "Gene Expression", completed: 100, remaining: 0, budget: 156000 },
  { name: "Drug Discovery", completed: 30, remaining: 70, budget: 200000 },
];

const monthlyActivityData = [
  { month: "Aug", tasks: 45, projects: 3, budget: 180000 },
  { month: "Sep", tasks: 52, projects: 4, budget: 220000 },
  { month: "Oct", tasks: 48, projects: 4, budget: 205000 },
  { month: "Nov", tasks: 61, projects: 5, budget: 275000 },
  { month: "Dec", tasks: 58, projects: 5, budget: 285000 },
  { month: "Jan", tasks: 67, projects: 6, budget: 320000 },
];

const teamPerformanceData = [
  { name: "Dr. Smith", tasks: 24, efficiency: 92 },
  { name: "Dr. Brown", tasks: 18, efficiency: 88 },
  { name: "Dr. Garcia", tasks: 31, efficiency: 95 },
  { name: "Dr. Johnson", tasks: 22, efficiency: 85 },
  { name: "Dr. Wilson", tasks: 16, efficiency: 90 },
];

const budgetDistribution = [
  { name: "Personnel", value: 45, color: "#3B82F6" },
  { name: "Equipment", value: 25, color: "#10B981" },
  { name: "Materials", value: 20, color: "#F59E0B" },
  { name: "Overhead", value: 10, color: "#EF4444" },
];

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("last-6-months");
  const [selectedReport, setSelectedReport] = useState("overview");

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

  return (
    <ResearchLayout activeView="reports">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-sciscribe-navy">Reports & Analytics</h1>
            <p className="text-sciscribe-slate mt-1">Track performance and generate insights</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
            <Button className="bg-sciscribe-navy hover:bg-sciscribe-blue text-white">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Active Projects</p>
                  <p className="text-3xl font-bold">12</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-sm">+15% from last month</span>
                  </div>
                </div>
                <Target className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Completed Tasks</p>
                  <p className="text-3xl font-bold">247</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-sm">+23% from last month</span>
                  </div>
                </div>
                <CheckCircle className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Team Efficiency</p>
                  <p className="text-3xl font-bold">91%</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-sm">+5% from last month</span>
                  </div>
                </div>
                <Activity className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm font-medium">Budget Utilization</p>
                  <p className="text-3xl font-bold">73%</p>
                  <div className="flex items-center mt-2">
                    <TrendingDown className="w-4 h-4 mr-1" />
                    <span className="text-sm">-2% from last month</span>
                  </div>
                </div>
                <DollarSign className="w-8 h-8 text-amber-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedReport} onValueChange={setSelectedReport} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="team">Team Performance</TabsTrigger>
            <TabsTrigger value="budget">Budget Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sciscribe-navy">Monthly Activity Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyActivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="tasks" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="projects" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sciscribe-navy">Budget Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={budgetDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {budgetDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-sciscribe-navy">Project Progress Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectProgressData.map((project, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sciscribe-navy">{project.name}</span>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-sciscribe-slate">${project.budget.toLocaleString()}</span>
                          <Badge variant="outline">{project.completed}% Complete</Badge>
                        </div>
                      </div>
                      <Progress value={project.completed} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sciscribe-navy">Project Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={projectProgressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" fill="#10B981" name="Completed %" />
                    <Bar dataKey="remaining" fill="#EF4444" name="Remaining %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sciscribe-navy">Projects by Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sciscribe-slate">Active</span>
                    <Badge className="bg-green-100 text-green-800">8</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sciscribe-slate">On Hold</span>
                    <Badge className="bg-yellow-100 text-yellow-800">2</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sciscribe-slate">Completed</span>
                    <Badge className="bg-blue-100 text-blue-800">3</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sciscribe-slate">Overdue</span>
                    <Badge className="bg-red-100 text-red-800">1</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sciscribe-navy">Resource Allocation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sciscribe-slate">High Priority</span>
                    <span className="font-medium text-sciscribe-navy">5 projects</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sciscribe-slate">Medium Priority</span>
                    <span className="font-medium text-sciscribe-navy">6 projects</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sciscribe-slate">Low Priority</span>
                    <span className="font-medium text-sciscribe-navy">3 projects</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sciscribe-navy">Timeline Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sciscribe-slate">On Schedule</span>
                    <Badge className="bg-green-100 text-green-800">9</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sciscribe-slate">At Risk</span>
                    <Badge className="bg-yellow-100 text-yellow-800">4</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sciscribe-slate">Delayed</span>
                    <Badge className="bg-red-100 text-red-800">1</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sciscribe-navy">Team Performance Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={teamPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="tasks" fill="#3B82F6" name="Tasks Completed" />
                    <Bar dataKey="efficiency" fill="#10B981" name="Efficiency %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sciscribe-navy">Top Performers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {teamPerformanceData
                    .sort((a, b) => b.efficiency - a.efficiency)
                    .slice(0, 3)
                    .map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-sciscribe-mist/50 rounded-lg">
                      <div>
                        <p className="font-medium text-sciscribe-navy">{member.name}</p>
                        <p className="text-sm text-sciscribe-slate">{member.tasks} tasks completed</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">{member.efficiency}% efficiency</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sciscribe-navy">Team Workload</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sciscribe-slate">Optimal Load</span>
                    <Badge className="bg-green-100 text-green-800">3 members</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sciscribe-slate">High Load</span>
                    <Badge className="bg-yellow-100 text-yellow-800">2 members</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sciscribe-slate">Overloaded</span>
                    <Badge className="bg-red-100 text-red-800">0 members</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sciscribe-slate">Available</span>
                    <Badge className="bg-blue-100 text-blue-800">1 member</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sciscribe-navy">Budget Utilization Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={monthlyActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="budget" stroke="#F59E0B" strokeWidth={3} name="Budget ($)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sciscribe-navy">Budget Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sciscribe-slate">Total Allocated</span>
                    <span className="font-medium text-sciscribe-navy">$570,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sciscribe-slate">Utilized</span>
                    <span className="font-medium text-sciscribe-navy">$416,100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sciscribe-slate">Remaining</span>
                    <span className="font-medium text-green-600">$153,900</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sciscribe-slate">Utilization Rate</span>
                    <span className="font-medium text-sciscribe-navy">73%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sciscribe-navy">Cost per Project</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {projectProgressData.map((project, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-sciscribe-slate">{project.name}</span>
                      <span className="font-medium text-sciscribe-navy">${project.budget.toLocaleString()}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sciscribe-navy">Variance Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sciscribe-slate">Under Budget</span>
                    <Badge className="bg-green-100 text-green-800">7 projects</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sciscribe-slate">On Budget</span>
                    <Badge className="bg-blue-100 text-blue-800">4 projects</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sciscribe-slate">Over Budget</span>
                    <Badge className="bg-red-100 text-red-800">1 project</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ResearchLayout>
  );
}
