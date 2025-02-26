import { useMediaQuery } from '@mui/material';
import data from '../../../data.json';
import { getImagesWebp, getRoomAvailableColors } from '../../helperFunctions';

export const BuildingCards = () => {
  const images = getImagesWebp('webp');
  const isMediumScreen = useMediaQuery('(max-width:768px)');

  return (
    <>
      <div className="flex flex-wrap px-4 pb-2 gap-2">
        {images.map((image, index) => {
          return (
            <div
              key={index}
              className={`flex md:flex-col justify-between ${
                isMediumScreen ? 'items-center' : ''
              } rounded-lg
                        lg:w-[calc(20%-8px)] md:w-[calc(50%-8px)] w-full
                        lg:min-h-[40vh] md:min-h-[20vh] min-h-[13vh]`}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {isMediumScreen ? (
                <>
                  <div
                    className="max-w-full md:bg-orange-500 h-12 text-white
                        m-2 flex items-center px-4 rounded-md md:text-base text-xl md:font-normal font-semibold"
                  >
                    {data[index].name}
                  </div>
                  <div
                    className="flex items-center justify-center md:self-end bg-white 
                                lg:w-1/2 md:w-1/3 w-24 h-9 md:m-2 m-6
                                rounded-2xl px-2 md:text-xs text-sm md:tracking-normal tracking-wide gap-2"
                  >
                    <div
                      className={`${getRoomAvailableColors(
                        data[index].rooms_available
                      )} size-2.5 rounded-full`}
                    />
                    {isMediumScreen
                      ? `${data[index].rooms_available}/${data[index].rooms_available}`
                      : `${data[index].rooms_available} rooms available`}
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="flex items-center justify-center self-end bg-white lg:w-1/2 w-1/3 h-9 m-2
                        rounded-2xl px-2 text-xs gap-2"
                  >
                    <div
                      className={`${getRoomAvailableColors(
                        data[index].rooms_available
                      )} size-2.5 rounded-full`}
                    />
                    {data[index].rooms_available} rooms available
                  </div>
                  <div
                    className="max-w-full bg-orange-500 h-12 text-white
                        m-2 flex items-center px-4 rounded-md"
                  >
                    {data[index].name}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
