"use client";

import Link from "next/link";
import { Mail, Phone, Calendar } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-gray-200 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">Aethon</span>
            </div>
            <p className="text-gray-600 text-sm">
              Private LLMs and AI agents that cost 80-90% less than cloud APIs. Your servers, your models, your control.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:aethonintelligence@gmail.com" className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>aethonintelligence@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+17373461943" className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>(737) 346-1943</span>
                </a>
              </li>
              <li>
                <a href="https://calendly.com/jahanfraction/15-minute-demo" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Demo</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p className="text-gray-600">© 2024 Aethon. All rights reserved.</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link href="/legal" className="text-gray-600 hover:text-purple-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/legal" className="text-gray-600 hover:text-purple-600 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
