import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios, { AxiosError } from "axios";

export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

const api = axios.create({
  baseURL: `${BACKEND_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

interface StoreState {
  sendMail: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    projectType: string;
    message: string;
  }) => Promise<void>;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      sendMail: async (data) => {
        set({});
        try {
          const response = await api.post("/send/mail", data);
        } catch (error: unknown) {
          console.error("Mail Sending failed:", error);
          throw error;
        }
      },
    }),
    {
      name: "replayStore",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useStore;
