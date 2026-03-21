// UserBuilder for Expo app test data
import { User } from "@supabase/supabase-js";

// Helper: generate a random string (for id, email, etc.)
function randomString(length = 8) {
  return Math.random().toString(36).substring(2, 2 + length);
}

export class UserBuilder {
  private user: User;

  constructor() {
    const now = new Date().toISOString();
    this.user = {
      id: randomString(12),
      app_metadata: { provider: 'email', providers: ['email'] },
      user_metadata: {},
      aud: 'authenticated',
      email: `user_${randomString(5)}@enterprise.com`,
      created_at: now,
      role: 'authenticated',
      // Optional fields
      confirmed_at: now,
      email_confirmed_at: now,
      last_sign_in_at: now,
      updated_at: now,
      identities: [],
      factors: [],
    } as User;
  }

  withEmail(email: string): this {
    this.user.email = email;
    return this;
  }

  withRole(role: string): this {
    this.user.role = role;
    return this;
  }

  withCustomData(data: Partial<User>): this {
    this.user = { ...this.user, ...data };
    return this;
  }

  build(): User {
    return { ...this.user };
  }
}
