"use client";

import Link from "next/link";
import { Mail, Phone, Calendar } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t premium-border bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold text-black">Aethon</span>
            </div>
            <p className="text-gray-600 text-base leading-relaxed max-w-md">
              Build or create custom voice automations with built-in integrations. Configure however you want. Deploy in minutes, start selling today. Built for agency owners.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-black font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/pricing" className="text-gray-600 hover:text-black transition-colors font-medium">
                  Browse Voice Automations
                </Link>
              </li>
              <li>
                <a
                  href="https://renovated-detailing-voice-agent.fly.dev/demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition-colors font-medium"
                >
                  Try Demo
                </a>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-600 hover:text-black transition-colors font-medium">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-black font-bold text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a href="mailto:aethonintelligence@gmail.com" className="flex items-center space-x-3 text-gray-600 hover:text-black transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="font-medium">aethonintelligence@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+17373461943" className="flex items-center space-x-3 text-gray-600 hover:text-black transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="font-medium">(737) 346-1943</span>
                </a>
              </li>
              <li>
                <a href="https://calendly.com/jahanfraction/15-minute-demo" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-gray-600 hover:text-black transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <span className="font-medium">Schedule a Call</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t premium-border pt-8 flex flex-col md:flex-row items-center justify-between text-sm">
          <p className="text-gray-600 font-medium">© 2024 Aethon. All rights reserved.</p>
          <div className="flex items-center space-x-8 mt-4 md:mt-0">
            <Link href="/legal" className="text-gray-600 hover:text-black transition-colors font-medium">
              Privacy Policy
            </Link>
            <Link href="/legal" className="text-gray-600 hover:text-black transition-colors font-medium">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
