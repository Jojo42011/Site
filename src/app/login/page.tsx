"use client";
import React, { useState } from "react";
import { motion as m } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { signIn, signUp } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Form state
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    company: ""
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);
    
    try {
      const { error } = await signIn(loginForm.email, loginForm.password);
      if (error) {
        setError(error.message);
      } else {
        // Successful login - redirect to dashboard immediately
        setSuccess("Login successful! Redirecting...");
        router.push('/dashboard');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    // Basic validation
    if (signupForm.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    
    if (!signupForm.firstName.trim() || !signupForm.lastName.trim() || !signupForm.company.trim()) {
      setError("Please fill in all required fields");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await signUp(
        signupForm.email, 
        signupForm.password, 
        signupForm.firstName, 
        signupForm.lastName, 
        signupForm.company
      );
      
      if (result.error) {
        setError(result.error.message);
      } else if (result.requiresEmailConfirmation) {
        // Account created but email confirmation required
        setSuccess("Account created successfully! Please check your email to confirm your account, then sign in.");
        setActiveTab("login");
        // Clear form
        setSignupForm({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          company: ""
        });
      } else if (result.user) {
        // Account created and user is automatically signed in
        setSuccess("Account created successfully! Redirecting to dashboard...");
        
        // Redirect immediately since user is already signed in
        router.push('/dashboard');
        
        // Clear form
        setSignupForm({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          company: ""
        });
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-500/20 via-orange-500/30 to-slate-950" />
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[800px] h-[300px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 30%, #ffb34788 0%, #ff512f22 70%, transparent 100%)",
          filter: "blur(48px)",
          opacity: 0.7,
        }}
      />
      
      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-slate-950/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="flex items-center gap-2">
            {/* Flow-based logo */}
            <span className="relative flex items-center">
              <svg width="32" height="32" viewBox="0 0 24 24" className="mr-2">
                <defs>
                  <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ff512f" />
                    <stop offset="100%" stopColor="#f09819" />
                  </linearGradient>
                </defs>
                {/* Flowing wave symbol */}
                <path
                  d="M2 12c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10S2 17.5 2 12z"
                  fill="url(#logoGrad)"
                />
                {/* Flowing lines inside circle */}
                <path
                  d="M6 8c2 2 4 2 6 2s4 0 6-2M6 16c2-2 4-2 6-2s4 0 6 2"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  opacity="0.8"
                  strokeLinecap="round"
                />
              </svg>
              {/* Big, bold, glowing "Aethon" */}
              <span
                className="font-extrabold text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-yellow-300 animate-shine drop-shadow-[0_2px_12px_rgba(255,255,255,0.8)]"
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  position: "relative",
                }}
              >
                Aethon
              </span>
            </span>
          </div>
          
          {/* Back to home link */}
          <div className="ml-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Welcome message */}
          <div className="text-center mb-8">
            <m.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-orange-400" />
              </div>
            </m.div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome to Aethon</h1>
            <p className="text-slate-400">Access your AI automation dashboard</p>
          </div>

                     {/* Login/Signup Tabs */}
           <Card className="border-orange-500/30 bg-slate-900/60 backdrop-blur-sm">
             <Tabs value={activeTab} onValueChange={(value) => {
               setActiveTab(value);
               setError("");
               setSuccess("");
             }} className="w-full">
              <CardHeader className="pb-4">
                <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 border border-slate-700/50">
                  <TabsTrigger 
                    value="login" 
                    className="data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger 
                    value="signup" 
                    className="data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all"
                  >
                    Create Account
                  </TabsTrigger>
                </TabsList>
              </CardHeader>

              {/* Login Form */}
              <TabsContent value="login" className="px-6 pb-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  {error && (
                    <div className="p-3 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30 text-sm">
                      {error}
                    </div>
                  )}
                  <div>
                    <label htmlFor="login-email" className="block text-sm font-medium text-slate-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                        className="pl-10 bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-orange-500/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="login-password" className="block text-sm font-medium text-slate-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                        required
                        className="pl-10 pr-10 bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-orange-500/20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="rounded border-slate-600 bg-slate-800 text-orange-500 focus:ring-orange-500/20 focus:ring-offset-slate-900"
                      />
                      <span className="text-sm text-slate-300">Remember me</span>
                    </label>
                    <Link href="#" className="text-sm text-orange-400 hover:text-orange-300 transition-colors">
                      Forgot password?
                    </Link>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-base font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

                             {/* Signup Form */}
               <TabsContent value="signup" className="px-6 pb-6">
                 <form onSubmit={handleSignup} className="space-y-4">
                   {error && (
                     <div className="p-3 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30 text-sm">
                       {error}
                     </div>
                   )}
                   {success && (
                     <div className="p-3 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 text-sm">
                       <div className="flex items-center gap-2">
                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-400"></div>
                         {success}
                       </div>
                     </div>
                   )}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="signup-firstname" className="block text-sm font-medium text-slate-300 mb-2">
                        First Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="signup-firstname"
                          type="text"
                          placeholder="First name"
                          value={signupForm.firstName}
                          onChange={(e) => setSignupForm(prev => ({ ...prev, firstName: e.target.value }))}
                          required
                          className="pl-10 bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-orange-500/20"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="signup-lastname" className="block text-sm font-medium text-slate-300 mb-2">
                        Last Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="signup-lastname"
                          type="text"
                          placeholder="Last name"
                          value={signupForm.lastName}
                          onChange={(e) => setSignupForm(prev => ({ ...prev, lastName: e.target.value }))}
                          required
                          className="pl-10 bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-orange-500/20"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="signup-email" className="block text-sm font-medium text-slate-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={signupForm.email}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                        className="pl-10 bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-orange-500/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="signup-company" className="block text-sm font-medium text-slate-300 mb-2">
                      Company Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="signup-company"
                        type="text"
                        placeholder="Your company name"
                        value={signupForm.company}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, company: e.target.value }))}
                        required
                        className="pl-10 bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-orange-500/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="signup-password" className="block text-sm font-medium text-slate-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="signup-password"
                        type={showSignupPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={signupForm.password}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                        required
                        className="pl-10 pr-10 bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-orange-500/20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignupPassword(!showSignupPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                      >
                        {showSignupPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                                         <p className="text-xs text-slate-400 mt-1">Must be at least 8 characters long</p>
                  </div>

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      className="mt-1 rounded border-slate-600 bg-slate-800 text-orange-500 focus:ring-orange-500/20 focus:ring-offset-slate-900"
                    />
                    <span className="text-sm text-slate-300">
                      I agree to the{" "}
                      <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors">
                        Privacy Policy
                      </Link>
                    </span>
                  </div>

                                     <Button 
                     type="submit"
                     className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-base font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                     disabled={isLoading}
                   >
                     {isLoading ? "Creating Account..." : "Create Account"}
                   </Button>
                </form>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Additional info */}
          <div className="text-center mt-6">
            <p className="text-sm text-slate-400">
              {activeTab === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={() => setActiveTab("signup")}
                    className="text-orange-400 hover:text-orange-300 transition-colors font-medium"
                  >
                    Sign up here
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setActiveTab("login")}
                    className="text-orange-400 hover:text-orange-300 transition-colors font-medium"
                  >
                    Sign in here
                  </button>
                </>
              )}
            </p>
          </div>
        </m.div>
      </div>
    </div>
  );
}
