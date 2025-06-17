"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { SelectedDate } from "../../types/Date"
import { createSelectedDate, isDateAvailable, getUnavailableDates } from "../../utils/DateUtil"

interface DateSelectorProps {
  selectedDate: SelectedDate | null
  onDateSelect: (date: SelectedDate | null) => void
}

export function DateSelector({ selectedDate, onDateSelect }: DateSelectorProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date())

  const unavailableDates = getUnavailableDates()

  const handleDateSelect = (date: Date | undefined) => {
    if (date && isDateAvailable(date)) {
      onDateSelect(createSelectedDate(date))
      setIsCalendarOpen(false)
    } else if (!date) {
      onDateSelect(null)
    }
  }

  const isDateDisabled = (date: Date) => {
    // Disable if not available or in unavailable dates list
    if (!isDateAvailable(date)) return true

    return unavailableDates.some((unavailableDate) => unavailableDate.toDateString() === date.toDateString())
  }

  // Generate quick date options (next 7 available days)
  const getQuickDateOptions = () => {
    const options = []
    const today = new Date()
    let daysChecked = 0
    let daysAdded = 0

    while (daysAdded < 7 && daysChecked < 30) {
      const date = new Date(today)
      date.setDate(today.getDate() + daysChecked)

      if (isDateAvailable(date) && !isDateDisabled(date)) {
        options.push(date)
        daysAdded++
      }
      daysChecked++
    }

    return options
  }

  const quickDateOptions = getQuickDateOptions()

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Selecione a data:</h3>

      {/* Quick Date Selection */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Datas disponíveis:</h4>
        <div className="grid grid-cols-4 gap-3">
          {quickDateOptions.map((date, index) => {
            const isSelected = selectedDate?.isoString === date.toISOString().split("T")[0]

            return (
              <Card
                key={index}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? "ring-2 ring-blue-500 bg-blue-50" : ""
                }`}
                onClick={() => handleDateSelect(date)}
              >
                <CardContent className="p-3 text-center">
                  <div className="text-xs text-gray-600 uppercase">
                    {date.toLocaleDateString("pt-BR", { weekday: "short" })}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 my-1">{date.getDate()}</div>
                  <div className="text-xs text-gray-500">{date.toLocaleDateString("pt-BR", { month: "short" })}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Calendar Popover */}
      <div className="flex flex-col items-center space-y-4">
        <div className="text-sm text-gray-600">Ou escolha uma data específica:</div>

        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-64 justify-start text-left font-normal ${!selectedDate && "text-muted-foreground"}`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? selectedDate.display : "Selecione uma data"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <div className="p-3">
              <Calendar
                mode="single"
                selected={selectedDate?.date}
                onSelect={handleDateSelect}
                disabled={isDateDisabled}
                month={calendarMonth}
                onMonthChange={setCalendarMonth}
                initialFocus
                className="rounded-md border-0"
                classNames={{
                  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-4",
                  caption: "flex justify-center pt-1 relative items-center",
                  caption_label: "text-sm font-medium",
                  nav: "space-x-1 flex items-center",
                  nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md",
                  day_selected:
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground",
                  day_outside: "text-muted-foreground opacity-50",
                  day_disabled: "text-muted-foreground opacity-50 cursor-not-allowed",
                  day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                  day_hidden: "invisible",
                }}
                // components={{
                //   IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
                //   IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
                // }}
              />
            </div>

            {/* Calendar Footer with Info */}
            <div className="border-t p-3 text-xs text-gray-500 space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-200 rounded"></div>
                <span>Indisponível</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>Selecionado</span>
              </div>
              <div className="text-gray-400 mt-2">* Domingos não estão disponíveis</div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Selected Date Display */}
      {selectedDate && (
        <div className="flex justify-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CalendarIcon className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">Data selecionada</span>
            </div>
            <p className="font-semibold text-green-800 text-lg">{selectedDate.display}</p>
            <p className="text-sm text-green-600 mt-1">{selectedDate.date.toLocaleDateString("pt-BR")}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDateSelect(null)}
              className="mt-2 text-green-600 hover:text-green-700 hover:bg-green-100"
            >
              Limpar seleção
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
