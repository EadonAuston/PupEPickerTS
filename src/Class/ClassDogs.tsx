import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { DogData } from "../types";

type ClassDogsProps = {
  dogs: DogData[];
  createRequest: (
    typeOfRequest: "delete" | "favorite" | "unfavorite",
    dogId: number
  ) => void;
  isLoading: boolean;
};

// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component<ClassDogsProps> {
  render() {
    const { dogs, createRequest, isLoading } = this.props;
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
              onTrashIconClick={() => createRequest("delete", dog.id)}
              onHeartClick={() => createRequest("unfavorite", dog.id)}
              onEmptyHeartClick={() => createRequest("favorite", dog.id)}
              isLoading={isLoading}
            />
          ))}
        </div>
      </>
    );
  }
}
