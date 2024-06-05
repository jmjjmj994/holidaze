import { useEffect, useState } from 'react';
import { format, isAfter, isBefore, startOfMonth } from 'date-fns';
import { DayPicker, DateRange } from 'react-day-picker';
import './venue.css';

function rangeIncludeDate(range: DateRange, date: string) {
  return Boolean(
    range.from &&
      range.to &&
      isAfter(date, range.from) &&
      isBefore(date, range.to)
  );
}

export const VenueCalendar = ({ handleBookingDates, bookings }) => {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();

  useEffect(() => {
    let valid;
    if (
      selectedRange !== undefined &&
      'from' in selectedRange &&
      selectedRange.to !== undefined
    ) {
      valid = true;
    } else {
      valid = false;
    }

    if (
      valid &&
      selectedRange?.from !== undefined &&
      selectedRange.to !== undefined
    )
      handleBookingDates(
        {
          from: selectedRange.from,
          to: selectedRange.to,
        },
        valid
      );

    if (valid && selectedRange?.from !== undefined)
      handleBookingDates(
        {
          from: selectedRange.from,
          to: selectedRange.to,
        },
        valid
      );
  }, [selectedRange]);

  const disabledDates = bookings?.map((booking: { dateFrom: string | number | Date; dateTo: string | number | Date; }) => ({
    from: new Date(booking.dateFrom),
    to: new Date(booking.dateTo),
  }));

  const handleSelect = (range: DateRange | undefined, selectedDate: Date) => {
    setSelectedRange(() => {
      if (
        range &&
        disabledDates?.some((disabledDate: { from: { toString: () => string; }; }) =>
          rangeIncludeDate(range, disabledDate.from.toString())
        )
      ) {
        if (range.from && isBefore(selectedDate, disabledDates.from)) {
          return { from: range.from, to: undefined };
        }
        return { from: range.to, to: undefined };
      }
      return range;
    });
    handleBookingDates(range || { from: null, to: null }, !!range);
  };

  const today = new Date();
  const currentMonth = startOfMonth(today);
  return (
    <DayPicker
      mode="range"
      selected={selectedRange}
      onSelect={(dates) => handleSelect(dates, new Date())}
      disabled={[{ before: today }, ...disabledDates]}
      fromMonth={currentMonth}
    />
  );
};
