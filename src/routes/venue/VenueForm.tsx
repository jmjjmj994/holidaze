import { useEffect, useState } from 'react';
import { VenueCalendar } from './VenueCalendar';
import { PrimaryButton } from 'src/components/button/PrimaryButton';
import { options } from 'src/config/options';
import { getUsername } from 'src/utilities/utilities';
import { Bookings } from 'src/client/validation/venueType';
type BookingDate = {
  from: Date | null;
  to: Date | null;
};

type VenueFormProps = {
  id?: string;
  bookings: Bookings;
  price?: number;
  maxGuests?: number;
};

export const VenueForm: React.FC<VenueFormProps> = ({
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

  const handleBookingDates = (dates: BookingDate) => {
    setBookingDate(dates);
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
    setBookingPrice(days * (pricePerDay ?? 0));
  }, [bookingDate, pricePerDay]);

  const handleGuests = (e: number) => {
    setGuests(e);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingDate.from && bookingDate.to) {
      bookVenue(bookingDate.from, bookingDate.to, maxGuests ?? 0, id || '');
      console.log('booked');
      // Redirect logic here if needed
    }
  };


  return (
    <form className="max-w-[35rem] w-full" onSubmit={onSubmit}>
      <VenueCalendar
        handleBookingDates={handleBookingDates}
        bookings={bookings}
      />

      <fieldset className="max-w-[100%] mb-4   rounded-md px-2 py-2">
        <legend className="font-int-bold leading-10">Guests:</legend>
        <select
          value={guests}
          onChange={(e) => handleGuests(Number(e.target.value))}
          className="py-2 px-2 rounded-md w-full"
        >
          {Array.from({ length: maxGuests as number }, (_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </fieldset>
      <PrimaryButton width="full" type="submit">
        Confirm order
      </PrimaryButton>
    </form>
  );
};
const bookVenue = (from: Date, to: Date, guests: number, id: string) => {
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
