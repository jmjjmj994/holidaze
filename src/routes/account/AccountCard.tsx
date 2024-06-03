import { PiSealCheckLight } from 'react-icons/pi';
import { PrimaryButton } from 'src/components/button/PrimaryButton';
type AccountCardProps = {
  avatar: {
    url: string;
    alt: string;
  };
  name: string;
  venueManager: boolean;
  bio: string;
  handleOpenModal: () => void;
};
export const AccountCard: React.FC<AccountCardProps> = ({
  avatar: { url, alt },
  name,
  venueManager,
  bio,
  handleOpenModal,
}) => {
  return (
    <article className="flex flex-col gap-4 bg-custom-background_white  shadow-raised  max-w-[25rem] w-full px-2 py-2 rounded-md border">
      <img
        className="w-[6rem] h-[6rem] rounded-full object-cover aspect-auto shadow-overlay"
        src={url}
        alt={alt}
      />

      <div className="flex flex-col gap-2 border rounded-md px-2 py-2">
        <p className="flex items-center gap-2">
          {name}
          {venueManager && <PiSealCheckLight size={25} fill="blue" />}
        </p>
      </div>

      <div className="border rounded-md px-2 py-2">
        <p>{bio}</p>
      </div>

      <div>
        <PrimaryButton onClick={handleOpenModal} type="button" width="auto">
          Edit profile
        </PrimaryButton>
      </div>
    </article>
  );
};
