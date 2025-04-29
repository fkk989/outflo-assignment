import { create } from 'zustand';
import { Campaign } from '../types';
import axios from "axios"
import { BACKEND_API } from '../utils/constants';

interface CampaignState {
  campaigns: Campaign[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchCampaigns: () => Promise<void>;
  addCampaign: (campaign: Campaign) => Promise<void>;
  updateCampaign: (id: string, updates: Partial<Campaign>) => Promise<void>;
  deleteCampaign: (id: string) => Promise<void>;
  toggleCampaignStatus: (id: string) => Promise<void>;
}

export const useCampaignStore = create<CampaignState>((set, get) => ({
  campaigns: [],
  isLoading: false,
  error: null,

  fetchCampaigns: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      const campaigns = (await axios.get(`${BACKEND_API}/campaigns`)).data as {
        data: Campaign[]
      }

      set({ campaigns: campaigns.data, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch campaigns', isLoading: false });
    }
  },

  addCampaign: async (campaign: Campaign) => {
    set({ isLoading: true, error: null });
    try {

      await (axios.post(`${BACKEND_API}/campaigns`, campaign))

    } catch (error) {
      set({ error: 'Failed to add campaign', isLoading: false });
    }
  },

  updateCampaign: async (id: string, updates: Partial<Campaign>) => {
    set({ isLoading: true, error: null });
    try {
      console.log("id: ", id, " ", updates)

      await axios.put(`${BACKEND_API}/campaigns/${id}`, updates)

    } catch (error) {
      set({ error: 'Failed to update campaign', isLoading: false });
    }
  },

  deleteCampaign: async (id: string) => {
    set({ isLoading: true, error: null });
    try {

      await (axios.delete(`${BACKEND_API}/campaigns/${id}`))


    } catch (error) {
      set({ error: 'Failed to delete campaign', isLoading: false });
    }
  },

  toggleCampaignStatus: async (id: string) => {
    const { campaigns } = get();
    const campaign = campaigns.find(c => c._id === id);

    if (campaign) {
      const newStatus = campaign.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
      await get().updateCampaign(id, { status: newStatus });
    }
  },
}));