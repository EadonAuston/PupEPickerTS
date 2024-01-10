import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { DogData, WhatToFilter } from "../types";

type ClassSectionProps = {
  allDogs: DogData[];
  whatToFilter: WhatToFilter;
  setWhatToFilter: (inputValue: WhatToFilter) => void;
  children: ReactNode;
};

export class ClassSection extends Component<ClassSectionProps> {
  render() {
    const { allDogs, whatToFilter, setWhatToFilter, children } = this.props;
    const favoritedAmt = allDogs.filter((dog) => dog.isFavorite).length;
    const unfavoritedAmt = allDogs.filter((dog) => !dog.isFavorite).length;

    const toggleWhatToFilter = (input: WhatToFilter) => {
      if (input === whatToFilter) setWhatToFilter("non-selected");
      else setWhatToFilter(input);
    };

    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>
          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>
          <div className="selectors">
            {/* This should display the favorited count */}
            <div
              className={`selector ${
                whatToFilter === "favorite" ? "active" : ""
              }`}
              onClick={() => {
                toggleWhatToFilter("favorite");
              }}>
              favorited ( {favoritedAmt} )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={`selector ${
                whatToFilter === "unfavorite" ? "active" : ""
              }`}
              onClick={() => {
                toggleWhatToFilter("unfavorite");
              }}>
              unfavorited ( {unfavoritedAmt} )
            </div>
            <div
              className={`selector ${
                whatToFilter === "create-dog" ? "active" : ""
              }`}
              onClick={() => {
                toggleWhatToFilter("create-dog");
              }}>
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">{children}</div>
      </section>
    );
  }
}
