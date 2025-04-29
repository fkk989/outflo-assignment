import React from "react";
import { Calendar, Users, Link, ChevronRight } from "lucide-react";
import { Campaign } from "../../types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/Card";
import Badge from "../../components/Badge";
import Toggle from "../../components/Toggle";

interface CampaignCardProps {
  campaign: Campaign;
  onClick: () => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onClick }) => {
  const handleToggleStatus = (e: React.MouseEvent) => {
    e.stopPropagation();
    // toggleCampaignStatus(campaign.id!);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";

    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card
      hoverable
      className="transition-all duration-200 hover:translate-y-[-2px]"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{campaign.name}</CardTitle>
            <CardDescription className="mt-1">
              {campaign.description}
            </CardDescription>
          </div>
          <Toggle
            size="sm"
            checked={campaign.status === "ACTIVE"}
            onChange={() => {}}
            onClick={handleToggleStatus}
            label={campaign.status === "ACTIVE" ? "ACTIVE" : "INACTIVE"}
            disabled={true}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Created on {formatDate(campaign.createdAt)}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Users className="h-4 w-4 mr-2" />
          <span>
            {campaign.leads.length} lead{campaign.leads.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Link className="h-4 w-4 mr-2" />
          <span>
            {campaign.accountIDs.length} account
            {campaign.accountIDs.length !== 1 ? "s" : ""}
          </span>
        </div>
      </CardContent>

      <CardFooter className="bg-gray-50 justify-between">
        <Badge
          variant={campaign.status === "ACTIVE" ? "success" : "default"}
          size="md"
        >
          {campaign.status === "ACTIVE" ? "ACTIVE" : "INACTIVE"}
        </Badge>

        <div className="flex items-center text-blue-600 text-sm font-medium">
          <span>View Details</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default CampaignCard;
