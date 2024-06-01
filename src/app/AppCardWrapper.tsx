import { useVenuesQuery } from 'src/client/api/use-venues-query.hook';
import { checkUrlValid } from 'src/utilities/utilities';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { Star } from 'phosphor-react';

export const AppCardWrapper = () => {
  const [filteredVenues, setFilteredVenues] = useState([]);
  const { data, isPending, handlePage } = useVenuesQuery();

  useEffect(() => {
    if (!isPending && data.data.length > 0) {
      const filterData = data.data.filter(
        (venue) =>
          venue.location.address &&
          venue.location.city &&
          venue.location.country &&
          venue.name.length < 30 &&
          venue.media.length > 0
      );

      const filteredDataWithValidUrls = filterData.filter(async (venue) => {
        const imageUrl = venue.media[0].url;
        try {
          const isValid = await checkUrlValid(imageUrl);
          return isValid;
        } catch (error) {
          console.error('Error fetching URL:', error);
          return false;
        }
      });
      setFilteredVenues(filteredDataWithValidUrls);
    }
  }, [data, isPending]);

  useEffect(() => {
    console.log('Height', document.documentElement.scrollHeight),
      console.log('Top', document.documentElement.scrollTop);
    console.log('window', window.innerHeight);

    const scrolling = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        handlePage();
      }
    };
    window.addEventListener('scroll', scrolling);
  }, [handlePage]);

  if (isPending && !data) return <p>Loading...</p>;

  return (
    <section className={styles.app_grid}>
 {/*      {filteredVenues.map(
        ({ id, media, name, location, rating, owner, price }) => (
          <Link to={''}>
            <article className="flex flex-col gap-2" key={id}>
              <div>
                <img
                  className="h-full w-full  aspect-square object-cover rounded-md"
                  src={media[0].url}
                  alt={`image of venue`}
                />
              </div>
              <div className="flex justify-between">
                <div className="flex gap-1">
                  <p>{location?.address}</p>, <p>{location?.city}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star /> {rating}
                </div>
              </div>
              <div>
                <p>${price} night</p>
              </div>
            </article>
          </Link>
        )
      )} */}
    </section>
  );
};
