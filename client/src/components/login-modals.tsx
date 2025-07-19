import { useState } from "react";
import { X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginModalsProps {
  isParentModalOpen: boolean;
  isEmployeeModalOpen: boolean;
  onCloseModals: () => void;
}

export default function LoginModals({ 
  isParentModalOpen, 
  isEmployeeModalOpen, 
  onCloseModals 
}: LoginModalsProps) {
  const { toast } = useToast();
  const [parentFormData, setParentFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    remember: false,
  });
  const [employeeFormData, setEmployeeFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    remember: false,
  });

  const loginMutation = useMutation({
    mutationFn: async ({ formData, role }: { formData: LoginFormData; role: string }) => {
      const response = await apiRequest("POST", "/api/auth/login", {
        ...formData,
        role,
      });
      return response.json();
    },
    onSuccess: (data, variables) => {
      toast({
        title: "Login Successful!",
        description: `Welcome back! Redirecting to ${variables.role} portal...`,
      });
      onCloseModals();
      // Here you would typically redirect to the appropriate dashboard
    },
    onError: () => {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleParentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ formData: parentFormData, role: "parent" });
  };

  const handleEmployeeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ formData: employeeFormData, role: "employee" });
  };

  const updateParentFormData = (field: keyof LoginFormData, value: string | boolean) => {
    setParentFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateEmployeeFormData = (field: keyof LoginFormData, value: string | boolean) => {
    setEmployeeFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      {/* Parent Login Modal */}
      {isParentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal backdrop-blur-sm">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onCloseModals}></div>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative z-10 transform transition-all">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-baloo font-bold text-gray-800">Parent Login</h3>
              <button onClick={onCloseModals} className="text-gray-500 hover:text-gray-700 text-xl">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleParentSubmit} className="space-y-6">
              <div>
                <Label htmlFor="parent-email">Email</Label>
                <Input 
                  id="parent-email"
                  type="email"
                  required
                  value={parentFormData.email}
                  onChange={(e) => updateParentFormData('email', e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <Label htmlFor="parent-password">Password</Label>
                <Input 
                  id="parent-password"
                  type="password"
                  required
                  value={parentFormData.password}
                  onChange={(e) => updateParentFormData('password', e.target.value)}
                  placeholder="Password"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember-parent"
                    checked={parentFormData.remember}
                    onCheckedChange={(checked) => updateParentFormData('remember', checked as boolean)}
                  />
                  <Label htmlFor="remember-parent" className="text-sm text-gray-600">Remember me</Label>
                </div>
                <button type="button" className="text-sm text-blue-600 hover:text-blue-700">Forgot password?</button>
              </div>
              
              <Button 
                type="submit" 
                disabled={loginMutation.isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                {loginMutation.isPending ? "Signing In..." : "Sign In"}
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account? 
                  <button type="button" className="text-blue-600 hover:text-blue-700 font-medium ml-1">Contact us to get started</button>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Employee Login Modal */}
      {isEmployeeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal backdrop-blur-sm">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onCloseModals}></div>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative z-10 transform transition-all">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-baloo font-bold text-gray-800">Staff Login</h3>
              <button onClick={onCloseModals} className="text-gray-500 hover:text-gray-700 text-xl">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleEmployeeSubmit} className="space-y-6">
              <div>
                <Label htmlFor="employee-email">Email</Label>
                <Input 
                  id="employee-email"
                  type="email"
                  required
                  value={employeeFormData.email}
                  onChange={(e) => updateEmployeeFormData('email', e.target.value)}
                  placeholder="staff@poorvamcare.in"
                />
              </div>
              
              <div>
                <Label htmlFor="employee-password">Password</Label>
                <Input 
                  id="employee-password"
                  type="password"
                  required
                  value={employeeFormData.password}
                  onChange={(e) => updateEmployeeFormData('password', e.target.value)}
                  placeholder="Password"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember-employee"
                    checked={employeeFormData.remember}
                    onCheckedChange={(checked) => updateEmployeeFormData('remember', checked as boolean)}
                  />
                  <Label htmlFor="remember-employee" className="text-sm text-gray-600">Remember me</Label>
                </div>
                <button type="button" className="text-sm text-green-600 hover:text-green-700">Forgot password?</button>
              </div>
              
              <Button 
                type="submit" 
                disabled={loginMutation.isPending}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                {loginMutation.isPending ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
