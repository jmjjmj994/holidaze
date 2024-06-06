import { Pizza, WifiHigh, Car, PawPrint } from 'phosphor-react';
import { VenueDetailsProps } from './VenueDetails';

type AmenitiesProps = VenueDetailsProps['meta'];

export const VenueAmenities: React.FC<AmenitiesProps> = ({
  wifi,
  pets,
  parking,
  breakfast,
}) => (
  <div>
    <p className="inter-bold py-2">This place offers</p>
    {wifi ? (
      <span className="line-through flex items-center gap-2">
        <WifiHigh size={25} />
        wifi
      </span>
    ) : (
      <span className="line-through flex items-center gap-2 ">
        <WifiHigh size={25} />
        wifi
      </span>
    )}
    {pets ? (
      <span className="line-through flex items-center gap-2">
        <PawPrint size={25} />
        pets
      </span>
    ) : (
      <span className="line-through flex items-center gap-2">
        <PawPrint size={25} />
        pets
      </span>
    )}
    {parking ? (
      <span className="line-through flex items-center gap-2">
        <Car size={25} />
        pets
      </span>
    ) : (
      <span className="line-through flex items-center gap-2">
        <Car size={25} />
        pets
      </span>
    )}
    {breakfast ? (
      <span className="line-through flex items-center gap-2">
        <Pizza size={25} />
        breakfast
      </span>
    ) : (
      <span className="line-through flex items-center gap-2">
        <Pizza size={25} />
        breakfast
      </span>
    )}
  </div>
);
