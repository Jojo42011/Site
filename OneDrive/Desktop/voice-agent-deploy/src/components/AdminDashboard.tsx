// Main admin dashboard component - accessible at /admin route
import React from 'react';
import AgentManager from '../admin/AgentManager';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-white text-black" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      <div className="border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', fontWeight: 600 }}>Aethon</h1>
            <p className="text-black/60 text-sm mt-1">
              Edit the active agent in this repo (no new agents are created here).
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="/demo"
              className="px-4 py-2 bg-black text-white hover:bg-black/90 rounded-md text-sm font-medium transition-colors"
            >
              Open Voice Demo
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <AgentManager />
      </div>
    </div>
  );
}


