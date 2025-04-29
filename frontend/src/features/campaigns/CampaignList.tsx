import React, { useEffect, useState } from "react";
import { PlusCircle, Filter, Search } from "lucide-react";
import { useCampaignStore } from "../../store/campaignStore";
import CampaignCard from "./CampaignCard";
import Button from "../../components/Button";
import Input from "../../components/Input";

interface CampaignListProps {
  onAddNew: () => void;
  onSelectCampaign: (id: string) => void;
}

const CampaignList: React.FC<CampaignListProps> = ({
  onAddNew,
  onSelectCampaign,
}) => {
  const { campaigns, isLoading, error, fetchCampaigns } = useCampaignStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "ACTIVE" | "INACTIVE"
  >("all");

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || campaign.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const activeCampaignsCount = campaigns.filter(
    (c) => c.status === "ACTIVE"
  ).length;
  const inactiveCampaignsCount = campaigns.filter(
    (c) => c.status === "INACTIVE"
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage your outreach campaigns
          </p>
        </div>
        <Button
          variant="primary"
          icon={<PlusCircle className="w-4 h-4" />}
          onClick={onAddNew}
        >
          New Campaign
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Total Campaigns</p>
          <p className="text-2xl font-semibold mt-1">{campaigns.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Active Campaigns</p>
          <p className="text-2xl font-semibold mt-1 text-emerald-600">
            {activeCampaignsCount}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Inactive Campaigns</p>
          <p className="text-2xl font-semibold mt-1 text-gray-600">
            {inactiveCampaignsCount}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="h-4 w-4 text-gray-500" />}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as "all" | "ACTIVE" | "INACTIVE")
            }
          >
            <option value="all">All Status</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </div>
      </div>

      {/* Campaign Cards */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-md border border-red-200 text-red-700">
          {error}
        </div>
      ) : filteredCampaigns.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            No campaigns found. Create your first campaign!
          </p>
          <Button variant="primary" className="mt-4" onClick={onAddNew}>
            Create Campaign
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign._id}
              campaign={campaign}
              onClick={() => onSelectCampaign(campaign._id!)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignList;
