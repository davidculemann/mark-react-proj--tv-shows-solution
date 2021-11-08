// TODO: update this flow diagram
//Flow diagram: https://excalidraw.com/#json=5680880538353664,5FOVmiVqJ_XfHphPRCxGCA

import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SearchableEpisodeList from "./SearchableEpisodeList";
import "./TvShowsApp.css";
import Episode from "./EpisodeType";

function TvShowsApp() {

  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {

    async function fetchAsSaveEpisodes() {
      const response = await fetch('https://api.tvmaze.com/shows/82/episodes');
      const episodesFromBody: Episode[] = await response.json();
      setEpisodes(episodesFromBody);
    }

    fetchAsSaveEpisodes();
  }, []);

  return (
    <div className="App">
      <Header />
      <SearchableEpisodeList episodes={episodes} />
      <Footer />
    </div>
  );
}

export default TvShowsApp;
