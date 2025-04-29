import React from 'react';
import MessageForm from '../features/messageGenerator/MessageForm';
import MessageDisplay from '../features/messageGenerator/MessageDisplay';
import { useMessageStore } from '../store/messageStore';

const MessageGeneratorPage: React.FC = () => {
  const { generatedMessage } = useMessageStore();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">LinkedIn Message Generator</h1>
        <p className="text-sm text-gray-600 mt-1">
          Create personalized outreach messages based on LinkedIn profile information
        </p>
      </div>
      
      <div className="space-y-8">
        <MessageForm />
        
        {generatedMessage && (
          <MessageDisplay />
        )}
      </div>
    </div>
  );
};

export default MessageGeneratorPage;