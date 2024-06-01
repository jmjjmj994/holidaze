import { Link } from 'react-router-dom';
import { Lock, Calendar } from 'phosphor-react';

type AccountOptionProps = { venueManager: boolean; name: string };
type VenueManagerActionsProp = { venueManager: boolean; name: string };

import { CirclesThreePlus } from 'phosphor-react';

export type ActionsCardType = {
  id: number;
  path: string;
  title: string;
  icon: JSX.Element;
  content: string;
  area?: string;
};

const ManageVenuesCard: ActionsCardType = {
  id: 1,
  path: '/manage-venues',
  icon: <CirclesThreePlus size={25} />,
  title: 'Manage Your Venues',
  content: 'Create, update, view, and delete your venues',
};

const VenueManagerActions: React.FC<VenueManagerActionsProp> = ({
  venueManager,
  name,
}) => {
  return (
    <Link
      className={`${
        venueManager ? 'pointer-events-auto' : 'pointer-events-none'
      } relative`}
      to={`${venueManager ? `/manage-venues/${name}` : ''}`}
    >
      {!venueManager && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-md z-1 pointer-events-auto">
          <Lock className="text-gray-500" size={80} />
        </div>
      )}
      <article className="flex flex-col justify-between gap-2 py-5 px-4 h-full rounded-md border bg-custom-background_white shadow-raised hover:bg-gray-100 transition-colors col-3">
        {ManageVenuesCard.icon}
        <div>
          <p>{ManageVenuesCard.title}</p>
          <p>{ManageVenuesCard.content}</p>
        </div>
      </article>
    </Link>
  );
};

export const AccountOptions: React.FC<AccountOptionProps> = ({
  venueManager,
  name,
}) => {
  return (
    <>
      <Link to={`/manage-bookings/${name}`}>
        <article
          className={`flex flex-col h-full justify-between gap-2  py-5 px-4 rounded-md border  bg-custom-background_white shadow-raised hover:bg-gray-100 transition-colors `}
        >
          <Calendar size={25} />
          <div>
            <h2>Bookings</h2>
            <p>View your upcoming bookings</p>
          </div>
        </article>
      </Link>
      <VenueManagerActions venueManager={venueManager} name={name} />
    </>
  );
};
