import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Bug {
  id: string
  title: string
  description: string | null
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  status: 'Open' | 'In Progress' | 'Testing' | 'Closed' | 'Resolved'
  tags: string[] | null
  assignee_name: string | null
  reporter_name: string
  created_at: string
  updated_at: string
} 