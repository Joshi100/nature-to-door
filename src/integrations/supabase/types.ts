export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      customers: {
        Row: {
          created_at: string | null
          delivery_address: Json | null
          id: string
          preferences: Json | null
          profile_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          delivery_address?: Json | null
          id?: string
          preferences?: Json | null
          profile_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          delivery_address?: Json | null
          id?: string
          preferences?: Json | null
          profile_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      producers: {
        Row: {
          business_hours: Json | null
          business_name: string | null
          business_type: string | null
          contact_phone: string | null
          created_at: string | null
          id: string
          pickup_address: string | null
          pickup_location: Json | null
          profile_id: string
          updated_at: string | null
          verification_status: string | null
        }
        Insert: {
          business_hours?: Json | null
          business_name?: string | null
          business_type?: string | null
          contact_phone?: string | null
          created_at?: string | null
          id?: string
          pickup_address?: string | null
          pickup_location?: Json | null
          profile_id: string
          updated_at?: string | null
          verification_status?: string | null
        }
        Update: {
          business_hours?: Json | null
          business_name?: string | null
          business_type?: string | null
          contact_phone?: string | null
          created_at?: string | null
          id?: string
          pickup_address?: string | null
          pickup_location?: Json | null
          profile_id?: string
          updated_at?: string | null
          verification_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "producers_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          available_for_pickup: boolean | null
          category: string | null
          created_at: string | null
          description: string | null
          expiry_date: string | null
          harvest_date: string | null
          id: string
          images: Json | null
          name: string
          organic_certified: boolean | null
          pickup_instructions: string | null
          price: number | null
          producer_id: string
          stock_quantity: number | null
          unit: string | null
          updated_at: string | null
        }
        Insert: {
          available_for_pickup?: boolean | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          expiry_date?: string | null
          harvest_date?: string | null
          id?: string
          images?: Json | null
          name: string
          organic_certified?: boolean | null
          pickup_instructions?: string | null
          price?: number | null
          producer_id: string
          stock_quantity?: number | null
          unit?: string | null
          updated_at?: string | null
        }
        Update: {
          available_for_pickup?: boolean | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          expiry_date?: string | null
          harvest_date?: string | null
          id?: string
          images?: Json | null
          name?: string
          organic_certified?: boolean | null
          pickup_instructions?: string | null
          price?: number | null
          producer_id?: string
          stock_quantity?: number | null
          unit?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "producers"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      transport: {
        Row: {
          availability_status: string | null
          coverage_areas: Json | null
          created_at: string | null
          id: string
          license_number: string | null
          profile_id: string
          updated_at: string | null
          vehicle_capacity: number | null
          vehicle_type: string | null
          verification_status: string | null
        }
        Insert: {
          availability_status?: string | null
          coverage_areas?: Json | null
          created_at?: string | null
          id?: string
          license_number?: string | null
          profile_id: string
          updated_at?: string | null
          vehicle_capacity?: number | null
          vehicle_type?: string | null
          verification_status?: string | null
        }
        Update: {
          availability_status?: string | null
          coverage_areas?: Json | null
          created_at?: string | null
          id?: string
          license_number?: string | null
          profile_id?: string
          updated_at?: string | null
          vehicle_capacity?: number | null
          vehicle_type?: string | null
          verification_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transport_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: "producer" | "customer" | "transport"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["producer", "customer", "transport"],
    },
  },
} as const
