import React from "react";
import { Profile } from "../../types/index";
import ProfileImage from "./ProfileImage";
import ExternalLink from "./ExternalLink";

interface ContactRowProps {
  contact: Profile;
}

const ContactRow: React.FC<ContactRowProps> = ({ contact }) => {
  return (
    <tr className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-150">
      <td className="py-4 pl-4 pr-2">
        <div className="flex items-center">
          <ProfileImage src={contact?.profileImageUrl} alt={contact?.name} />
          <span className="ml-3 font-medium text-gray-900">
            {contact?.name}
          </span>
        </div>
      </td>

      <td className="px-2 py-4 text-sm text-gray-600">
        {contact?.jobTitle !== "/" ? contact?.jobTitle : ""}
      </td>
      <td className="px-2 py-4 text-sm text-gray-600">
        {contact?.company !== "/" ? contact?.company : ""}
      </td>
      <td className="px-2 py-4 text-sm text-gray-600">{contact?.location}</td>
      <td className="px-2 py-4 text-sm text-[#1C4ED8] hover:text-blue-500">
        <a href={contact?.profileUrl} target="_blank">
          <div className="flex items-center">
            <span className="truncate max-w-[200px]">
              {contact?.profileUrl}
            </span>
            <ExternalLink href={contact?.profileUrl} />
          </div>
        </a>
      </td>
    </tr>
  );
};

export default ContactRow;
