import { PiSealCheckLight } from 'react-icons/pi';
import { PrimaryButton } from 'src/components/button/PrimaryButton';
export const AccountCard = () => {
  return (
    <article className="flex flex-col gap-4 bg-custom-background_white  shadow-raised  max-w-[20rem] w-full px-2 py-2 rounded-md border">
      <img
        className="w-[6rem] h-[6rem] rounded-full object-cover aspect-auto shadow-overlay"
        src="src/assets/michael-dam-mEZ3PoFGs_k-unsplash.jpg"
        alt=""
      />
      <div className="flex flex-col gap-2">
        <p className="flex items-center gap-2">
          Jay Josh The First
          <span>
            <PiSealCheckLight size={25} fill="blue" />
          </span>
        </p>
      </div>
      <div>
        <PrimaryButton type="button" width="auto">
          Edit profile
        </PrimaryButton>
      </div>
    </article>
  );
};
