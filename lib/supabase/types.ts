export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          service: string | null
          message: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          service?: string | null
          message: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          service?: string | null
          message?: string
          is_read?: boolean
          created_at?: string
        }
      }
      services: {
        Row: {
          id: string
          slug: string
          title: string
          description: string | null
          icon: string | null
          features: Json | null
          price_info: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          description?: string | null
          icon?: string | null
          features?: Json | null
          price_info?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          description?: string | null
          icon?: string | null
          features?: Json | null
          price_info?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
      company_stats: {
        Row: {
          id: string
          label: string
          value: string
          unit: string | null
          sort_order: number
        }
        Insert: {
          id?: string
          label: string
          value: string
          unit?: string | null
          sort_order?: number
        }
        Update: {
          id?: string
          label?: string
          value?: string
          unit?: string | null
          sort_order?: number
        }
      }
    }
  }
}

export type ContactMessage = Database['public']['Tables']['contact_messages']['Row']
export type Service = Database['public']['Tables']['services']['Row']
export type CompanyStat = Database['public']['Tables']['company_stats']['Row']
