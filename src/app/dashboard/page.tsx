'use client'

import React from 'react'

export default function ChatInterface() {
  const messages = [
    {
      id: 1,
      sender: 'agent',
      name: 'Trae Travel Agent',
      time: '10:00 AM',
      content: 'Hello Eshan! I see you have a business trip scheduled to the ByteDance office in Beijing, China next week. Would you like me to finalize the bookings and generate your itinerary?',
    },
    {
      id: 2,
      sender: 'user',
      name: 'Eshan',
      time: '10:05 AM',
      content: 'Yes, please! I will be flying out from San Jose (SJC). Can you make sure the hotel is close to the office?',
    },
    {
      id: 3,
      sender: 'agent',
      name: 'Trae Travel Agent',
      time: '10:06 AM',
      content: 'Absolutely. I have booked a direct flight and a 5-star hotel within walking distance of the ByteDance HQ. Here are your confirmed details:',
      type: 'booking_card',
      details: {
        flights: [
          {
            type: 'Outbound',
            date: 'Mon, Oct 20',
            airline: 'Air China',
            flightNum: 'CA986',
            route: 'SJC (12:30 PM) → PEK (4:50 PM +1)',
            duration: '13h 20m',
          },
          {
            type: 'Return',
            date: 'Sun, Oct 27',
            airline: 'Air China',
            flightNum: 'CA985',
            route: 'PEK (1:00 PM) → SJC (10:30 AM)',
            duration: '12h 30m',
          },
        ],
        hotel: {
          name: 'Rosewood Beijing',
          address: 'Jing Guang Centre, Chaoyang District',
          checkIn: 'Tue, Oct 21',
          checkOut: 'Sun, Oct 27',
          amenities: 'Executive Lounge Access, Breakfast Included',
        },
      },
    },
    {
      id: 4,
      sender: 'agent',
      name: 'Trae Travel Agent',
      time: '10:07 AM',
      content: 'Here is your draft itinerary for the week:',
      type: 'itinerary',
      days: [
        {
          day: 'Day 1: Arrival (Tue, Oct 21)',
          activities: [
            '16:50 - Land at Beijing Capital Intl Airport (PEK)',
            '18:00 - Private Transfer to Rosewood Beijing',
            '19:30 - Welcome Dinner with ByteDance Team at Da Dong Roast Duck',
          ],
        },
        {
          day: 'Day 2: Office Tour (Wed, Oct 22)',
          activities: [
            '09:00 - Breakfast at hotel',
            '10:00 - Arrival at ByteDance HQ (No. 48 Zhichun Road)',
            '10:30 - Campus Tour & Badge Pickup',
            '12:30 - Lunch at Employee Cafeteria',
            '14:00 - Engineering Sync: AI Infrastructure',
          ],
        },
        {
          day: 'Day 3: Deep Dives (Thu, Oct 23)',
          activities: [
            '09:30 - Team Standup',
            '11:00 - Product Roadmap Review',
            '13:00 - Lunch with Product Managers',
            '15:00 - Trae x ByteDance Integration Workshop',
            '19:00 - Team Building: Karaoke (KTV)',
          ],
        },
        {
          day: 'Day 4: Cultural Day (Fri, Oct 24)',
          activities: [
            '09:00 - Visit the Forbidden City (Guided Tour)',
            '13:00 - Lunch: Dumplings at Din Tai Fung',
            '15:00 - Strategy Wrap-up at Office',
            '18:00 - Departure for Weekend Break',
          ],
        },
        {
          day: 'Day 5: Great Wall (Sat, Oct 25)',
          activities: [
            '08:00 - Pickup for Great Wall of China (Mutianyu Section)',
            '12:00 - Picnic Lunch on the Wall',
            '16:00 - Return to Hotel',
            '19:00 - Free Evening / Sanlitun Shopping',
          ],
        },
      ],
    },
    {
      id: 5,
      sender: 'user',
      name: 'Eshan',
      time: '10:10 AM',
      content: 'This looks perfect! Thanks for organizing the Great Wall trip too.',
    },
    {
      id: 6,
      sender: 'agent',
      name: 'Trae Travel Agent',
      time: '10:11 AM',
      content: "You're welcome, Eshan! All bookings are confirmed and sent to your calendar. Have a safe flight!",
    },
  ]

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b p-4 shadow-sm flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            T
          </div>
          <div>
            <h1 className="font-semibold text-lg">Trae Travel Assistant</h1>
            <p className="text-xs text-green-500 font-medium">● Online</p>
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        </button>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] md:max-w-[70%] gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs text-white
                ${msg.sender === 'user' ? 'bg-gray-800' : 'bg-blue-600'}`}>
                {msg.sender === 'user' ? 'E' : 'T'}
              </div>

              {/* Message Bubble */}
              <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-gray-600">{msg.name}</span>
                  <span className="text-xs text-gray-400">{msg.time}</span>
                </div>

                <div className={`p-3 rounded-lg text-sm shadow-sm
                  ${msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'}`}>
                  
                  <p className="whitespace-pre-wrap">{msg.content}</p>

                  {/* Booking Card Widget */}
                  {msg.type === 'booking_card' && msg.details && (
                    <div className="mt-3 bg-gray-50 rounded p-3 border border-gray-100 text-gray-800">
                      <h4 className="font-bold text-xs uppercase text-gray-500 mb-2">Flight Details</h4>
                      {msg.details.flights.map((flight, idx) => (
                        <div key={idx} className="mb-3 last:mb-0 text-xs">
                          <div className="flex justify-between font-semibold">
                            <span>{flight.type}: {flight.date}</span>
                            <span className="text-blue-600">{flight.flightNum}</span>
                          </div>
                          <div className="text-gray-600">{flight.route}</div>
                          <div className="text-gray-500 text-[10px]">{flight.airline} • {flight.duration}</div>
                        </div>
                      ))}
                      <div className="border-t border-gray-200 my-2"></div>
                      <h4 className="font-bold text-xs uppercase text-gray-500 mb-2">Hotel Details</h4>
                      <div className="text-xs">
                        <div className="font-bold text-sm">{msg.details.hotel.name}</div>
                        <div className="text-gray-600">{msg.details.hotel.address}</div>
                        <div className="mt-1 text-green-600">{msg.details.hotel.checkIn} - {msg.details.hotel.checkOut}</div>
                        <div className="text-[10px] text-gray-500 mt-1">✨ {msg.details.hotel.amenities}</div>
                      </div>
                    </div>
                  )}

                  {/* Itinerary Widget */}
                  {msg.type === 'itinerary' && msg.days && (
                    <div className="mt-3 space-y-2">
                      {msg.days.map((day, idx) => (
                        <div key={idx} className="bg-gray-50 p-2 rounded border border-gray-100">
                          <h5 className="font-bold text-xs text-gray-800 mb-1">{day.day}</h5>
                          <ul className="list-disc list-inside space-y-1">
                            {day.activities.map((act, i) => (
                              <li key={i} className="text-xs text-gray-600 pl-1">{act}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t p-4">
        <div className="max-w-4xl mx-auto flex gap-2">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-gray-100 border-0 rounded-full px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
