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
          listing_option: string
          name: string
          picture_id: number
          uploaded_by_user_id: number
        }
        Insert: {
          category_id: number
          created_at?: string
          description?: string | null
          id?: number
          listing_option: string
          name: string
          picture_id: number
          uploaded_by_user_id: number
        }
        Update: {
          category_id?: number
          created_at?: string
          description?: string | null
          id?: number
          listing_option?: string
          name?: string
          picture_id?: number
          uploaded_by_user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "item_picture_id_fkey"
            columns: ["picture_id"]
            isOneToOne: false
            referencedRelation: "picture"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_uploaded_by_user_id_fkey"
            columns: ["uploaded_by_user_id"]
            isOneToOne: false
            referencedRelation: "user"
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
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
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
