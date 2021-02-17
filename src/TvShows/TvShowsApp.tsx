// TODO: update this flow diagram
//Flow diagram: https://excalidraw.com/#json=5680880538353664,5FOVmiVqJ_XfHphPRCxGCA

import React from "react";
import EpisodesData from "./EpisodesData.json";
import "./TvShowsApp.css";


interface Image {
  medium: string,
  original: string
}

interface Links {
  self: { href: string }
}

interface Episode {
  id: number,
  url: string,
  name: string,
  season: number,
  number: number,
  type: string,
  airdate: string,
  airtime: string,
  airstamp: string,
  runtime: number,
  image: Image,
  summary: string,
  _links: Links
}


function TvShowsApp() {
  return (
    <div className="App">
      <Header />
      <EpisodeList episodes={EpisodesData} />
      <Footer />
    </div>
  );
}


function Header() {
  return (<header>Level 100 Sample Solution - React and TypeScript</header>);
}

type EpisodeListProps = { episodes: Episode[] }

function EpisodeList({ episodes }: EpisodeListProps) {
  return (
    <div className="episode-list">
      {episodes.map((episode) => <EpisodeCard key={episode.id} episode={episode} />)}
    </div>
  )
}

type EpisodeCardProps = { episode: Episode }

function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <div className="episode-card">
      <h1>{episode.name} - {makeEpisodeCode(episode)}</h1>
      <img src={episode.image.medium} alt="screengrab of episode" />
      <p>{episode.summary}</p>
    </div>
  );
}
//The above assumes all episodes have images (not true for ALL shows).



function Footer() {
  return (
    <footer>
      Credits: Episode data is originally
      from the fantastic <a href="https://tvmaze.com/">TVmaze</a> via
      their <a href="https://www.tvmaze.com/api">API</a>.
    </footer>
  )
}


//==== NOT components - some utility functions ================================

//return an episode code to represent the given episode, e.g. "S01E03"
function makeEpisodeCode(episode: Episode) {
  return `S${pad(episode.season)}E${pad(episode.number)}`;
}

//pad a number out to be an (at least) 2-digit string
//e.g. pad(3) -> "03"
function pad(num: number) {
  return num.toString().padStart(2, "0");
}

export default TvShowsApp;
