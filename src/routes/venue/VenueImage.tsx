type VenueImageProps = {
  media: {
    url: string;
    alt: string;
  }[];
};
export const VenueImage: React.FC<VenueImageProps> = ({ media }) => {
  console.log(media);
  return <img src="" alt="" />;
};
