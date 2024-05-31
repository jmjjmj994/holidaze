import { MagnifyingGlass } from 'phosphor-react';
export const SearchBar = () => {
  return (
    <form className="flex items-center justify-center py-4">
      <section className="flex items-center justify-center gap-4 max-w-[50rem] w-full">
        <label htmlFor="search" className="h-full px-2 py-2 border rounded-sm">
          <MagnifyingGlass aria-label="search icon" />
        </label>
        <input
          id="search"
          className="w-full px-4 py-1 border rounded-sm"
          type="text"
          placeholder="Search"
        />
      </section>
    </form>
  );
};
