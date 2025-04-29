import { create } from 'zustand';
import { LinkedInProfile } from '../types';
import axios from 'axios';
import { BACKEND_API } from '../utils/constants';

interface MessageState {
  profile: LinkedInProfile;
  generatedMessage: string | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  updateProfile: (updates: Partial<LinkedInProfile>) => void;
  generateMessageFromProfile: () => Promise<void>;
  setGeneratedMessage: (message: string) => void;
  resetMessage: () => void;
}

const defaultProfile: LinkedInProfile = {
  name: '',
  job_title: '',
  company: '',
  location: '',
  summary: ''
};

export const useMessageStore = create<MessageState>((set, get) => ({
  profile: { ...defaultProfile },
  generatedMessage: null,
  isLoading: false,
  error: null,

  updateProfile: (updates: Partial<LinkedInProfile>) => {
    set(state => ({
      profile: { ...state.profile, ...updates }
    }));
  },

  generateMessageFromProfile: async () => {
    const { profile } = get();

    // Validate profile has required fields
    if (!profile.name || !profile.job_title || !profile.company) {
      set({ error: 'Name, job title, and company are required' });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      // Simulate API call
      const data = (await (axios.post(`${BACKEND_API}/personalized-message`, profile))).data

      console.log("personalize message response", data)

      set({
        generatedMessage: data?.data,
        isLoading: false
      });
    } catch (error) {
      set({
        error: 'Failed to generate message',
        isLoading: false
      });
    }
  },

  setGeneratedMessage: (message: string) => {
    set({ generatedMessage: message });
  },

  resetMessage: () => {
    set({
      profile: { ...defaultProfile },
      generatedMessage: null,
      error: null
    });
  }
}));