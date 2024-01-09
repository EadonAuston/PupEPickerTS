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
    return Requests.getAllDogs()
      .then((dogs) => this.setState({ allDogs: dogs }))
      .catch((e) => console.error("Error fetching dog data:", e));
  };

  componentDidMount() {
    this.fetchData();
  }

  setWhatToFilter = (inputValue: WhatToFilter) => {
    this.setState({ whatToFilter: inputValue });
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

    const createRequest = (
      typeOfRequest: "delete" | "favorite" | "unfavorite",
      dogId: number
    ) => {
      typeOfRequest === "delete"
        ? (() => {
            this.setState({ isLoading: true });
            Requests.deleteDog(dogId)
              .then(() =>
                this.fetchData().then(() => this.setState({ isLoading: false }))
              )
              .catch((e) => {
                console.log("Error Occurred", e);
                alert("Bad Server Request or Connectivity");
                this.setState({ isLoading: false });
              });
          })()
        : (() => {
            this.setState({ isLoading: true });
            Requests.updateDog(dogId, {
              isFavorite: typeOfRequest === "favorite" ? true : false,
            })
              .then(() =>
                this.fetchData().then(() => this.setState({ isLoading: false }))
              )
              .catch((e) => {
                console.log("Error Occurred", e);
                alert("Bad Server Request or Connectivity");
                this.setState({ isLoading: false });
              });
          })();
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
              createRequest={createRequest}
              isLoading={isLoading}
            />
          ) : (
            <ClassCreateDogForm fetchData={this.fetchData} />
          )}
        </ClassSection>
      </div>
    );
  }
}
