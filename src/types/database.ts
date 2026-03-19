export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          phone: string | null
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          created_at?: string
        }
      }
      cars: {
        Row: {
          id: string
          user_id: string
          title: string
          brand: string
          model: string
          year: number
          price: number
          description: string | null
          mileage: number | null
          fuel_type: 'gasolina' | 'diesel' | 'electrico' | 'hibrido' | null
          transmission: 'automatico' | 'manual' | null
          color: string | null
          image_url: string | null
          images: string[] | null
          location: string | null
          status: 'disponible' | 'vendido' | 'reservado'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          brand: string
          model: string
          year: number
          price: number
          description?: string | null
          mileage?: number | null
          fuel_type?: 'gasolina' | 'diesel' | 'electrico' | 'hibrido' | null
          transmission?: 'automatico' | 'manual' | null
          color?: string | null
          image_url?: string | null
          images?: string[] | null
          location?: string | null
          status?: 'disponible' | 'vendido' | 'reservado'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          brand?: string
          model?: string
          year?: number
          price?: number
          description?: string | null
          mileage?: number | null
          fuel_type?: 'gasolina' | 'diesel' | 'electrico' | 'hibrido' | null
          transmission?: 'automatico' | 'manual' | null
          color?: string | null
          image_url?: string | null
          images?: string[] | null
          location?: string | null
          status?: 'disponible' | 'vendido' | 'reservado'
          created_at?: string
          updated_at?: string
        }
      }
      conversations: {
        Row: {
          id: string
          car_id: string
          buyer_id: string
          seller_id: string
          created_at: string
        }
        Insert: {
          id?: string
          car_id: string
          buyer_id: string
          seller_id: string
          created_at?: string
        }
        Update: {
          id?: string
          car_id?: string
          buyer_id?: string
          seller_id?: string
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          sender_id: string
          content: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          sender_id: string
          content: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          sender_id?: string
          content?: string
          read?: boolean
          created_at?: string
        }
      }
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
