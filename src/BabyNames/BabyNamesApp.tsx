//Flow diagram: https://excalidraw.com/#json=5680880538353664,5FOVmiVqJ_XfHphPRCxGCA

import React, { useState } from "react";
import BabyNamesData from "./BabyNamesData.json";
import "./BabyNamesApp.css";

type Id = number;
interface NameInfo {
  name: string;
  sex: string;
  id: Id;
}
type NameClickHandler = (nameObj: NameInfo) => void;

BabyNamesData.sort((a, b) => (a.name < b.name ? -1 : 1));

const BabyNamesApp = () => {
  //HOOKS------------------------------------------------
  const [searchTerm, setSearchTerm] = useState("");
  const [favouritesIds, setFavouritesIds] = useState<Id[]>([]);
  const [selectedGender, setSelectedGender] = useState("a");
  //-----------------------------------------------------

  const addFavourite = (nameObj: NameInfo): void => {
    setFavouritesIds(favouritesIds.concat([nameObj.id]));
  };

  const removeFavourite = (nameObj: NameInfo): void => {
    console.log("removing", nameObj.name);
    const newIds = favouritesIds.filter((id) => id !== nameObj.id);
    setFavouritesIds(newIds);
  };

  const filterForSearch = (names: NameInfo[]) => {
    return searchTerm.trim().length > 0
      ? names.filter((o) =>
          o.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : names;
  };

  const filterByGender = (names: NameInfo[]) => {
    return names.filter(
      (o) => selectedGender === "a" || selectedGender === o.sex
    );
  };
  const filterOutFavourites = (names: NameInfo[]) => {
    return names.filter((o) => !favouritesIds.includes(o.id));
  };
  const selectMale = () => setSelectedGender("m");
  const selectFemale = () => setSelectedGender("f");
  const selectAllGenders = () => setSelectedGender("a");

  return (
    <div className="main">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectMale={selectMale}
        selectFemale={selectFemale}
        selectAllGenders={selectAllGenders}
        selectedGender={selectedGender}
      />
      <FavouritesList
        allNames={BabyNamesData}
        favouritesIds={favouritesIds}
        clickHandler={removeFavourite}
      />
      <MainList
        names={filterOutFavourites(
          filterByGender(filterForSearch(BabyNamesData))
        )}
        clickHandler={addFavourite}
      />
      <Footer />
    </div>
  );
};

interface ISearchBarProps {
  searchTerm: string;
  setSearchTerm: (st: string) => void;
  selectMale: () => void;
  selectFemale: () => void;
  selectAllGenders: () => void;
  selectedGender: string;
}

const SearchBar: React.FC<ISearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  selectMale,
  selectFemale,
  selectAllGenders,
  selectedGender,
}) => {
  return (
    <>
      <div className="controlBar">
        <input
          placeholder="Search for a name..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <span className="genderButtons">
          <div
            title="show all names"
            className={`chooser anyChooser ${
              selectedGender === "a" ? "selected" : ""
            }`}
            onClick={selectAllGenders}
          ></div>
          <div
            title="show only girls' names"
            className={`chooser femaleChooser ${
              selectedGender === "f" ? "selected" : ""
            }`}
            onClick={selectFemale}
          ></div>
          <div
            title="show only boys' names"
            className={`chooser maleChooser ${
              selectedGender === "m" ? "selected" : ""
            }`}
            onClick={selectMale}
          ></div>
        </span>
      </div>
    </>
  );
};

interface IFavouritesListProps {
  allNames: NameInfo[];
  favouritesIds: Id[];
  clickHandler: NameClickHandler;
}

const FavouritesList: React.FC<IFavouritesListProps> = ({
  allNames,
  favouritesIds,
  clickHandler,
}) => {
  return (
    <div className="favourites">
      <span>Favourites: </span>
      <ul>
        {favouritesIds.length === 0 ? (
          <span>Click some names below to add to your shortlist...</span>
        ) : (
          favouritesIds
            .map((favId) => allNames.find((obj) => obj.id === favId))
            .map(
              (nameObj) =>
                nameObj && ( //TODO: deal correctly with missing favourites
                  <BabyName
                    nameObj={nameObj}
                    clickHandler={clickHandler}
                    key={nameObj.id}
                  />
                )
            )
        )}
      </ul>
    </div>
  );
};
const classForName = ({ sex }: { sex: string }) =>
  sex === "m" ? "male" : "female";

interface IBabyNameProps {
  nameObj: NameInfo;
  clickHandler: NameClickHandler;
}

const BabyName: React.FC<IBabyNameProps> = ({ nameObj, clickHandler }) => {
  return (
    <li
      className={"name " + classForName(nameObj)}
      onClick={(e) => clickHandler(nameObj)}
    >
      {nameObj.name}
    </li>
  );
};

interface IMainListProps {
  names: NameInfo[];
  clickHandler: NameClickHandler;
}

const MainList: React.FC<IMainListProps> = ({ names, clickHandler }) => {
  return (
    <div>
      <ul>
        {names.map((nameObj) => (
          <BabyName
            key={nameObj.id}
            clickHandler={clickHandler}
            nameObj={nameObj}
          />
        ))}
      </ul>
    </div>
  );
};

const Footer = () => {
  return (
    <footer>
      <a href="https://excalidraw.com/#json=5680880538353664,5FOVmiVqJ_XfHphPRCxGCA">
        Flow Diagram
      </a>
    </footer>
  );
};

export default BabyNamesApp;
