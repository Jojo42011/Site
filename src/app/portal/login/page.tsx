"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PortalLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: accept any non-empty username/password
    if (username && password) {
      localStorage.setItem("aethon_authenticated", "true");
      localStorage.setItem("aethon_user", JSON.stringify({ name: username }));
      router.push("/portal");
    } else {
      setError("Please enter username and password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-500/30 via-orange-500/40 to-slate-950">
      <Card className="w-full max-w-md mx-auto bg-slate-900/80 border border-orange-500/30 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-orange-400">Aethon Portal Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-orange-300 mb-1">Username</label>
              <Input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="bg-slate-800 border-orange-500/30 text-white"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-orange-300 mb-1">Password</label>
              <Input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="bg-slate-800 border-orange-500/30 text-white"
                placeholder="Enter your password"
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-lg">Login</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
