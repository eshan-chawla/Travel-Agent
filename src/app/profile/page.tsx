import { UserButton } from "@clerk/nextjs";
import { createCompany, checkCompanyProfile } from "../actions";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const hasCompany = await checkCompanyProfile();

  if (hasCompany) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] flex flex-col items-center justify-center">
      <header className="absolute top-8 right-8">
        <UserButton />
      </header>
      
      <main className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold mb-2">Complete Your Profile</h1>
        <p className="text-gray-500 mb-8">Please provide your company details to get started.</p>

        <form action={createCompany} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-semibold mb-1">Company Name</label>
            <input
              id="name"
              name="name"
              placeholder="e.g. Acme Corp"
              required
              className="p-3 border rounded bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors font-semibold mt-4"
          >
            Create Company & Continue
          </button>
        </form>
      </main>
    </div>
  );
}
