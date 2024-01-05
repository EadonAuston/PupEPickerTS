import { Link } from "react-router-dom";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { useDogData } from "../Providers/DogDataProvider";

export const FunctionalSection = () => {
  const { setWhatToFilter, whatToFilter, favoritedAmt, unfavoritedAmt } =
    useDogData();

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${
              whatToFilter === "favorite" ? "active" : ""
            }`}
            onClick={() => {
              whatToFilter === "favorite"
                ? setWhatToFilter("non-selected")
                : setWhatToFilter("favorite");
            }}>
            favorited ( {favoritedAmt} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              whatToFilter === "unfavorite" ? "active" : ""
            }`}
            onClick={() => {
              whatToFilter === "unfavorite"
                ? setWhatToFilter("non-selected")
                : setWhatToFilter("unfavorite");
            }}>
            unfavorited ( {unfavoritedAmt} )
          </div>
          <div
            className={`selector ${
              whatToFilter === "create-dog" ? "active" : ""
            }`}
            onClick={() => {
              whatToFilter === "create-dog"
                ? setWhatToFilter("non-selected")
                : setWhatToFilter("create-dog");
            }}>
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">
        {whatToFilter !== "create-dog" ? (
          <FunctionalDogs />
        ) : (
          <FunctionalCreateDogForm />
        )}
      </div>
    </section>
  );
};
