import { VenueDetailsProps } from './VenueDetails';

type VenueImageProps = {
  media: {
    url: string;
    alt: string;
  }[];
};
export const VenueImage: React.FC<VenueImageProps> = ({
  media,
}: VenueImageProps) => {
  console.log(media, 'inimage');
  return media.map(({ url, alt }) => (
    <img
      className="w-full max-h-[600px] rounded-md shadow-overlay object-cover aspect-auto my-10"
      src={url}
      alt={alt}
    />
  ));
};
