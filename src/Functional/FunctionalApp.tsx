import { useEffect, useState } from "react";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";
import { DogData, WhatToFilter } from "../types";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<DogData[]>([]);
  const [whatToFilter, setWhatToFilter] =
    useState<WhatToFilter>("non-selected");

  const fetchData = () => {
    return Requests.getAllDogs()
      .then(setAllDogs)
      .catch((e) => console.error("Error fetching dog data:", e));
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const [isLoading, setIsLoading] = useState(false);

  const createRequest = (
    typeOfRequest: "delete" | "favorite" | "unfavorite",
    dogId: number
  ) => {
    typeOfRequest === "delete"
      ? (() => {
          setIsLoading(true);
          Requests.deleteDog(dogId)
            .then(() => fetchData().then(() => setIsLoading(false)))
            .catch((e) => {
              console.log("Error Occurred", e);
              alert("Bad Server Request or Connectivity");
              setIsLoading(false);
            });
        })()
      : (() => {
          setIsLoading(true);
          Requests.updateDog(dogId, {
            isFavorite: typeOfRequest === "favorite" ? true : false,
          })
            .then(() => fetchData().then(() => setIsLoading(false)))
            .catch((e) => {
              console.log("Error Occurred", e);
              alert("Bad Server Request or Connectivity");
              setIsLoading(false);
            });
        })();
  };

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        allDogs={allDogs}
        whatToFilter={whatToFilter}
        setWhatToFilter={setWhatToFilter}>
        {whatToFilter !== "create-dog" ? (
          <FunctionalDogs
            dogs={filteredDogData}
            createRequest={createRequest}
            isLoading={isLoading}
          />
        ) : (
          <FunctionalCreateDogForm fetchData={fetchData} />
        )}
      </FunctionalSection>
    </div>
  );
}
