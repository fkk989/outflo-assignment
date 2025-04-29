import React, { useState } from 'react';
import { CornerDownLeft, Sparkles } from 'lucide-react';
import { useMessageStore } from '../../store/messageStore';
import { LinkedInProfile } from '../../types';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';
import { sampleProfile } from '../../utils/mockData';

const MessageForm: React.FC = () => {
  const { profile, updateProfile, generateMessageFromProfile, isLoading, error } = useMessageStore();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateProfile({ [name]: value } as Partial<LinkedInProfile>);
    
    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!profile.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!profile.job_title.trim()) {
      errors.job_title = 'Job title is required';
    }
    
    if (!profile.company.trim()) {
      errors.company = 'Company is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    generateMessageFromProfile();
  };

  const handleLoadSample = () => {
    Object.entries(sampleProfile).forEach(([key, value]) => {
      updateProfile({ [key]: value } as Partial<LinkedInProfile>);
    });
    setFormErrors({});
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">LinkedIn Profile Information</h2>
        <p className="text-sm text-gray-600">
          Enter the LinkedIn profile information to generate a personalized message
        </p>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            error={formErrors.name}
            required
          />
          
          <Input
            label="Job Title"
            name="job_title"
            value={profile.job_title}
            onChange={handleInputChange}
            placeholder="Software Engineer"
            error={formErrors.job_title}
            required
          />
          
          <Input
            label="Company"
            name="company"
            value={profile.company}
            onChange={handleInputChange}
            placeholder="TechCorp"
            error={formErrors.company}
            required
          />
          
          <Input
            label="Location"
            name="location"
            value={profile.location}
            onChange={handleInputChange}
            placeholder="San Francisco, CA"
          />
          
          <div className="md:col-span-2">
            <Textarea
              label="Profile Summary"
              name="summary"
              value={profile.summary}
              onChange={handleInputChange}
              placeholder="Experienced professional with expertise in..."
              className="min-h-[120px]"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleLoadSample}
            icon={<Sparkles className="w-4 h-4" />}
          >
            Load Sample
          </Button>
          
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            icon={<CornerDownLeft className="w-4 h-4" />}
            disabled={isLoading}
          >
            Generate Message
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;