import React, { useState } from "react";
import { Profile } from "../../types/index";
import ContactRow from "./ContactRow";
import { Info } from "lucide-react";

interface ContactsTableProps {
  profiles: Profile[];
}

const ContactsTable: React.FC<ContactsTableProps> = ({ profiles }) => {
  const [sortColumn, setSortColumn] = useState<keyof Profile | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (column: keyof Profile) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedContacts = [...profiles];
  if (sortColumn) {
    sortedContacts.sort((a, b) => {
      const valueA = a[sortColumn] as string;
      const valueB = b[sortColumn] as string;

      if (valueA === "/" && valueB !== "/")
        return sortDirection === "asc" ? 1 : -1;
      if (valueA !== "/" && valueB === "/")
        return sortDirection === "asc" ? -1 : 1;

      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }

  const ColumnHeader: React.FC<{
    title: string;
    column: keyof Profile;
    className?: string;
  }> = ({ title, column, className = "" }) => {
    return (
      <th
        className={`px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 ${className}`}
        onClick={() => handleSort(column)}
      >
        <div className="flex items-center">
          <span>{title}</span>
          <Info size={14} className="ml-1 text-gray-400" />
          {sortColumn === column && (
            <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
          )}
        </div>
      </th>
    );
  };

  return (
    <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <ColumnHeader title="Full Name" column="name" className="pl-4" />
            <ColumnHeader title="Job Title" column="jobTitle" />
            <ColumnHeader title="Company" column="company" />
            <ColumnHeader title="Location" column="location" />
            <ColumnHeader title="LinkedIn URL" column="profileUrl" />
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedContacts.map((contact) => (
            <ContactRow key={contact._id} contact={contact} />
          ))}
        </tbody>
      </table>
      {sortedContacts.length === 0 && (
        <div className="min-w-full divide-y divide-gray-200 flex justify-center items-center">
          No data{" "}
        </div>
      )}
    </div>
  );
};

export default ContactsTable;
