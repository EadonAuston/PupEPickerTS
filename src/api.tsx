import { DogData } from "./types";

export const baseUrl = "http://localhost:3000";

export const Requests = {
  // should return a promise with all dogs in the database
  getAllDogs: (): Promise<DogData[]> => {
    return fetch(`${baseUrl}/dogs/`, { method: "GET" }).then((response) => {
      if (!response.ok) throw new Error("Error Fetching Dog Data");
      return response.json();
    });
  },

  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog: async ({
    name,
    description,
    image,
    isFavorite,
  }: {
    name: string;
    description: string;
    image: string;
    isFavorite: boolean;
  }) => {
    return fetch(`${baseUrl}/dogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        image,
        isFavorite,
      }),
    }).then((response) => {
      if (!response.ok) throw new Error("Error Posting Dog");
      return response.json() as Promise<unknown>;
    });
  },

  // should delete a dog from the database
  deleteDog: async (id: number) => {
    return fetch(`${baseUrl}/dogs/${id}`, { method: "DELETE" }).then(
      (response) => {
        if (!response.ok) throw new Error(`Failed to delete dog: ${id}`);
        return response.json() as Promise<unknown>;
      }
    );
  },

  updateDog: async (id: number, updatedData: object) => {
    return fetch(`${baseUrl}/dogs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    }).then((response) => {
      if (!response.ok) throw new Error(`Failed to update dog: ${id}`);
      return response.json() as Promise<unknown>;
    });
  },

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    console.log("dummy stuff");
  },
};
