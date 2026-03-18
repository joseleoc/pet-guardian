export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      appointment_types: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          type_name: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: never;
          type_name?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: never;
          type_name?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      appointment_updates: {
        Row: {
          appointment_id: string | null;
          created_at: string;
          id: string;
          notes: string | null;
          status: string | null;
          update_time: string | null;
          updated_at: string;
        };
        Insert: {
          appointment_id?: string | null;
          created_at?: string;
          id?: never;
          notes?: string | null;
          status?: string | null;
          update_time?: string | null;
          updated_at?: string;
        };
        Update: {
          appointment_id?: string | null;
          created_at?: string;
          id?: never;
          notes?: string | null;
          status?: string | null;
          update_time?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'appointment_updates_appointment_id_fkey';
            columns: ['appointment_id'];
            isOneToOne: false;
            referencedRelation: 'appointments';
            referencedColumns: ['id'];
          },
        ];
      };
      appointments: {
        Row: {
          appointment_date: string | null;
          appointment_type_id: string | null;
          clinic_id: string | null;
          created_at: string;
          doctor_id: string | null;
          id: string;
          pet_id: string | null;
          reason: string | null;
          status: string | null;
          updated_at: string;
        };
        Insert: {
          appointment_date?: string | null;
          appointment_type_id?: string | null;
          clinic_id?: string | null;
          created_at?: string;
          doctor_id?: string | null;
          id?: never;
          pet_id?: string | null;
          reason?: string | null;
          status?: string | null;
          updated_at?: string;
        };
        Update: {
          appointment_date?: string | null;
          appointment_type_id?: string | null;
          clinic_id?: string | null;
          created_at?: string;
          doctor_id?: string | null;
          id?: never;
          pet_id?: string | null;
          reason?: string | null;
          status?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'appointments_appointment_type_id_fkey';
            columns: ['appointment_type_id'];
            isOneToOne: false;
            referencedRelation: 'appointment_types';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'appointments_clinic_id_fkey';
            columns: ['clinic_id'];
            isOneToOne: false;
            referencedRelation: 'clinics';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'appointments_doctor_id_fkey';
            columns: ['doctor_id'];
            isOneToOne: false;
            referencedRelation: 'veterinarians';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'appointments_pet_id_fkey';
            columns: ['pet_id'];
            isOneToOne: false;
            referencedRelation: 'pets';
            referencedColumns: ['id'];
          },
        ];
      };
      clinic_schedule: {
        Row: {
          clinic_id: string;
          schedule_hour_end: string | null;
          schedule_hour_start: string | null;
          week_day_id: number;
        };
        Insert: {
          clinic_id: string;
          schedule_hour_end?: string | null;
          schedule_hour_start?: string | null;
          week_day_id: number;
        };
        Update: {
          clinic_id?: string;
          schedule_hour_end?: string | null;
          schedule_hour_start?: string | null;
          week_day_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'clinic_schedule_clinic_id_fkey';
            columns: ['clinic_id'];
            isOneToOne: false;
            referencedRelation: 'clinics';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'clinic_schedule_week_day_id_fkey';
            columns: ['week_day_id'];
            isOneToOne: false;
            referencedRelation: 'week_days';
            referencedColumns: ['id'];
          },
        ];
      };
      clinics: {
        Row: {
          address: string | null;
          avatar_id: string | null;
          created_at: string;
          id: string;
          latitude: number | null;
          longitude: number | null;
          name: string | null;
          phone_number: string | null;
          updated_at: string;
        };
        Insert: {
          address?: string | null;
          avatar_id?: string | null;
          created_at?: string;
          id?: never;
          latitude?: number | null;
          longitude?: number | null;
          name?: string | null;
          phone_number?: string | null;
          updated_at?: string;
        };
        Update: {
          address?: string | null;
          avatar_id?: string | null;
          created_at?: string;
          id?: never;
          latitude?: number | null;
          longitude?: number | null;
          name?: string | null;
          phone_number?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      owners: {
        Row: {
          avatar_id: string | null;
          created_at: string;
          email: string | null;
          id: string;
          name: string | null;
          phone_number: string | null;
          role_id: string | null;
          updated_at: string;
        };
        Insert: {
          avatar_id?: string | null;
          created_at?: string;
          email?: string | null;
          id?: never;
          name?: string | null;
          phone_number?: string | null;
          role_id?: string | null;
          updated_at?: string;
        };
        Update: {
          avatar_id?: string | null;
          created_at?: string;
          email?: string | null;
          id?: never;
          name?: string | null;
          phone_number?: string | null;
          role_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'owners_role_id_fkey';
            columns: ['role_id'];
            isOneToOne: false;
            referencedRelation: 'roles';
            referencedColumns: ['id'];
          },
        ];
      };
      pets: {
        Row: {
          age: number | null;
          avatar: string | null;
          avatar_id: string | null;
          breed: string | null;
          created_at: string;
          id: string;
          name: string | null;
          owner_id: string | null;
          species: string | null;
          updated_at: string;
        };
        Insert: {
          age?: number | null;
          avatar?: string | null;
          avatar_id?: string | null;
          breed?: string | null;
          created_at?: string;
          id?: never;
          name?: string | null;
          owner_id?: string | null;
          species?: string | null;
          updated_at?: string;
        };
        Update: {
          age?: number | null;
          avatar?: string | null;
          avatar_id?: string | null;
          breed?: string | null;
          created_at?: string;
          id?: never;
          name?: string | null;
          owner_id?: string | null;
          species?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'pets_owner_id_fkey';
            columns: ['owner_id'];
            isOneToOne: false;
            referencedRelation: 'owners';
            referencedColumns: ['id'];
          },
        ];
      };
      roles: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          role_name: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: never;
          role_name?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: never;
          role_name?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      veterinarian_clinic: {
        Row: {
          clinic_id: string;
          role_id: string | null;
          veterinarian_id: string;
        };
        Insert: {
          clinic_id: string;
          role_id?: string | null;
          veterinarian_id: string;
        };
        Update: {
          clinic_id?: string;
          role_id?: string | null;
          veterinarian_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'veterinarian_clinic_clinic_id_fkey';
            columns: ['clinic_id'];
            isOneToOne: false;
            referencedRelation: 'clinics';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'veterinarian_clinic_role_id_fkey';
            columns: ['role_id'];
            isOneToOne: false;
            referencedRelation: 'roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'veterinarian_clinic_veterinarian_id_fkey';
            columns: ['veterinarian_id'];
            isOneToOne: false;
            referencedRelation: 'veterinarians';
            referencedColumns: ['id'];
          },
        ];
      };
      veterinarians: {
        Row: {
          avatar_id: string | null;
          created_at: string;
          email: string | null;
          id: string;
          name: string | null;
          phone_number: string | null;
          specialty: string | null;
          updated_at: string;
        };
        Insert: {
          avatar_id?: string | null;
          created_at?: string;
          email?: string | null;
          id?: never;
          name?: string | null;
          phone_number?: string | null;
          specialty?: string | null;
          updated_at?: string;
        };
        Update: {
          avatar_id?: string | null;
          created_at?: string;
          email?: string | null;
          id?: never;
          name?: string | null;
          phone_number?: string | null;
          specialty?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      week_days: {
        Row: {
          id: number;
          name: string | null;
        };
        Insert: {
          id?: never;
          name?: string | null;
        };
        Update: {
          id?: never;
          name?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      can_access_pet: {
        Args: { target_pet_id: string };
        Returns: boolean;
      };
      current_owner_id: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
