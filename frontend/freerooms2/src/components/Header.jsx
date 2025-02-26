import freerooomLogo from '../../../assets/freeRoomsLogo.png';
import freerooomDoorClosed from '../../../assets/freeroomsDoorClosed.png';
import { PiSquaresFourFill } from 'react-icons/pi';
import { IoMdSearch } from 'react-icons/io';
import { MdMap } from 'react-icons/md';
import { MdDarkMode } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

export const Header = () => {
  const icons = [IoMdSearch, PiSquaresFourFill, MdMap, MdDarkMode];
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const checkCurrentPage = (iconIndex) => {
    const pages = ['', 'browse', 'map', 'darkmode'];
    if (location.pathname === '/' + pages[iconIndex]) {
      return true;
    }
    return false;
  };

  return (
    <div className="h-16 border-b border-gray-200 flex justify-between items-center px-2">
      <div className="flex gap-1 text-4xl justify-center items-center">
        <button
          className="cursor-pointer size-14"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            src={isOpen ? freerooomLogo : freerooomDoorClosed}
            alt="Freerooms Logo"
          />
        </button>
        <h2 className="text-orange-500 font-sans hidden sm:block">Freerooms</h2>
      </div>
      <div className="flex gap-2.5">
        {icons.map((Icon, index) => {
          return (
            <button className="hover:bg-orange-50" key={index}>
              <Icon
                size={44}
                className={`border border-orange-300 p-2.5 rounded-md cursor-pointer
                          text-orange-500 hover:border-orange-500 
                          ${
                            checkCurrentPage(index)
                              ? 'bg-orange-500 text-white '
                              : ' '
                          }`}
              ></Icon>
            </button>
          );
        })}
      </div>
    </div>
  );
};
