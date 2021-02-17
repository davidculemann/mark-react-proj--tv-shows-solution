import React, { useState, useEffect } from 'react';
import EpisodeList from './EpisodeList';
import Episode from './EpisodeType';
import { makeEpisodeCode } from "./EpisodeUtils";

interface SearchableEpisodeListProps {
    episodes: Episode[]
}
function SearchableEpisodeList(props: SearchableEpisodeListProps) {

    const allEpisodes = props.episodes;

    //Explanation of main episode-search flow:
    //==========================================
    //user types into search box 
    //the registered event handler calls setQuery
    //setQuery changes query
    //the useEffect hook notices query changed,
    //and calls setFilteredEpisodes
    //setFiltered episodes changes filteredEpisodes
    //a change to filteredEpisodes causes a re-render of dependent parts of the DOM

    //A STATE hook: Helps maintain a search query string (from text input box)
    const [query, setQuery] = useState("");

    //A STATE hook: Helps maintain a list of filtered episodes
    //Starts will all episodes
    const [filteredEpisodes, setFilteredEpisodes] = useState(allEpisodes);

    //An EFFECT hook:
    //Updates filteredEpisodes by filtering data by the query,
    //This runs whenever the search query is changed (each keystroke) (and on mount)
    //(It would also run if the main episodes list were to change.)
    useEffect(() => {
        const matches = findEpisodesMatching(query, allEpisodes);
        setFilteredEpisodes(matches);
    }, [query, allEpisodes]);

    function handleEpisodeSelected(id: string) {
        const foundEpisode = allEpisodes.find(episode => episode.id === Number(id));
        if (foundEpisode) {
            setFilteredEpisodes([foundEpisode]);
        }
    }


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

                {/* either show the select input OR a "show all" button */}
                {
                    filteredEpisodes.length > 1 ?

                        <select
                            className="control"
                            onChange={event => handleEpisodeSelected(event.target.value)}
                            value={filteredEpisodes.length === 1 ? filteredEpisodes[0].id : ""} >

                            {
                                //create the options within the select
                                filteredEpisodes.map(episode =>
                                    <option
                                        key={episode.id}
                                        value={episode.id}>
                                        {makeEpisodeCode(episode) + " - " + episode.name}
                                    </option>)
                            }

                        </select>

                        :

                        <button
                            className="control"
                            onClick={() => setFilteredEpisodes(allEpisodes)}>
                            Show all episodes
                        </button>
                }
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
        a.toLowerCase().indexOf(b.toLowerCase()) !== -1
    );
}

export default SearchableEpisodeList;