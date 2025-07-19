import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, Phone, User, MessageSquare } from "lucide-react";

interface ContactSubmission {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  childName: string | null;
  childAge: string | null;
  serviceType: string | null;
  message: string | null;
  consent: boolean;
  createdAt: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data: submissions, isLoading, refetch } = useQuery({
    queryKey: ["admin-contacts"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/contacts");
      return response.json();
    },
    enabled: isAuthenticated,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiRequest("POST", "/api/auth/login", {
        email,
        password,
        role: "employee"
      });
      const data = await response.json();
      if (data.success) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Contact Submissions</h1>
          <Button onClick={() => refetch()}>Refresh</Button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Loading submissions...</div>
        ) : submissions?.success ? (
          <div className="grid gap-6">
            {submissions.submissions.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500">No contact submissions yet.</p>
                </CardContent>
              </Card>
            ) : (
              submissions.submissions.map((submission: ContactSubmission) => (
                <Card key={submission.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <User className="w-5 h-5" />
                          {submission.firstName} {submission.lastName}
                        </CardTitle>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {submission.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {submission.phone}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(submission.createdAt)}
                          </div>
                        </div>
                      </div>
                      {submission.serviceType && (
                        <Badge variant="secondary">{submission.serviceType}</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(submission.childName || submission.childAge) && (
                        <div>
                          <h4 className="font-semibold mb-2">Child Information</h4>
                          <p className="text-sm text-gray-600">
                            {submission.childName && `Name: ${submission.childName}`}
                            {submission.childName && submission.childAge && " • "}
                            {submission.childAge && `Age: ${submission.childAge}`}
                          </p>
                        </div>
                      )}
                      {submission.message && (
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            Message
                          </h4>
                          <p className="text-sm text-gray-600">{submission.message}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-red-500">Failed to load submissions.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 