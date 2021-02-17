import Episode from "./EpisodeType";
import {makeEpisodeCode} from "./EpisodeUtils";

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



export default EpisodeCard;