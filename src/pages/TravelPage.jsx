/**
 * v0 by Vercel.
 * @see https://v0.dev/t/AHcnRx81FwT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"

const attractions = [
    {
      title: "Baga Beach",
      time: "10:00 AM - 4:00 PM",
      cost: "Free",
      description: "Explore the vibrant Baga Beach, known for its lively beach shacks, water sports, and stunning sunsets.",
      transportation: "Taxi or local bus",
      imageUrl: "/placeholder.svg",
    },
    {
      title: "Chapora Fort",
      time: "11:00 AM - 5:00 PM",
      cost: "$5",
      description: "Visit the historic Chapora Fort, offering panoramic views of the Arabian Sea and the surrounding landscape.",
      transportation: "Taxi or local bus",
      imageUrl: "/placeholder.svg",
    },
    {
      title: "Anjuna Flea Market",
      time: "9:00 AM - 6:00 PM",
      cost: "Free",
      description: "Explore the vibrant Anjuna Flea Market, known for its eclectic mix of handicrafts, clothing, and local delicacies.",
      transportation: "Taxi or local bus",
      imageUrl: "/placeholder.svg",
    },
    {
      title: "Dudhsagar Waterfalls",
      time: "8:00 AM - 5:00 PM",
      cost: "$10",
      description: "Witness the majestic Dudhsagar Waterfalls, one of the highest waterfalls in India, surrounded by lush greenery.",
      transportation: "Taxi or local bus",
      imageUrl: "/placeholder.svg",
    },
  ]
  
  export default function TravelPage() {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Goa Getaway - Day 1</h1>
            <div className="flex items-center space-x-4 text-muted-foreground">
              <div>
                <CalendarIcon className="w-4 h-4 mr-1 inline" />
                June 15, 2023
              </div>
              <div>
                <SunIcon className="w-4 h-4 mr-1 inline" />
                Sunny, 32°C
              </div>
              <div>
                <DollarSignIcon className="w-4 h-4 mr-1 inline" />
                Budget: $150
              </div>
            </div>
          </div>
          <Button className="flex items-center gap-2">
            <FlameIcon className="w-4 h-4" />
            Find more hotels in Goa
          </Button>
        </div>
        <div className="mb-6">
          <Input placeholder="Search for stay address or hotel name" className="w-full" />
        </div>
        <div className="grid gap-6">
          {attractions.map((attraction, index) => (
            <div key={index} className="flex items-start gap-4">
              <img
                src={attraction.imageUrl}
                width={120}
                height={90}
                alt="Attraction"
                className="rounded-lg object-cover"
                style={{ aspectRatio: "120/90", objectFit: "cover" }}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold">{attraction.title}</div>
                  <div className="text-muted-foreground">
                    <ClockIcon className="w-4 h-4 mr-1 inline" />
                    {attraction.time}
                    <span className="mx-2">•</span>
                    <DollarSignIcon className="w-4 h-4 mr-1 inline" />
                    {attraction.cost}
                  </div>
                </div>
                <p className="text-muted-foreground">{attraction.description}</p>
                <div className="text-muted-foreground">
                  <CarIcon className="w-4 h-4 mr-1 inline" />
                  {attraction.transportation}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}


function CarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  )
}


function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}


function DollarSignIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}


function FlameIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  )
}


function SunIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}