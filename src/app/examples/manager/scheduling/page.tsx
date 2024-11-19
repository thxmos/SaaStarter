"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  AlarmClock,
} from "lucide-react";
import {
  addMonths,
  subMonths,
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  addDays,
} from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Generate mock data for available hours
const generateMockData = () => {
  const mockData = {};
  const startDate = new Date();
  for (let i = 0; i < 60; i++) {
    const currentDate = addDays(startDate, i);
    const dateString = format(currentDate, "yyyy-MM-dd");
    const availableHours = [];

    // Generate random available hours
    const numberOfSlots = Math.floor(Math.random() * 8) + 1; // 1 to 8 slots
    const possibleHours = [
      "9:00 AM",
      "10:00 AM",
      "11:00 AM",
      "1:00 PM",
      "2:00 PM",
      "3:00 PM",
      "4:00 PM",
      "5:00 PM",
    ];
    for (let j = 0; j < numberOfSlots; j++) {
      const randomIndex = Math.floor(Math.random() * possibleHours.length);
      availableHours.push(possibleHours[randomIndex]);
      possibleHours.splice(randomIndex, 1); // Remove the selected hour to avoid duplicates
    }
    availableHours.sort((a, b) => {
      const dateA = new Date(`1970/01/01 ${a}`);
      const dateB = new Date(`1970/01/01 ${b}`);
      return dateA.getTime() - dateB.getTime();
    });
    mockData[dateString] = availableHours;
  }
  return mockData as Record<string, string[]>;
};

const availableHours = generateMockData();

// Mock appointment data
const appointmentInfo = {
  title: "Dental Checkup",
  description: "Regular dental examination and cleaning",
  price: 75,
  duration: 60,
  image: "/placeholder.svg?height=100&width=100",
};

export default function ModifiedSchedulingApp() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timezone, setTimezone] = useState("");

  useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const goToPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const getAvailableHours = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    return availableHours[dateString] || [];
  };

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirmAppointment = () => {
    // Here you would typically send the appointment data to your backend
    console.log("Appointment confirmed:", {
      date: format(selectedDate, "yyyy-MM-dd"),
      time: selectedTime,
      timezone: timezone,
      ...appointmentInfo,
    });
    // Reset selection after confirmation
    setSelectedTime(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold">Appointment Scheduler</h1>
        <p className="text-gray-500">Timezone: {timezone}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">Calendar</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="font-semibold">
                {format(currentMonth, "MMMM yyyy")}
              </div>
              <Button variant="outline" size="icon" onClick={goToNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-2">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="text-center font-semibold text-sm py-2"
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {monthDays.map((day, index) => {
                const isCurrentMonth = isSameMonth(day, currentMonth);
                const isSelected = isSameDay(day, selectedDate);
                const isTodayDate = isToday(day);
                const hasAvailableHours = getAvailableHours(day).length > 0;

                return (
                  <Button
                    key={day.toString()}
                    variant={isSelected ? "default" : "outline"}
                    className={`h-12 ${
                      !isCurrentMonth ? "text-gray-400" : ""
                    } ${isTodayDate ? "border-blue-500" : ""} ${
                      hasAvailableHours ? "bg-green-100 hover:bg-green-200" : ""
                    }`}
                    onClick={() => setSelectedDate(day)}
                  >
                    <time dateTime={format(day, "yyyy-MM-dd")}>
                      {format(day, "d")}
                    </time>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Available Hours
            </CardTitle>
            <div className="text-lg font-semibold">
              {format(selectedDate, "MMMM d, yyyy")}
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4 mb-4">
              {getAvailableHours(selectedDate).length > 0 ? (
                <div className="space-y-2">
                  {getAvailableHours(selectedDate).map((hour) => (
                    <Button
                      key={hour}
                      className="w-full justify-start"
                      variant={selectedTime === hour ? "default" : "outline"}
                      onClick={() => handleTimeSelection(hour)}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {hour}
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-4">
                  No available hours for this date.
                </div>
              )}
            </ScrollArea>
            <Button
              className="w-full"
              disabled={!selectedTime}
              onClick={handleConfirmAppointment}
            >
              Confirm Appointment
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex items-start space-x-6">
        <Avatar className="w-24 h-24">
          <AvatarImage src={appointmentInfo.image} alt="Appointment" />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">{appointmentInfo.title}</h3>
          <p className="text-gray-500">{appointmentInfo.description}</p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-gray-500 mr-1" />
              <span>${appointmentInfo.price}</span>
            </div>
            <div className="flex items-center">
              <AlarmClock className="h-5 w-5 text-gray-500 mr-1" />
              <span>{appointmentInfo.duration} minutes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
