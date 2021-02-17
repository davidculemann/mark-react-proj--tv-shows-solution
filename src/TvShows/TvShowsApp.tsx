// TODO: update this flow diagram
//Flow diagram: https://excalidraw.com/#json=5680880538353664,5FOVmiVqJ_XfHphPRCxGCA

import React from "react";
import AllEpisodesData from "./EpisodesData.json";
import Header from "./Header";
import Footer from "./Footer";
import SearchableEpisodeList from "./SearchableEpisodeList";
import "./TvShowsApp.css";

function TvShowsApp() {
  return (
    <div className="App">
      <Header />
      <SearchableEpisodeList episodes={AllEpisodesData} />
      <Footer />
    </div>
  );
}

export default TvShowsApp;
