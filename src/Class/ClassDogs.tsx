import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Requests } from "../api";
import { DogData } from "../types";

type ClassDogsProps = {
  dogData: DogData[];
  updatePage: () => Promise<void>;
};

// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component<ClassDogsProps> {
  render() {
    const { dogData, updatePage } = this.props;
    const handleTrashIconClick = async (dogId: number) => {
      await Requests.deleteDog(dogId);
      await updatePage();
    };

    const handleHeartClick = async (dogId: number) => {
      await Requests.updateDog(dogId, { isFavorite: false });
      await updatePage();
    };

    const handleEmptyHeartClick = async (dogId: number) => {
      await Requests.updateDog(dogId, { isFavorite: true });
      await updatePage();
    };

    return (
      <>
        <div className="content-container">
          {dogData.map((dog) => (
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
              isLoading={false}
            />
          ))}
        </div>
      </>
    );
  }
}
