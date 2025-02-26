import { IoMdSearch } from 'react-icons/io';

export const SearchBar = () => {
  return (
    <div
      className="group flex gap-2 border border-gray-300 w-full md:w-2/5 px-4 py-1 rounded-sm h-12
                items-center group-focus-within:border-orange-500 hover:border-gray-700"
    >
      <IoMdSearch size={22} color="gray" className="" />
      <input
        type="search"
        id="building-search"
        placeholder="Search for a building..."
        className="w-full focus:outline-none"
      />
    </div>
  );
};
