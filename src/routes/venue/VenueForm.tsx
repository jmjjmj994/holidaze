import { useEffect, useState } from 'react';
import { VenueCalendar } from './VenueCalendar';
import { PrimaryButton } from 'src/components/button/PrimaryButton';
import { options } from 'src/config/options';
import { getUsername } from 'src/utilities/utilities';

type BookingDate = {
  from: Date | null;
  to: Date | null;
};

type VenueFormProps = {
  id: string;
  bookings: { dateFrom: string; dateTo: string }[];
  price: number;
  maxGuests: number;
};

export const VenueForm = ({
  id,
  bookings,
  price,
  maxGuests,
}: VenueFormProps) => {
  const pricePerDay = price;
  const [guests, setGuests] = useState(1);
  const [bookingPrice, setBookingPrice] = useState(price);
  const [bookingDate, setBookingDate] = useState<BookingDate>({
    from: null,
    to: null,
  });

  const handleBookingDates = (dates: BookingDate, valid: boolean) => {
    setBookingDate(dates);
    console.log(dates, 'data in booking func');
  };

  useEffect(() => {
    const countDays = (from: Date | null, to: Date | null) => {
      if (!from || !to) return 0;
      if (from > to) {
        [from, to] = [to, from];
      }
      const Difference_In_Time = to.getTime() - from.getTime();
      let Difference_In_Days = Math.round(
        Difference_In_Time / (1000 * 3600 * 24)
      );
      if (Difference_In_Days === 0) {
        Difference_In_Days = 1;
      }
      return Difference_In_Days;
    };

    const days = countDays(bookingDate.from, bookingDate.to);
    setBookingPrice(days * pricePerDay);
  }, [bookingDate, pricePerDay]);

  const handleGuests = (e: number) => {
    setGuests(e);
  };

  const onSubmit = (e: React.FormEvent) => {
    const username = getUsername();
    e.preventDefault();
    if (bookingDate.from && bookingDate.to) {
      bookVenue(bookingDate.from, bookingDate.to, guests, id);
      console.log('booked');
      // Redirect logic here if needed
    }
  };

  const bookVenue = (from: Date, to: Date, guests: number, id: string) => {
    console.log(from, to, guests, id);
    fetch('https://v2.api.noroff.dev/holidaze/bookings', {
      method: 'POST',
      headers: options.headers,
      body: JSON.stringify({
        dateFrom: from,
        dateTo: to,
        guests: guests,
        venueId: id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 max-w-[35rem] w-full bg-custom-background_white shadow-raised rounded-md pb-4 px-2 py-2"
    >
      <VenueCalendar
        handleBookingDates={handleBookingDates}
        bookings={bookings}
      />
      <fieldset className="max-w-[100%] mb-4 rounded-md px-2 py-2">
        <legend className="font-int-bold leading-10">Guests:</legend>
        <select
          value={guests}
          onChange={(e) => handleGuests(Number(e.target.value))}
          className="py-2 px-2 rounded-md w-full"
        >
          {Array.from({ length: maxGuests }, (_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </fieldset>
      <PrimaryButton width="auto" type="submit">
        Confirm order
      </PrimaryButton>
    </form>
  );
};
