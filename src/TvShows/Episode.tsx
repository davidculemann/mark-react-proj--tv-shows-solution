import Episode from "./EpisodeType";

type EpisodeCardProps = { episode: Episode }

function EpisodeCard(props: EpisodeCardProps) {
    return (
        <div className="episode-card">
            <h1>{props.episode.name} - {makeEpisodeCode(props.episode)}</h1>
            <img src={props.episode.image.medium} alt="screengrab of episode" />
            <p>{props.episode.summary}</p>
        </div>
    );
}
//The above assumes all episodes have images (not true for ALL shows).

//pad a number out to be an (at least) 2-digit string
//e.g. pad(3) -> "03"
function pad(num: number) {
    return num.toString().padStart(2, "0");
}

//return an episode code to represent the given episode, e.g. "S01E03"
function makeEpisodeCode(episode: Episode) {
    return `S${pad(episode.season)}E${pad(episode.number)}`;
}

export default EpisodeCard;