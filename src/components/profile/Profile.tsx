import { User } from 'phosphor-react';
import { ProfileModal } from './ProfileModal';
export const Profile = () => (
  <section className="relative flex items-center bg-orange-500">
    <button>
      <User size={25} />
    </button>
    <ProfileModal />
  </section>
);
