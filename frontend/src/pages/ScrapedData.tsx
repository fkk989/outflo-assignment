import React, { useEffect } from "react";
import ContactsTable from "../components/scrapedPage/ContactsTable";
import { useProfileStore } from "../store/profileStore";

export function ScrapedDataPage() {
  const { profiles, fetchProfiles } = useProfileStore();

  useEffect(() => {
    fetchProfiles();
  }, []);
  useEffect(() => {
    console.log(profiles);
  }, [profiles]);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800">
            Scraped LinkedIn Profile
          </h1>
        </div>
      </header>

      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!profiles ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
            </div>
          ) : (
            <ContactsTable profiles={profiles} />
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} LinkedIn Contacts Manager. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
