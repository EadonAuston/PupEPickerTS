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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = () => {
    setIsLoading(true);
    return Requests.getAllDogs()
      .then(setAllDogs)
      .finally(() => setIsLoading(false))
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

  const handleTrashIconClick = (dogId: number) => {
    setIsLoading(true);
    setAllDogs(allDogs.filter((dog) => dog.id !== dogId));
    Requests.deleteDog(dogId)
      .finally(() => setIsLoading(false))
      .catch(() => {
        setAllDogs(allDogs);
      });
  };

  const handleHeartClick = (dogId: number) => {
    setIsLoading(true);
    setAllDogs(
      allDogs.map((dog) =>
        dog.id === dogId ? { ...dog, isFavorite: false } : dog
      )
    );

    Requests.updateDog(dogId, { isFavorite: false })
      .finally(() => setIsLoading(false))
      .catch(() => {
        setAllDogs(allDogs);
      });
  };

  const handleEmptyHeartClick = async (dogId: number) => {
    setIsLoading(true);
    setAllDogs(
      allDogs.map((dog) =>
        dog.id === dogId ? { ...dog, isFavorite: true } : dog
      )
    );

    Requests.updateDog(dogId, { isFavorite: true })
      .finally(() => setIsLoading(false))
      .catch(() => {
        setAllDogs(allDogs);
      });
  };

  const postDog = (
    name: string,
    description: string,
    image: string,
    isFavorite: boolean
  ) => {
    setIsLoading(true);
    return Requests.postDog({ name, description, image, isFavorite });
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
            handleTrashIconClick={handleTrashIconClick}
            handleHeartClick={handleHeartClick}
            handleEmptyHeartClick={handleEmptyHeartClick}
            isLoading={isLoading}
          />
        ) : (
          <FunctionalCreateDogForm
            fetchData={fetchData}
            postDog={postDog}
            setIsLoading={setIsLoading}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
