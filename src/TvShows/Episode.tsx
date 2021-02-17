import Episode from "./EpisodeType";
import {makeEpisodeCode} from "./EpisodeUtils";

type EpisodeCardProps = { episode: Episode }

function EpisodeCard(props: EpisodeCardProps) {
    return (
        <div className="episode-card">
            <h1>{props.episode.name} - {makeEpisodeCode(props.episode)}</h1>
            <img src={props.episode.image.medium} alt="screengrab of episode" />
            <p>{stripTags(props.episode.summary)}</p>
        </div>
    );
}
//The above assumes all episodes have images (not true for ALL shows).

//Remove tags by replacing any matching occurrences with an empty string.
//This function uses a regular expression.  
//It is NOT required you understand regular expressions for the course.
function stripTags(str: string) {
    if (!str) {
        return str;
    }
    //Components of the regex:
    //
    // <       a literal <
    // \/ ?    a literal /  (zero or one occurrences)
    // [a-z]+  a sequence of at least one alphabet character (see flags)
    // >       a literal >
    // gi      global and case-insensitive "flags"
    //
    //Further regex breakdown at https://regexr.com/532tm
    return str.replace(/<\/?[a-z]+>/gi, "");
}

export default EpisodeCard;