import { useVenuesQuery } from 'src/client/api/use-venues-query.hook';
export const App = () => {
  const { isPending, isError, data } = useVenuesQuery();
  console.log(data);
  return <div>app</div>;
};
