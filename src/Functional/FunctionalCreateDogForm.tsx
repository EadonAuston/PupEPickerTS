import { dogPictures } from "../dog-pictures";
import { useState } from "react";
import { toast } from "react-hot-toast";

const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({
  fetchData,
  postDog,
  setIsLoading,
}: {
  fetchData: () => Promise<void>;
  postDog: (
    name: string,
    description: string,
    image: string,
    isFavorite: boolean
  ) => Promise<any>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const isFavorite = false;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postDog(name, description, image, isFavorite)
      .then(() => {
        toast.success("Dog Successfully Created!");
        if (!image) {
          setImage(defaultSelectedImage);
        }
        fetchData();
        setName("");
        setDescription("");
      })
      .finally(() => setIsLoading(false))
      .catch((error: unknown) => {
        toast.error("Dog Creation Unsuccessful");
        console.error("Error creating dog:", error);
      });
  };

  return (
    <form action="" id="create-dog-form" onSubmit={(e) => handleSubmit(e)}>
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        disabled={false}
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        disabled={false}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        value={description}></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id="picture"
        onChange={(e) => {
          setImage(e.target.value);
        }}
        value={image}>
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" />
    </form>
  );
};
