import { useEffect, useState } from "react";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";
import { DogData, WhatToFilter } from "../types";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import toast from "react-hot-toast";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<DogData[]>([]);
  const [whatToFilter, setWhatToFilter] =
    useState<WhatToFilter>("non-selected");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = () => {
    setIsLoading(true);
    return Requests.getAllDogs()
      .then(setAllDogs)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData().catch(() => {
      toast.error("Failed to fetch the dogs");
    });
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
    Requests.deleteDog(dogId)
      .then(() => {
        return fetchData();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleHeartClick = (dogId: number) => {
    setIsLoading(true);
    Requests.updateDog(dogId, { isFavorite: false })
      .then(() => {
        return fetchData();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEmptyHeartClick = async (dogId: number) => {
    setIsLoading(true);
    Requests.updateDog(dogId, { isFavorite: true })
      .then(() => {
        return fetchData();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const postDog = (
    name: string,
    description: string,
    image: string,
    isFavorite: boolean
  ) => {
    setIsLoading(true);
    return Requests.postDog({ name, description, image, isFavorite })
      .then(fetchData)
      .finally(() => {
        setIsLoading(false);
      });
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
