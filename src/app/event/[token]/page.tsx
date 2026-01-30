import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

async function getEventDetails(token: string) {
  const participant = await prisma.tripParticipant.findUnique({
    where: { token },
    include: {
      user: true,
      trip: {
        include: {
          company: true
        }
      }
    }
  })
  
  return participant
}

export default async function EventChatPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const participant = await getEventDetails(token)

  if (!participant) {
    notFound()
  }

  const { trip, user } = participant

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center z-10">
        <div>
          <h1 className="text-xl font-bold">{trip.startingPoint} → {trip.destination}</h1>
          <p className="text-sm text-gray-500">
            {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
          </p>
        </div>
        <div className="text-right">
          <p className="font-semibold">{user.name}</p>
          <p className="text-xs text-gray-500">{trip.company.name}</p>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex justify-start">
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg rounded-tl-none shadow-sm max-w-[80%]">
            <p className="text-sm">
              Hello {user.name}! I am your AI Travel Assistant for the trip to {trip.destination}. 
              I can help you manage your itinerary, check flight status, or find local recommendations. 
              How can I assist you today?
            </p>
            <span className="text-[10px] text-gray-400 block mt-1">AI Assistant</span>
          </div>
        </div>

        {/* Example User Message */}
        <div className="flex justify-end">
          <div className="bg-blue-600 text-white p-3 rounded-lg rounded-tr-none shadow-sm max-w-[80%]">
            <p className="text-sm">What is the weather like in {trip.destination}?</p>
            <span className="text-[10px] text-blue-200 block mt-1">You</span>
          </div>
        </div>
      </main>

      {/* Input Area */}
      <div className="bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
        <form className="flex gap-2 max-w-4xl mx-auto">
          <input 
            type="text" 
            placeholder="Type your message..." 
            className="flex-1 p-3 border rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
