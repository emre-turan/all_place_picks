// types.d.ts
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add this line
      role: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
