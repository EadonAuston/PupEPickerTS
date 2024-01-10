import { DogCard } from "../Shared/DogCard";
import { DogData } from "../types";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({
  dogs,
  isLoading,
  handleTrashIconClick,
  handleHeartClick,
  handleEmptyHeartClick,
}: {
  dogs: DogData[];
  isLoading: boolean;
  handleTrashIconClick: (dogId: number) => void;
  handleHeartClick: (dogId: number) => void;
  handleEmptyHeartClick: (dogId: number) => void;
}) => {
  return (
    <>
      <div className="content-container">
        {dogs.map((dog) => (
          <DogCard
            dog={{
              id: dog.id,
              image: dog.image,
              description: dog.description,
              isFavorite: dog.isFavorite,
              name: dog.name,
            }}
            key={dog.id}
            onTrashIconClick={() => handleTrashIconClick(dog.id)}
            onHeartClick={() => handleHeartClick(dog.id)}
            onEmptyHeartClick={() => handleEmptyHeartClick(dog.id)}
            isLoading={isLoading}
          />
        ))}
      </div>
    </>
  );
};
