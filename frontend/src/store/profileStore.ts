import { create } from 'zustand';
import { Profile } from '../types';
import axios from 'axios';
import { BACKEND_API } from '../utils/constants';

interface MessageState {
  profiles: Profile[]
  fetchProfiles: () => void
}



export const useProfileStore = create<MessageState>((set, get) => ({
  profiles: [],
  fetchProfiles: async () => {
    const data = (await axios.get(`${BACKEND_API}/scraped-data`)).data as { data: Profile[] }

    set({ profiles: data?.data })
  },
}));