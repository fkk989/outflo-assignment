export interface Campaign {
  _id?: string;
  name: string;
  description: string;
  status: "ACTIVE" | "INACTIVE";
  leads: string[];
  accountIDs: string[];
  createdAt?: string;
}

export interface LinkedInProfile {
  name: string;
  job_title: string;
  company: string;
  location: string;
  summary: string;
}

export interface Profile {
  _id: string;
  name: string;
  jobTitle: string;
  company: string;
  location: string;
  profileUrl: string;
  profileImageUrl: string;
}
