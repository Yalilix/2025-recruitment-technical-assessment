import { ActionBar } from '../components/ActionBar';
import { BuildingCards } from '../components/BuildingCards';
import { Header } from '../components/Header';

export const Browse = () => {
  return (
    <div>
      <Header />
      <ActionBar />
      <BuildingCards />
    </div>
  );
};
