import { useParams } from 'react-router-dom';
export const Venue = () => {
  const { id } = useParams();

  return <p>venue</p>;
};
