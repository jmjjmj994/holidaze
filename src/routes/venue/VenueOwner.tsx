import { VenueDetailsProps } from './VenueDetails';

type VenueOwnerProps = Partial<VenueDetailsProps>;
export const VenueOwner: React.FC<VenueOwnerProps> = ({ owner }) => (
  <div>
    <p>Your host</p>
    <div>
      <img
        className="w-[3rem] h-[3rem] rounded-full object-cover aspect-auto "
        src={owner!.avatar.url}
        alt={owner!.avatar.alt}
      />
      <p>{owner!.name}</p>
    </div>
  </div>
);
