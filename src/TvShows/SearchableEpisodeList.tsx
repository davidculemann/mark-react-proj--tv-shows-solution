import React, { useState } from 'react';
import EpisodeList from './EpisodeList';
import Episode from './EpisodeType';

interface SearchableEpisodeListProps {
    episodes: Episode[]
}
function SearchableEpisodeList(props: SearchableEpisodeListProps) {

    const allEpisodes = props.episodes;

    //Explanation of main episode-search flow:
    //==========================================
    //user types into search box 
    //the registered event handler calls setQuery
    //setQuery tells react to change the react-maintained state variable    
    //a change to that state variable causes a re-render of this function component (which registered the state variable)
    //filteredEpisodes is recomputed and redisplayed

    //A STATE hook: Helps maintain a search query string (from text input box)
    const [query, setQuery] = useState("");

    const filteredEpisodes = findEpisodesMatching(query, allEpisodes);

    return (
        <div>
            <div id="controlPanel">

                <span className="control">Filtering for </span>

                <input
                    id="searchInput"
                    className="control"
                    type="text"
                    placeholder="search within episodes..."
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                />

                <div id="filterSummary" className="control">
                    {filteredEpisodes.length}
                </div>
            </div>

            <EpisodeList episodes={filteredEpisodes} />
        </div>
    )
}

/*=============================================================================
  ============== Pure "utility" functions - no React here ==========
  ===========================================================================*/

//Return the list of episodes which match the given query
function findEpisodesMatching(query: string, episodes: Episode[]) {
    return episodes.filter(episode => episodeMatchesQuery(episode, query));
}

//Return true if episode's name or summary 
//contains the given query string (case-insensitive)
//An episode is ALWAYS considered to contain the empty string ""
function episodeMatchesQuery(episode: Episode, query: string) {
    return (
        !query ||
        contains(episode.name, query) ||
        contains(episode.summary, query)
    );
}

//Return true if string a contains string b, case-insensitive.  Else false.
//Will return false if either a or b are falsy (e.g. empty strings)
function contains(a: string, b: string) {
    return (
        a && b &&
        a.toLowerCase().includes(b.toLowerCase())
    );
}

export default SearchableEpisodeList;