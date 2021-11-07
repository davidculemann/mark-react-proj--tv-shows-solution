import React, { useState } from 'react';
import EpisodeList from './EpisodeList';
import Episode from './EpisodeType';
import { makeEpisodeCode } from "./EpisodeUtils";

interface SearchableEpisodeListProps {
    episodes: Episode[]
}
function SearchableEpisodeList(props: SearchableEpisodeListProps) {

    const allEpisodes = props.episodes;

    //Maintain a search query string (from text input box)
    const [query, setQuery] = useState("");

    // Maintain a (possibly null) selected episode (from the drop-down)
    const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);

    // Compute which episode(s) should be shown
    const episodesToShow: Episode[] = selectedEpisode ? [selectedEpisode] : findEpisodesMatching(query, allEpisodes);


    function handleEpisodeSelected(id: string) {
        const foundEpisode = allEpisodes.find(episode => episode.id === Number(id));
        if (foundEpisode) {
            setSelectedEpisode(foundEpisode);
        } else {
            setSelectedEpisode(null);
        }
    }

    return (
        <div>
            <div id="controlPanel">

                {!selectedEpisode &&
                    <>
                        <span className="control">Filtering for </span>
                        <input
                            id="searchInput"
                            className="control"
                            type="text"
                            placeholder="search within episodes..."
                            value={query}
                            onChange={event => setQuery(event.target.value)}
                        />
                    </>
                }

                <div className="control">
                    {selectedEpisode ?
                        <>Selected 1 Episode</>
                        :
                        <>Found {episodesToShow.length} episode(s)</>
                    }
                </div>

                {/* either show the select input OR a "show all" button, if we've already selected one */}
                {
                    selectedEpisode ?
                        <button
                            className="control"
                            onClick={() => setSelectedEpisode(null)}>
                            Show all episodes
                        </button>
                        :
                        <select
                            className="control"
                            onChange={event => handleEpisodeSelected(event.target.value)}
                            value={episodesToShow.length > 0 ? episodesToShow[0].id : ""} >

                            {
                                //create the options within the select
                                episodesToShow.map(episode =>
                                    <option
                                        key={episode.id}
                                        value={episode.id}>
                                        {makeEpisodeCode(episode) + " - " + episode.name}
                                    </option>)
                            }
                        </select>
                }
            </div>

            <EpisodeList episodes={episodesToShow} />
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