import Episode from "./EpisodeType"

//pad a number out to be an (at least) 2-digit string
//e.g. pad(3) -> "03"
function pad(num: number) {
    return num.toString().padStart(2, "0");
}

//return an episode code to represent the given episode, e.g. "S01E03"
function makeEpisodeCode(episode: Episode) {
    return `S${pad(episode.season)}E${pad(episode.number)}`;
}

export {makeEpisodeCode};