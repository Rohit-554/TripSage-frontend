import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import 'react-datepicker/dist/react-datepicker.css';
import { TravelItinerary } from "../model/ItineraryResponse";
import { useNavigate } from 'react-router-dom';
export default function PlannerPage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [destinationPlace, setDestinationPlace] = useState('');
  const [budget, setBudget] = useState('');
  const [travelStyle, setTravelStyle] = useState('');
  const [interestsNew, setInterestsNew] = useState('Nature,Adventure,Famous Landmarks');
  const [accommodationType, setAccommodationType] = useState('Hotel');
  const [transportationType, setTransportationType] = useState('Public Transport');
  const [activityType, setActivityType] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [tripDuration, setTripDuration] = useState('');
  const [language, setLanguage] = useState('English');
  const navigate = useNavigate(); // Hook to navigate
  const [itinerary, setItinerary] = useState(null);

  const token = localStorage.getItem('token');
  console.log('Retrieved Token:', token);
  const [selectedBadges, setSelectedBadges] = useState([]);
  const countDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://f2fd-49-37-39-242.ngrok-free.app/getPlaces',
        {
          destinationCountry: destinationPlace,
          budget,
          travelStyle,
          interestsNew,
          accommodationType,
          transportationType,
          activityType,
          cuisineType,
          tripDuration,
          language
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(response.data); // Display the response or handle it as needed
      const itineraryData = new TravelItinerary(response.data);
      setItinerary(itineraryData);
      console.log(itineraryData.created);
      console.log(extractJsonString(itineraryData.choices[0].message.content));
      if(itineraryData){
        const serializedData = encodeURIComponent(JSON.stringify(extractJsonString(itineraryData.choices[0].message.content)));
      navigate(`/travel?data=${serializedData}`);
    }
    } catch (error) {
      console.error('Error fetching itinerary:', error);
    }
  };

  const handleBadgeClick = (badge) => {
    const newSelectedBadges = selectedBadges.includes(badge)
      ? selectedBadges.filter((item) => item !== badge)
      : [...selectedBadges, badge];
    
    setSelectedBadges(newSelectedBadges);
    setActivityType(newSelectedBadges.join(', '));
  };

  const [peopleCount, setPeopleCount] = useState(1);

  const increaseCount = (e) => {
    e.preventDefault();
    setPeopleCount(prevCount => prevCount + 1);
  };

  const decreaseCount = (e) => {
    e.preventDefault();
    setPeopleCount(prevCount => Math.max(prevCount - 1, 1)); // Ensure the count doesn't go below 1
  };

  const badgeData = [
    { id: 'kidFriendly', icon: <BabyIcon className="mr-2 h-4 w-4" />, label: 'Kid Friendly' },
    { id: 'museums', icon: <LibraryIcon className="mr-2 h-4 w-4" />, label: 'Museums' },
    { id: 'shopping', icon: <ShoppingCartIcon className="mr-2 h-4 w-4" />, label: 'Shopping' },
    { id: 'historical', icon: <CalendarIcon className="mr-2 h-4 w-4" />, label: 'Historical' },
    { id: 'outdoorAdventures', icon: <MountainIcon className="mr-2 h-4 w-4" />, label: 'Outdoor Adventures' },
    { id: 'artCultural', icon: <PaletteIcon className="mr-2 h-4 w-4" />, label: 'Art & Cultural' },
    { id: 'amusementParks', icon: <RollerCoasterIcon className="mr-2 h-4 w-4" />, label: 'Amusement Parks' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold text-center">Plan your next adventure</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md mt-8 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="city">Where do you want to go?</Label>
          <Select
            id="city"
            value={destinationPlace}
            onValueChange={(value) => setDestinationPlace(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new-york">New York</SelectItem>
              <SelectItem value="los-angeles">Los Angeles</SelectItem>
              <SelectItem value="chicago">Chicago</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="budget">What's your budget?</Label>
          <Input
            id="budget"
            type="number"
            placeholder="Enter your budget in $"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cuisine">What kind of cuisine do you prefer?</Label>
          <Select
            id="cuisine"
            value={cuisineType}
            onValueChange={(value) => setCuisineType(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select cuisine type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="american">American</SelectItem>
              <SelectItem value="italian">Italian</SelectItem>
              <SelectItem value="asian">Asian</SelectItem>
              <SelectItem value="mexican">Mexican</SelectItem>
              <SelectItem value="vegetarian">Vegetarian</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="travel-style">What kind of travel style do you prefer?</Label>
          <Select
            id="travel-style"
            value={travelStyle}
            onValueChange={(value) => setTravelStyle(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select travel style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="adventure">Adventure</SelectItem>
              <SelectItem value="relaxation">Relaxation</SelectItem>
              <SelectItem value="cultural">Cultural</SelectItem>
              <SelectItem value="family">Family</SelectItem>
              <SelectItem value="solo">Solo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="start-date">When do you want to go?</Label>
          <div className="flex space-x-2">
            <Input
              id="start-date"
              type="date"
              placeholder="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Input
              id="end-date"
              type="date"
              placeholder="End Date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setTripDuration(countDays(startDate, e.target.value));
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Select the kind of activities you want to do</Label>
          <div className="flex flex-wrap gap-2">
            {badgeData.map((badge) => (
              <Badge
                key={badge.id}
                variant={selectedBadges.includes(badge.id) ? 'default' : 'secondary'}
                className={selectedBadges.includes(badge.id) ? 'opacity-100' : 'opacity-50'}
                onClick={() => handleBadgeClick(badge.id)}
              >
                {badge.icon}
                {badge.label}
              </Badge>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="people">How many people are going?</Label>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={decreaseCount}>-</Button>
            <Input
              id="people"
              value={peopleCount}
              readOnly
              className="w-12 text-center"
            />
            <Button variant="outline" onClick={increaseCount}>+</Button>
            <span>Person{peopleCount > 1 ? 's' : ''}</span>
          </div>
        </div>
        <Button type="submit" className="w-full mt-4 bg-green-600 text-white">Create New Trip</Button>
        <p className="mt-4 text-sm text-center text-muted-foreground">
          By clicking Create New Trip, you agree to our{" "}
          <a href="#" className="text-red-500">
            Terms and Conditions
          </a>{" "}
          and{" "}
          <a href="#" className="text-red-500">
            Privacy Policy
          </a>
          .
        </p>
      </form>
    </div>
  );
}


// SVG Icons as Functional Components
function BabyIcon(props) {
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
      <path d="M9 12h.01" />
      <path d="M15 12h.01" />
      <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
      <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1" />
    </svg>
  );
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
  );
}

function extractJsonString(inputString) {
  let startIndex = inputString.indexOf('{');
  if (startIndex === -1) return null; // No opening brace found

  let endIndex = startIndex;
  let braceCount = 0;

  for (let i = startIndex; i < inputString.length; i++) {
    if (inputString[i] === '{') {
      braceCount++;
    } else if (inputString[i] === '}') {
      braceCount--;
      if (braceCount === 0) {
        endIndex = i;
        break;
      }
    }
  }

  if (braceCount !== 0) return null; // Unmatched braces

  return inputString.substring(startIndex, endIndex + 1);
}



function LibraryIcon(props) {
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
      <path d="m16 6 4 14" />
      <path d="M12 6v14" />
      <path d="M8 8v12" />
      <path d="M4 4v16" />
    </svg>
  );
}

function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function PaletteIcon(props) {
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
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );
}

function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function RollerCoasterIcon(props) {
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
      <path d="M6 19V5" />
      <path d="M10 19V6.8" />
      <path d="M14 19v-7.8" />
      <path d="M18 5v4" />
      <path d="M18 19v-6" />
      <path d="M22 19V9" />
      <path d="M2 19V9a4 4 0 0 1 4-4c2 0 4 1.33 6 4s4 4 6 4a4 4 0 1 0-3-6.65" />
    </svg>
  );
}

function ShoppingCartIcon(props) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
