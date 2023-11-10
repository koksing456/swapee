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
      Category: {
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
      Item: {
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
            foreignKeyName: "Item_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "Category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Item_picture_id_fkey"
            columns: ["picture_id"]
            isOneToOne: false
            referencedRelation: "Picture"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Item_uploaded_by_user_id_fkey"
            columns: ["uploaded_by_user_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      Picture: {
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
      User: {
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
