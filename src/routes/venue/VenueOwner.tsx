import { VenueDetailsProps } from './VenueDetails';

type VenueOwnerProps = Partial<VenueDetailsProps>;
export const VenueOwner: React.FC<VenueOwnerProps> = ({ owner }) => (
  <div>
    <p className="inter-bold py-2">Your host</p>
    <div className="flex gap-2">
      <img
        className="w-[3rem] h-[3rem] rounded-full object-cover aspect-auto "
        src={owner!.avatar.url}
        alt={owner!.avatar.alt}
      />
      <p>{owner!.name}</p>
    </div>
  </div>
);
