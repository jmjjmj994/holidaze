import { VenueDetailsProps } from './VenueDetails';

type VenueImageProps = {
  media: {
    url: string;
    alt: string;
  };
};
export const VenueImage: React.FC<VenueImageProps> = ({ media }) => {
  return <img src={media[0]!.url} alt={media[0].alt} />;
};
