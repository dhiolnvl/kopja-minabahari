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
          image: string | null
          image2: string | null
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
          image?: string | null
          image2?: string | null
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
          image?: string | null
          image2?: string | null
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
      news: {
        Row: {
          id: string
          slug: string
          title: string
          excerpt: string | null
          content: string
          image: string | null
          author: string
          published_at: string
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          excerpt?: string | null
          content: string
          image?: string | null
          author?: string
          published_at?: string
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          excerpt?: string | null
          content?: string
          image?: string | null
          author?: string
          published_at?: string
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      admin_users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
      certificates: {
        Row: {
          id: string
          title: string
          issuer: string
          issue_date: string | null
          description: string | null
          image: string | null
          certificate_number: string | null
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          issuer: string
          issue_date?: string | null
          description?: string | null
          image?: string | null
          certificate_number?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          issuer?: string
          issue_date?: string | null
          description?: string | null
          image?: string | null
          certificate_number?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      gallery: {
        Row: {
          id: string
          title: string
          description: string | null
          image: string | null
          category: string | null
          is_active: boolean
          sort_order: number
          created_at: string
          video_url: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          image?: string | null
          category?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          video_url?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          image?: string | null
          category?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          video_url?: string | null
        }
      }
    }
  }
}

export type ContactMessage = Database['public']['Tables']['contact_messages']['Row']
export type Service = Database['public']['Tables']['services']['Row']
export type CompanyStat = Database['public']['Tables']['company_stats']['Row']
export type News = Database['public']['Tables']['news']['Row']
export type AdminUser = Database['public']['Tables']['admin_users']['Row']
export type Certificate = Database['public']['Tables']['certificates']['Row']
export type Gallery = Database['public']['Tables']['gallery']['Row']
