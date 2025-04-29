import React, { useState } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { useMessageStore } from "../../store/messageStore";
import Button from "../../components/Button";

const MessageDisplay: React.FC = () => {
  const { generatedMessage, generateMessageFromProfile, isLoading } =
    useMessageStore();
  const [isCopied, setIsCopied] = useState(false);
  const [_, setFeedback] = useState<"liked" | "disliked" | null>(null);

  if (!generatedMessage) return null;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(generatedMessage)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  const handleRegenerateMessage = () => {
    setFeedback(null);
    generateMessageFromProfile();
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          Generated Message
        </h2>
      </div>

      <div className="p-6">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 whitespace-pre-wrap font-mono text-sm">
          {generatedMessage}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              icon={<Copy className="w-4 h-4" />}
            >
              {isCopied ? "Copied!" : "Copy Message"}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRegenerateMessage}
              isLoading={isLoading}
              icon={<RefreshCw className="w-4 h-4" />}
            >
              Regenerate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageDisplay;
