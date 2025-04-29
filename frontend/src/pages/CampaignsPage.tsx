import React, { useState } from 'react';
import CampaignList from '../features/campaigns/CampaignList';
import CampaignForm from '../features/campaigns/CampaignForm';

enum CampaignView {
  LIST = 'list',
  CREATE = 'create',
  EDIT = 'edit'
}

const CampaignsPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<CampaignView>(CampaignView.LIST);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | undefined>(undefined);
  
  const handleAddNew = () => {
    setSelectedCampaignId(undefined);
    setCurrentView(CampaignView.CREATE);
  };
  
  const handleSelectCampaign = (id: string) => {
    setSelectedCampaignId(id);
    setCurrentView(CampaignView.EDIT);
  };
  
  const handleSave = () => {
    setCurrentView(CampaignView.LIST);
  };
  
  const handleCancel = () => {
    setCurrentView(CampaignView.LIST);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {currentView === CampaignView.LIST && (
        <CampaignList 
          onAddNew={handleAddNew} 
          onSelectCampaign={handleSelectCampaign} 
        />
      )}
      
      {(currentView === CampaignView.CREATE || currentView === CampaignView.EDIT) && (
        <CampaignForm 
          campaignId={selectedCampaignId} 
          onCancel={handleCancel}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default CampaignsPage;