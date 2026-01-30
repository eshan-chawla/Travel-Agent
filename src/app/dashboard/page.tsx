import { getCompanies, getUsers, getTrips, createCompany, createUser, createTrip } from '../actions'

export default async function Dashboard() {
  const { data: companies } = await getCompanies()
  const { data: users } = await getUsers()
  const { data: trips } = await getTrips()

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold mb-8">Travel Agent Dashboard</h1>

      {/* Company Section */}
      <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Add Company</h2>
        <form action={createCompany} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            name="name"
            placeholder="Company Name"
            required
            className="p-2 border rounded"
          />
          <input
            name="companyId"
            placeholder="Company ID"
            required
            className="p-2 border rounded"
          />
          <input
            name="authId"
            placeholder="Auth ID"
            required
            className="p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors md:col-span-3 w-fit"
          >
            Create Company
          </button>
        </form>

        <h3 className="font-semibold mb-2 text-gray-700">Existing Companies</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">ID</th>
                <th className="p-2">Auth ID</th>
              </tr>
            </thead>
            <tbody>
              {companies?.map((company: any) => (
                <tr key={company.id} className="border-t">
                  <td className="p-2">{company.name}</td>
                  <td className="p-2">{company.companyId}</td>
                  <td className="p-2">{company.authId}</td>
                </tr>
              ))}
              {!companies?.length && (
                 <tr>
                    <td colSpan={3} className="p-2 text-center text-gray-500">No companies found</td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* User Section */}
      <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Add User</h2>
        <form action={async (formData) => {
          'use server'
          await createUser(formData)
        }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <input
            name="name"
            placeholder="Name"
            required
            className="p-2 border rounded"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="p-2 border rounded"
          />
          <input
            name="userId"
            placeholder="User ID (Custom)"
            required
            className="p-2 border rounded"
          />
          <input
            name="phoneNumber"
            placeholder="Phone Number"
            className="p-2 border rounded"
          />
          <input
            name="addedBy"
            placeholder="Added By (ID)"
            className="p-2 border rounded"
          />
          <select
            name="companyId"
            required
            className="p-2 border rounded"
            defaultValue=""
          >
            <option value="" disabled>Select Company</option>
            {companies?.map((company: any) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors md:col-span-2 lg:col-span-3 w-fit"
          >
            Create User
          </button>
        </form>

        <h3 className="font-semibold mb-2 text-gray-700">Existing Users</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">User ID</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Company</th>
                <th className="p-2">Added By</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user: any) => (
                <tr key={user.id} className="border-t">
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.userId}</td>
                  <td className="p-2">{user.phoneNumber}</td>
                  <td className="p-2">{user.company?.name}</td>
                  <td className="p-2">{user.addedBy}</td>
                </tr>
              ))}
              {!users?.length && (
                 <tr>
                    <td colSpan={6} className="p-2 text-center text-gray-500">No users found</td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Trip Section */}
      <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Add Trip</h2>
        <form action={async (formData) => {
          'use server'
          await createTrip(formData)
        }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <input
            name="tripId"
            placeholder="Trip ID"
            required
            className="p-2 border rounded"
          />
          <input
            name="startingPoint"
            placeholder="Starting Point"
            required
            className="p-2 border rounded"
          />
          <input
            name="destination"
            placeholder="Destination"
            required
            className="p-2 border rounded"
          />
           <input
            name="budget"
            type="number"
            step="0.01"
            placeholder="Budget"
            required
            className="p-2 border rounded"
          />
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">Start Date</label>
            <input
              name="startDate"
              type="date"
              required
              className="p-2 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">End Date</label>
            <input
              name="endDate"
              type="date"
              required
              className="p-2 border rounded"
            />
          </div>
         
          <select
            name="companyId"
            required
            className="p-2 border rounded"
            defaultValue=""
          >
            <option value="" disabled>Select Company</option>
            {companies?.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
          <select
            name="userId"
            required
            className="p-2 border rounded"
            defaultValue=""
          >
            <option value="" disabled>Select User</option>
            {users?.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition-colors md:col-span-2 lg:col-span-4 w-fit"
          >
            Create Trip
          </button>
        </form>

        <h3 className="font-semibold mb-2 text-gray-700">Existing Trips</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2">Trip ID</th>
                <th className="p-2">Dates</th>
                <th className="p-2">Route</th>
                <th className="p-2">Budget</th>
                <th className="p-2">User</th>
                <th className="p-2">Company</th>
              </tr>
            </thead>
            <tbody>
              {trips?.map((trip: any) => (
                <tr key={trip.id} className="border-t">
                  <td className="p-2">{trip.tripId}</td>
                  <td className="p-2">
                    {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                  </td>
                  <td className="p-2">{trip.startingPoint} → {trip.destination}</td>
                  <td className="p-2">${trip.budget}</td>
                  <td className="p-2">{trip.user?.name}</td>
                  <td className="p-2">{trip.company?.name}</td>
                </tr>
              ))}
               {!trips?.length && (
                 <tr>
                    <td colSpan={6} className="p-2 text-center text-gray-500">No trips found</td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
