import { create } from "zustand";
import { AuthStore } from "./types";
import { createClient } from "@/utils/supabase/client";
import { IUser } from "@/lib/auth";

export const useAuthStore = create<AuthStore>((set) => ({
  isLogin: false,
  user: null,

  checkLoginStatus: async () => {
    const response = await fetch("/api/auth/status");
    const data = await response.json();
    if (data.isLogin) {
      try {
        const supabase = createClient();

        supabase.auth.onAuthStateChange(async (event, session) => {
          if (event === "SIGNED_IN" && session?.user) {
            set({
              user: {
                id: session.user.id,
                email: session.user.email || "",
                nickname: session.user.user_metadata?.nickname || "",
                profile_image: session.user.user_metadata?.profile_image || "",
              },
              isLogin: true,
            });
          } else {
            console.log("Logged out or no valid session");
          }
        });
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    }
  },
  setUser: (user: IUser) => {
    set({ user, isLogin: true });
  },
}));
