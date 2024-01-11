import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { Requests } from "../api";
import { DogData, WhatToFilter } from "../types";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import toast from "react-hot-toast";

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
      Requests.deleteDog(dogId)
        .then(() => {
          return this.fetchData();
        })
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    };

    const handleHeartClick = (dogId: number) => {
      this.setState({ isLoading: true });
      Requests.updateDog(dogId, { isFavorite: false })
        .then(() => {
          return this.fetchData();
        })
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    };

    const handleEmptyHeartClick = async (dogId: number) => {
      this.setState({ isLoading: true });
      Requests.updateDog(dogId, { isFavorite: true })
        .then(() => {
          return this.fetchData();
        })
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    };

    const postDog = (
      name: string,
      description: string,
      image: string,
      isFavorite: boolean
    ) => {
      this.setState({ isLoading: true });
      return Requests.postDog({ name, description, image, isFavorite })
        .then(this.fetchData)
        .finally(() => {
          this.setState({ isLoading: false });
        });
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
