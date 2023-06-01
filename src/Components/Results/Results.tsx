import { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../../Hooks/SearchContext'

import '../../assets/CSS/Results.css';

interface Phonetic {
    text: string;
    audio: string;
    sourceUrl?: string;
    license?: {
        name: string;
        url: string;
    };
}

interface Definition {
    definition: string;
    synonyms: string[];
    antonyms: string[];
    example?: string;
}

interface Meaning {
    partOfSpeech: string;
    definitions: Definition[];
    synonyms: string[];
    antonyms: string[];
}

interface License {
    name: string;
    url: string;
}

interface WordData {
    word: string;
    phonetic: string;
    phonetics: Phonetic[];
    meanings: Meaning[];
    license: License;
    sourceUrls: string[];
}

const Results = () => {

    const searchContext = useContext(SearchContext);
    const [searchData, setSearchData] = useState<WordData[] | null>(null);

    if (!searchContext) {
        throw new Error("");
    }

    const { searchQuery } = searchContext;

    const onClick = () => {
        let url = searchData ? searchData[0].phonetics.find(phonetic => phonetic.audio !== '')?.audio || '' : '';

            const audio = new Audio(url);
            audio.play().catch(error => console.log("Error playing audio:", error));
    }

    useEffect(() => {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchQuery}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setSearchData(data);
            })
            .catch(error => {
                console.log('Error: ', error);
            })
    }, [searchQuery]);

    return (
        <div className='results'>
            <div className="results-header">
                <div className="results-header__left">
                    <h1>{searchQuery}</h1>
                    <h2>{
                        searchData ? searchData[0].phonetic : 'Loading...'
                    }</h2>
                </div>
                <div className='results-header__right'>
                    <button type='button' onClick={onClick}></button>
                </div>
            </div>
        </div>
    );
}

export default Results