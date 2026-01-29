import { UserButton } from "@clerk/nextjs";

export default function AdminPage() {
  return (
    <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <UserButton />
      </header>
      <main className="flex flex-col gap-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border border-black/[.08] dark:border-white/[.145] bg-white/[.02]">
            <h2 className="text-xl font-semibold mb-2">Users</h2>
            <p className="text-4xl font-bold">1,234</p>
            <p className="text-sm text-gray-500 mt-2">+12% from last month</p>
          </div>
          <div className="p-6 rounded-lg border border-black/[.08] dark:border-white/[.145] bg-white/[.02]">
            <h2 className="text-xl font-semibold mb-2">Revenue</h2>
            <p className="text-4xl font-bold">$12,345</p>
            <p className="text-sm text-gray-500 mt-2">+5% from last month</p>
          </div>
          <div className="p-6 rounded-lg border border-black/[.08] dark:border-white/[.145] bg-white/[.02]">
            <h2 className="text-xl font-semibold mb-2">Active Sessions</h2>
            <p className="text-4xl font-bold">456</p>
            <p className="text-sm text-gray-500 mt-2">Currently active</p>
          </div>
        </div>
        
        <div className="p-6 rounded-lg border border-black/[.08] dark:border-white/[.145] bg-white/[.02]">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-4">
            <li className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
              <span>New user registration</span>
              <span className="text-sm text-gray-500">2 mins ago</span>
            </li>
            <li className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
              <span>Payment received</span>
              <span className="text-sm text-gray-500">15 mins ago</span>
            </li>
            <li className="flex justify-between items-center pb-2">
              <span>Server update completed</span>
              <span className="text-sm text-gray-500">1 hour ago</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
