"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  Upload,
  FileText,
  MapPin,
  Building,
  Star,
  Activity,
  Calendar,
  Filter,
  Search,
  LogOut,
  Home,
} from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PortalDashboard() {
  const router = useRouter();
  type User = { name: string };
  type Lead = {
    id: string;
    company: string;
    industry: string;
    address: string;
    score: number;
    status: string;
    revenue: number;
    contact: string;
    createdAt: string;
  };
  const [user, setUser] = useState<User | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const statuses = ["New", "Contacted", "Qualified", "Proposal", "Closed Won", "Closed Lost"];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuthenticated = localStorage.getItem("aethon_authenticated");
      const userData = localStorage.getItem("aethon_user");
      if (isAuthenticated !== "true") {
        router.push("/portal/login");
      } else if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, [router]);

  useEffect(() => {
    const industries = ["Technology", "Healthcare", "Finance", "Manufacturing", "Retail", "Education", "Real Estate", "Consulting"];
    const statuses = ["New", "Contacted", "Qualified", "Proposal", "Closed Won", "Closed Lost"];
    const companies = ["TechCorp Inc", "HealthPlus", "FinanceFirst", "ManuGlobal", "RetailMax", "EduSolutions", "PropertyPro", "ConsultElite"];
    const fakeLeads = Array.from({ length: 100 }, (_, i) => ({
      id: `lead-${i + 1}`,
      company: companies[Math.floor(Math.random() * companies.length)],
      industry: industries[Math.floor(Math.random() * industries.length)],
      address: `${Math.floor(Math.random() * 9999) + 1} ${["Main St", "Oak Ave", "Pine Rd", "Cedar Blvd"][Math.floor(Math.random() * 4)]}, ${["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"][Math.floor(Math.random() * 5)]}, ${["NY", "CA", "IL", "TX", "AZ"][Math.floor(Math.random() * 5)]}`,
      score: Math.floor(Math.random() * 40) + 60,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      revenue: Math.floor(Math.random() * 50000) + 10000,
      contact: `contact${i + 1}@${companies[Math.floor(Math.random() * companies.length)].toLowerCase().replace(/\s+/g, "")}.com`,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    }));
    setLeads(fakeLeads);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("aethon_authenticated");
    localStorage.removeItem("aethon_user");
    router.push("/");
  };

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [400000, 420000, 380000, 450000, 480000, 520000],
        borderColor: "#00FF6A", // bright green
        backgroundColor: "rgba(0,255,106,0.1)",
        tension: 0.4,
      },
      {
        label: "New Leads",
        data: [65, 72, 58, 80, 85, 92],
        borderColor: "#FFFFFF", // bright white
        backgroundColor: "rgba(255,255,255,0.1)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "hsl(210, 40%, 98%)",
        },
      },
      title: {
        display: true,
        text: "Performance Overview",
        color: "hsl(210, 40%, 98%)",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "hsl(215, 20.2%, 65.1%)",
        },
        grid: {
          color: "hsl(217.2, 32.6%, 17.5%)",
        },
      },
      y: {
        ticks: {
          color: "hsl(215, 20.2%, 65.1%)",
        },
        grid: {
          color: "hsl(217.2, 32.6%, 17.5%)",
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const recentLeads = leads.slice(0, 5);
  const totalRevenue = leads.reduce((sum, lead) => sum + lead.revenue, 0);
  const avgScore = Math.round(leads.reduce((sum, lead) => sum + lead.score, 0) / leads.length);

  return (
    <div className="min-h-screen text-white" style={{
      background: 'linear-gradient(180deg, #2b0f13 0%, #6a2f16 25%, #1d1115 50%, #070814 75%, #020314 100%)',
      minHeight: '100vh',
    }}>
      {/* Header with animated gradient */}
      <header className="border-b backdrop-blur bg-black">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shadow-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="aethon-text text-2xl font-extrabold">Aethon Portal</h1>
                <p className="text-sm text-white">Lead Management Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-white">Welcome, {user?.name || "User"}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>
      {/* Quick Stats Bar */}
      <div className="container mx-auto px-6 py-2">
        <div className="flex gap-4 justify-center">
          <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur border border-orange-400/30 text-orange-200 font-semibold shadow">Revenue: ${(totalRevenue / 1000000).toFixed(2)}M</div>
          <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur border border-orange-400/30 text-orange-200 font-semibold shadow">Leads: {leads.length}</div>
          <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur border border-orange-400/30 text-orange-200 font-semibold shadow">Avg Score: {avgScore}</div>
        </div>
      </div>
      <div className="container mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="leads" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Leads
            </TabsTrigger>
            <TabsTrigger value="uploads" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>
          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/10 backdrop-blur-lg border border-orange-400/30 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-orange-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    ${(totalRevenue / 1000000).toFixed(1)}M
                  </div>
                  <p className="text-xs text-white/80">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-lg border border-orange-400/30 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Total Leads</CardTitle>
                  <Users className="h-4 w-4 text-orange-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{leads.length}</div>
                  <p className="text-xs text-white/80">
                    +8% from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-lg border border-orange-400/30 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Avg Lead Score</CardTitle>
                  <Star className="h-4 w-4 text-orange-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{avgScore}</div>
                  <p className="text-xs text-white/80">
                    +3% from last month
                  </p>
                </CardContent>
              </Card>
            </div>
            {/* Charts and Recent Leads */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <Line data={chartData} options={chartOptions} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Leads</CardTitle>
                  <CardDescription>Latest leads added to your pipeline</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentLeads.map((lead) => (
                      <div key={lead.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                            <Building className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium">{lead.company}</p>
                            <p className="text-sm text-muted-foreground">{lead.industry}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={lead.status === "New" ? "default" : "secondary"}>
                            {lead.status}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">
                            Score: {lead.score}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={() => {
                      const tabsTrigger = document.querySelector('[value="leads"]');
                      tabsTrigger?.click();
                    }}
                  >
                    View All Leads
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          {/* Leads Tab */}
          <TabsContent value="leads" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Lead Management</h2>
                <p className="text-muted-foreground">Manage and track all your leads</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Lead
                </Button>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>All Leads ({leads.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leads.slice(0, 20).map((lead) => (
                    <div key={lead.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                          <Building className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium">{lead.company}</h3>
                          <p className="text-sm text-muted-foreground flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {lead.address}
                          </p>
                          <p className="text-sm text-muted-foreground">{lead.industry}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="flex items-center space-x-2">
                          <Badge variant={
                            lead.status === "Closed Won" ? "default" :
                            lead.status === "Qualified" ? "secondary" :
                            lead.status === "New" ? "outline" : "secondary"
                          }>
                            {lead.status}
                          </Badge>
                          <span className="text-sm font-medium">Score: {lead.score}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Revenue: ${lead.revenue.toLocaleString()}
                        </p>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                {leads.length > 20 && (
                  <div className="text-center mt-6">
                    <Button variant="outline">Load More Leads</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          {/* Upload Tab */}
          <TabsContent value="uploads" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">CSV Upload</h2>
              <p className="text-muted-foreground">Upload and manage lead data from CSV files</p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Upload CSV File</CardTitle>
                <CardDescription>
                  Upload a CSV file with lead information to add to your database
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Drop your CSV file here</h3>
                  <p className="text-muted-foreground mb-4">
                    or click to browse and select a file
                  </p>
                  <Button>
                    <FileText className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                </div>
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Expected CSV Format:</h4>
                  <div className="bg-muted p-4 rounded-lg text-sm">
                    <code>company,industry,address,contact,revenue</code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Analytics</h2>
              <p className="text-muted-foreground">Detailed analytics and insights</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Lead Distribution by Industry</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Technology", "Healthcare", "Finance", "Manufacturing"].map((industry, index) => (
                      <div key={industry} className="flex items-center justify-between">
                        <span className="text-sm">{industry}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 h-2 bg-muted rounded-full">
                            <div
                              className="h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                              style={{ width: `${(index + 1) * 20}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-muted-foreground">{(index + 1) * 5}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Lead Status Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {statuses.slice(0, 4).map((status, index) => (
                      <div key={status} className="flex items-center justify-between">
                        <span className="text-sm">{status}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 h-2 bg-muted rounded-full">
                            <div
                              className="h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                              style={{ width: `${Math.random() * 80 + 20}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {Math.floor(Math.random() * 20) + 5}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <style jsx>{`
        .aethon-text {
          font-weight: bold;
          background: linear-gradient(90deg, #ff7f29 0%, #ff5b5b 50%, #ffd93d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow:
            0px 0px 4px rgba(255, 123, 50, 0.7),
            0px 0px 10px rgba(255, 91, 91, 0.6),
            0px 0px 15px rgba(255, 217, 61, 0.5);
        }
      `}</style>
    </div>
  );
}
