import { MagnifyingGlass } from 'phosphor-react';

export const SearchBar = () => {
  return (
    <section className="flex items-center justify-center  max-w-[50rem] w-full m-auto gap-4">
      <form className=" py-4 w-full">
        <section className="flex items-center justify-center gap-4">
          <label
            htmlFor="search"
            className="h-full px-2 py-2 border rounded-sm cursor-pointer"
          >
            <MagnifyingGlass
              size={25}
              weight="light"
              aria-label="search icon"
            />
          </label>
          <input
            id="search"
            className="w-full px-4 py-2 border rounded-sm"
            type="text"
            placeholder="Search"
          />
        </section>
      </form>
    </section>
  );
};
