import { useVenuesQuery } from 'src/client/api/use-venues-query.hook';
import { AppCardWrapper } from './AppCardWrapper';
import { useEffect } from 'react';
export const App = () => {
  const { isPending, Error, data, handlePage } = useVenuesQuery();

  useEffect(() => {
    console.log('Height', document.documentElement.scrollHeight),
      console.log('Top', document.documentElement.scrollTop);
    console.log('window', window.innerHeight);

    if(window.innerHeight + document.documentElement.scrollTop  + 1 >= document.documentElement.scrollHeight) {
      handlePage()
    }
  }, []);

  return (
    <div>
      <AppCardWrapper />
    </div>
  );
};
