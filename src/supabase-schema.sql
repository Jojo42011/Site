-- Simple SQL for Aethon Landing Page Contact Form
-- Run this in your Supabase SQL editor

-- Create contact_inquiries table for the main landing page form
CREATE TABLE contact_inquiries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    phone VARCHAR(20),
    industry VARCHAR(100),
    timeline VARCHAR(50),
    budget VARCHAR(50),
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow public to insert contact inquiries (for the landing page form)
CREATE POLICY "Allow public to insert contact inquiries" ON contact_inquiries
    FOR INSERT WITH CHECK (true);

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON contact_inquiries TO anon, authenticated;
