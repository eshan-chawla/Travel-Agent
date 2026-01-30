import { UserButton } from "@clerk/nextjs";
import { createUser, createTrip, getUsers, getTrips, checkCompanyProfile } from "../actions";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const hasCompany = await checkCompanyProfile();
  if (!hasCompany) {
    redirect('/profile');
  }

  const { data: users } = await getUsers();
  const { data: trips } = await getTrips();

  return (
    <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <UserButton />
      </header>
      <main className="flex flex-col gap-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg border border-black/[.08] dark:border-white/[.145] bg-white/[.02]">
            <h2 className="text-xl font-semibold mb-2">Total Employees</h2>
            <p className="text-4xl font-bold">{users?.length || 0}</p>
          </div>
          <div className="p-6 rounded-lg border border-black/[.08] dark:border-white/[.145] bg-white/[.02]">
            <h2 className="text-xl font-semibold mb-2">Active Trips</h2>
            <p className="text-4xl font-bold">{trips?.length || 0}</p>
          </div>
        </div>
        
        {/* Add User Section */}
        <section className="p-6 rounded-lg border border-black/[.08] dark:border-white/[.145] bg-white/[.02]">
          <h2 className="text-2xl font-bold mb-6">Add Employee</h2>
          <form action={async (formData) => {
            'use server'
            await createUser(formData)
          }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             <input
              name="name"
              placeholder="Name"
              required
              className="p-3 border rounded bg-transparent"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="p-3 border rounded bg-transparent"
            />
             <input
              name="phoneNumber"
              placeholder="Phone Number"
              className="p-3 border rounded bg-transparent"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors font-semibold"
            >
              Add Employee
            </button>
          </form>
        </section>

        {/* Plan Trip Section */}
        <section className="p-6 rounded-lg border border-black/[.08] dark:border-white/[.145] bg-white/[.02]">
          <h2 className="text-2xl font-bold mb-6">Plan Event / Trip</h2>
          <form action={async (formData) => {
            'use server'
            await createTrip(formData)
          }} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="startingPoint"
                placeholder="Starting Point"
                required
                className="p-3 border rounded bg-transparent"
              />
              <input
                name="destination"
                placeholder="Destination"
                required
                className="p-3 border rounded bg-transparent"
              />
               <input
                name="budget"
                type="number"
                step="0.01"
                placeholder="Budget"
                required
                className="p-3 border rounded bg-transparent"
              />
              <div className="flex flex-col">
                <label className="text-sm text-gray-500 mb-1">Start Date</label>
                <input
                  name="startDate"
                  type="date"
                  required
                  className="p-3 border rounded bg-transparent"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-500 mb-1">End Date</label>
                <input
                  name="endDate"
                  type="date"
                  required
                  className="p-3 border rounded bg-transparent"
                />
              </div>
            </div>

            {/* Employee Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Select Employees</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-60 overflow-y-auto border p-4 rounded bg-white/[.02]">
                {users?.map((user: any) => (
                  <label key={user.id} className="flex items-center gap-2 p-2 hover:bg-white/[.05] rounded cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="participantIds" 
                      value={user.id} 
                      className="w-4 h-4"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </label>
                ))}
                 {!users?.length && <p className="text-gray-500">No users available.</p>}
              </div>
            </div>

            <button
              type="submit"
              className="bg-purple-600 text-white p-3 rounded hover:bg-purple-700 transition-colors font-semibold w-full sm:w-auto self-end px-8"
            >
              Create Event & Generate Links
            </button>
          </form>
        </section>

        {/* Existing Trips List */}
        <section className="p-6 rounded-lg border border-black/[.08] dark:border-white/[.145] bg-white/[.02]">
          <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/[.05] dark:bg-white/[.05]">
                <tr>
                  <th className="p-3 rounded-tl-lg">Route</th>
                  <th className="p-3">Dates</th>
                  <th className="p-3">Participants</th>
                  <th className="p-3 rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody>
                {trips?.map((trip: any) => (
                  <tr key={trip.id} className="border-b border-black/[.05] dark:border-white/[.05]">
                    <td className="p-3 font-medium">{trip.startingPoint} → {trip.destination}</td>
                    <td className="p-3">
                      {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                    </td>
                    <td className="p-3">{trip.participants?.length || 0} People</td>
                    <td className="p-3">
                       <details className="relative">
                        <summary className="cursor-pointer text-blue-500 hover:underline list-none">View Links</summary>
                        <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-3 z-10 border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto">
                          {trip.participants?.map((p: any) => (
                             <div key={p.id} className="mb-2 last:mb-0 border-b border-gray-100 dark:border-gray-700 last:border-0 pb-2 last:pb-0">
                                <p className="text-xs font-semibold mb-1">{p.user?.name}</p>
                                <input 
                                  readOnly 
                                  value={`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/event/${p.token}`}
                                  className="w-full text-xs p-1 bg-gray-50 dark:bg-gray-900 rounded select-all"
                                />
                             </div>
                          ))}
                        </div>
                       </details>
                    </td>
                  </tr>
                ))}
                 {!trips?.length && (
                   <tr>
                      <td colSpan={4} className="p-6 text-center text-gray-500">No events found</td>
                   </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
