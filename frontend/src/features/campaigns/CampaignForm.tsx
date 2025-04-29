import React, { useState, useEffect } from "react";
import { X, Save, Trash2, ArrowLeft } from "lucide-react";
import { Campaign } from "../../types";
import { useCampaignStore } from "../../store/campaignStore";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Toggle from "../../components/Toggle";

interface CampaignFormProps {
  campaignId?: string;
  onCancel: () => void;
  onSave: () => void;
}

const CampaignForm: React.FC<CampaignFormProps> = ({
  campaignId,
  onCancel,
  onSave,
}) => {
  const { campaigns, addCampaign, updateCampaign, deleteCampaign } =
    useCampaignStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // if campaignId is passed it will be true or it will be false
  const isEditing = !!campaignId;
  const campaignToEdit = isEditing
    ? campaigns.find((c) => c._id === campaignId)
    : undefined;

  const [formData, setFormData] = useState<Campaign>({
    name: "",
    description: "",
    status: "INACTIVE",
    leads: [],
    accountIDs: [],
  });

  const [leadsText, setLeadsText] = useState("");
  const [accountsText, setAccountsText] = useState("");

  useEffect(() => {
    if (campaignToEdit) {
      setFormData({ ...campaignToEdit });
      setLeadsText(campaignToEdit.leads.join("\n"));
      setAccountsText(campaignToEdit.accountIDs.join("\n"));
    }
  }, [campaignToEdit]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleLeadsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setLeadsText(value);

    // Parse leads from textarea (one per line)
    const leads = value
      .split("\n")
      .map((lead) => lead.trim())
      .filter((lead) => lead.length > 0);

    setFormData((prev) => ({ ...prev, leads }));
  };

  const handleAccountsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setAccountsText(value);

    // Parse account IDs from textarea (one per line)
    const accountIDs = value
      .split("\n")
      .map((id) => id.trim())
      .filter((id) => id.length > 0);

    setFormData((prev) => ({ ...prev, accountIDs }));
  };

  const handleStatusChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      status: checked ? "ACTIVE" : "INACTIVE",
    }));
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "Campaign name is required";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }

    if (formData.leads.length === 0) {
      errors.leads = "At least one lead is required";
    }

    if (formData.accountIDs.length === 0) {
      errors.accountIDs = "At least one account ID is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (isEditing && campaignId) {
        await updateCampaign(campaignId, formData);
      } else {
        await addCampaign(formData);
      }
      onSave();
    } catch (error) {
      console.error("Error saving campaign:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!campaignId) return;

    if (window.confirm("Are you sure you want to delete this campaign?")) {
      setIsSubmitting(true);
      try {
        await deleteCampaign(campaignId);
        onCancel();
      } catch (error) {
        console.error("Error deleting campaign:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="mr-2"
            icon={<ArrowLeft className="w-4 h-4" />}
          />
          <h2 className="text-lg font-semibold text-gray-900">
            {isEditing ? "Edit Campaign" : "Create New Campaign"}
          </h2>
        </div>
        <div className="flex gap-2">
          {isEditing && (
            <Button
              variant="danger"
              size="sm"
              onClick={handleDelete}
              icon={<Trash2 className="w-4 h-4" />}
              disabled={isSubmitting}
            >
              Delete
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
            icon={<X className="w-4 h-4" />}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            icon={<Save className="w-4 h-4" />}
            isLoading={isSubmitting}
          >
            Save
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Input
              label="Campaign Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              error={formErrors.name}
              placeholder="Enter campaign name"
              required
            />

            <Textarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              error={formErrors.description}
              placeholder="Describe the purpose of this campaign"
              required
            />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Campaign Status
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Toggle to activate or deactivate this campaign
                </p>
              </div>
              <Toggle
                checked={formData.status === "ACTIVE"}
                onChange={handleStatusChange}
                label={formData.status === "ACTIVE" ? "ACTIVE" : "INACTIVE"}
              />
            </div>
          </div>

          <div className="space-y-6">
            <Textarea
              label="LinkedIn Profile URLs (one per line)"
              value={leadsText}
              onChange={handleLeadsChange}
              error={formErrors.leads}
              placeholder="https://linkedin.com/in/profile-1
https://linkedin.com/in/profile-2
https://linkedin.com/in/profile-3"
              required
            />

            <Textarea
              label="Account IDs (one per line)"
              value={accountsText}
              onChange={handleAccountsChange}
              error={formErrors.accountIDs}
              placeholder="123
456
789"
              required
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CampaignForm;
