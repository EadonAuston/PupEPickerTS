import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { Requests } from "../api";
import { DogData, WhatToFilter } from "../types";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";

type ClassAppState = {
  allDogs: DogData[];
  whatToFilter: WhatToFilter;
  isLoading: boolean;
};

export class ClassApp extends Component<{}, ClassAppState> {
  state: ClassAppState = {
    allDogs: [],
    whatToFilter: "non-selected",
    isLoading: false,
  };

  fetchData = () => {
    this.setState({ isLoading: true });
    return Requests.getAllDogs()
      .then((dogs) => this.setState({ allDogs: dogs }))
      .finally(() => {
        this.setState({ isLoading: false });
      })
      .catch((e) => console.error("Error fetching dog data:", e));
  };

  componentDidMount() {
    this.fetchData();
  }

  setWhatToFilter = (inputValue: WhatToFilter) => {
    this.setState({ whatToFilter: inputValue });
  };

  setIsLoading = (inputValue: boolean) => {
    this.setState({ isLoading: inputValue });
  };

  render() {
    const { allDogs, whatToFilter, isLoading } = this.state;

    const filteredDogData = (() => {
      switch (whatToFilter) {
        case "favorite":
          return allDogs.filter((dog) => dog.isFavorite);
        case "unfavorite":
          return allDogs.filter((dog) => !dog.isFavorite);
        case "non-selected":
          return allDogs;
        default:
          return [];
      }
    })();

    const handleTrashIconClick = (dogId: number) => {
      this.setState({ isLoading: true });
      this.setState({ allDogs: allDogs.filter((dog) => dog.id !== dogId) });
      Requests.deleteDog(dogId)
        .finally(() => this.setState({ isLoading: false }))
        .catch(() => {
          this.setState({ allDogs: allDogs });
        });
    };

    const handleHeartClick = (dogId: number) => {
      this.setState({ isLoading: true });
      this.setState({
        allDogs: allDogs.map((dog) =>
          dog.id === dogId ? { ...dog, isFavorite: false } : dog
        ),
      });

      Requests.updateDog(dogId, { isFavorite: false })
        .finally(() => this.setState({ isLoading: false }))
        .catch(() => {
          this.setState({ allDogs: allDogs });
        });
    };

    const handleEmptyHeartClick = async (dogId: number) => {
      this.setState({ isLoading: true });
      this.setState({
        allDogs: allDogs.map((dog) =>
          dog.id === dogId ? { ...dog, isFavorite: true } : dog
        ),
      });

      Requests.updateDog(dogId, { isFavorite: true })
        .finally(() => this.setState({ isLoading: false }))
        .catch(() => {
          this.setState({ allDogs: allDogs });
        });
    };

    const postDog = (
      name: string,
      description: string,
      image: string,
      isFavorite: boolean
    ) => {
      this.setState({ isLoading: true });
      return Requests.postDog({ name, description, image, isFavorite });
    };

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          allDogs={allDogs}
          whatToFilter={whatToFilter}
          setWhatToFilter={this.setWhatToFilter}>
          {whatToFilter !== "create-dog" ? (
            <ClassDogs
              dogs={filteredDogData}
              handleTrashIconClick={handleTrashIconClick}
              handleHeartClick={handleHeartClick}
              handleEmptyHeartClick={handleEmptyHeartClick}
              isLoading={isLoading}
            />
          ) : (
            <ClassCreateDogForm
              fetchData={this.fetchData}
              postDog={postDog}
              setIsLoading={this.setIsLoading}
            />
          )}
        </ClassSection>
      </div>
    );
  }
}
