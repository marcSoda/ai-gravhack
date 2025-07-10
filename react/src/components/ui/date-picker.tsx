import * as React from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DatePickerProps {
  selected?: Date | null;
  onChange?: (date: Date | null) => void;
}

export function DatePicker({ selected, onChange }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(selected);
  const [isOpen, setIsOpen] = React.useState(false); // State to control Popover open state

  React.useEffect(() => {
    setDate(selected);
  }, [selected]);

  const handleSelect = (newDate: Date | null) => {
    setDate(newDate);
    if (onChange) {
      onChange(newDate);
    }
    setIsOpen(false); // Close the popover when a date is selected
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
          onClick={() => setIsOpen(!isOpen)} // Toggle Popover open state on button click
        >
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={handleSelect} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
