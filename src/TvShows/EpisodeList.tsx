import EpisodeCard from "./Episode";
import Episode from "./EpisodeType";

type EpisodeListProps = { episodes: Episode[] }

function EpisodeList(props: EpisodeListProps) {
    return (
        <div className="episode-list">
            {
                props.episodes.map(
                    (episode) => <EpisodeCard
                        key={episode.id}
                        episode={episode}
                    />
                )
            }
        </div>
    )
}




export default EpisodeList