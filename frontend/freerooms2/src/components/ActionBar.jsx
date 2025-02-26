import { MdFilterListAlt } from 'react-icons/md';
import { CgSortAz } from 'react-icons/cg';
import { SearchBar } from './SearchBar';
import { useMediaQuery } from '@mui/material';

export const ActionBar = () => {
  const isMediumScreen = useMediaQuery('(max-width:768px)');

  return (
    <div className="flex flex-col md:flex-row flex-wrap justify-between p-4 gap-2">
      {isMediumScreen ? (
        <>
          <SearchBar />
          <div className="flex justify-between">
            <button
              className="border-2 border-orange-500 p-2.5 rounded-xl cursor-pointer w-40 h-12
                    text-orange-500 font-semibold flex justify-center gap-2"
            >
              <MdFilterListAlt
                size={25}
                color="darkOrange"
                className="-mt-1 -ml-4"
              />
              <span>Filters</span>
            </button>
            <button
              className="border-2 border-orange-500 p-2.5 rounded-xl cursor-pointer w-40 h-12
                    text-orange-500 font-semibold flex justify-center gap-2"
            >
              <CgSortAz size={35} color="darkOrange" className="-mt-2 -ml-4" />
              <span>Sort</span>
            </button>
          </div>
        </>
      ) : (
        <>
          <button
            className="border-2 border-orange-500 p-2.5 rounded-xl cursor-pointer w-40 h-12
                    text-orange-500 font-semibold flex justify-center gap-2"
          >
            <MdFilterListAlt
              size={25}
              color="darkOrange"
              className="-mt-1 -ml-4"
            />
            <span>Filters</span>
          </button>
          <SearchBar />
          <button
            className="border-2 border-orange-500 p-2.5 rounded-xl cursor-pointer w-40 h-12
                    text-orange-500 font-semibold flex justify-center gap-2"
          >
            <CgSortAz size={35} color="darkOrange" className="-mt-2 -ml-4" />
            <span>Sort</span>
          </button>
        </>
      )}
    </div>
  );
};
