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
      category: {
        Row: {
          created_at: string | null
          id: number
          lowercase_name: string | null
          name: string
          picture_url: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          lowercase_name?: string | null
          name: string
          picture_url?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          lowercase_name?: string | null
          name?: string
          picture_url?: string | null
        }
        Relationships: []
      }
      item: {
        Row: {
          category_id: number
          created_at: string
          description: string | null
          id: number
          name: string
          picture_id: number
          upload_by_user_id: string | null
        }
        Insert: {
          category_id: number
          created_at?: string
          description?: string | null
          id?: number
          name: string
          picture_id: number
          upload_by_user_id?: string | null
        }
        Update: {
          category_id?: number
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          picture_id?: number
          upload_by_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "item_picture_id_fkey"
            columns: ["picture_id"]
            isOneToOne: false
            referencedRelation: "picture"
            referencedColumns: ["id"]
          }
        ]
      }
      picture: {
        Row: {
          created_at: string
          id: number
          url: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          url?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          url?: string | null
        }
        Relationships: []
      }
      user: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          name: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          name?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
