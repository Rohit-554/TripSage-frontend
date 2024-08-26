import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function PlannerPage() {
    const [startDate, setStartDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
  
    const handleDateClick = () => {
      setShowDatePicker(true);
    };
  
    const handleDateChange = (date) => {
      setStartDate(date);
      setShowDatePicker(false);
    };
  
    const [selectedBadges, setSelectedBadges] = useState([]);

    const handleBadgeClick = (badge) => {
        setSelectedBadges((prev) =>
        prev.includes(badge) ? prev.filter((item) => item !== badge) : [...prev, badge]
        );
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
      <form className="w-full max-w-md mt-8 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="city">Where do you want to go?</Label>
          <Select>
            <SelectTrigger id="city">
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
          <Input id="budget" type="number" placeholder="Enter your budget in $" />
        </div>
        <div className="space-y-2">
          <Label>What kind of cuisine do you prefer?</Label>
          <Select>
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
          <Label>What kind of travel style do you prefer?</Label>
          <Select>
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
            <Input id="start-date" type="date" placeholder="Start Date" />
            <Input id="end-date" type="date" placeholder="End Date" />
        </div>
        {/* Uncomment and use this button as needed
        <Button variant="destructive">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add destination
        </Button> */}
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
            <Input id="people" value={peopleCount} readOnly className="w-12 text-center" />
            <Button variant="outline" onClick={increaseCount}>+</Button>
            <span>Person{peopleCount > 1 ? 's' : ''}</span>
        </div>
        </div>
        <Button className="w-full mt-4 bg-green-600 text-white">Create New Trip</Button>
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
