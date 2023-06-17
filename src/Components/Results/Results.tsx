import React, { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../../Hooks/SearchContext'

import '../../assets/CSS/Results.css';
import { WordData } from '../../Types/WordData';
import { fetchData } from '../../Helpers/Api';

const Results = () => {

  const searchContext = useContext(SearchContext);
  const [searchData, setSearchData] = useState<WordData[] | null>(null);
  const [error, setError] = useState(false);

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
    fetchData(searchQuery)
      .then(result => {
        setSearchData(result.data);
        setError(result.error);
      });
  }, [searchQuery]);

  const renderSearchData = () => {
    if (!searchData) return 'Loading...';

    return searchData.map((wordData, index) => (
      <div key={index}>
        <div className="results-header">
          <div className="results-header__left">
            <h1>{wordData.word}</h1>
            <h2>{
              wordData.phonetic
            }</h2>
          </div>
          <div className='results-header__right'>
            <button type='button' onClick={onClick}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0 0V13L13 6.5L0 0Z" fill="#A445ED" />
              </svg>
            </button>
          </div>
        </div>
        {wordData.meanings.map((meaning, meaningIndex) => (
          <div key={meaningIndex}>
            <div className="results-body__meaning-header">
              <div className="results-body__meaning-header__left">
                {meaning.partOfSpeech}
              </div>
              <div className="results-body__meaning-header__right">
                <div className="line"></div>
              </div>
            </div>
            <div className="results-body">
              <div className="results-body__container">
                <p className='dark-text'>Meaning</p>
                <ul>
                  {meaning.definitions.map((definition, definitionIndex) => (
                    <li key={definitionIndex}>
                      <span>{definition.definition}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                {
                  meaning.synonyms.length > 0
                    ? (
                      <div className='synonyms'>
                        <p className="dark-text">Synonyms</p>
                        {
                          <p className="purple-text">{meaning.synonyms.join(', ')}</p>
                        }
                      </div>
                    )
                    : null
                }
              </div>
            </div>
          </div>
        ))}
        <p className='dark-text'>{`Source: ${wordData.sourceUrls[0]}`}</p>
      </div>
    ));
  }

  const renderPage = () => {
    return (
      <div className="results">
        {renderSearchData()}
      </div>
    )
  }

  const renderErrorPage = () => {
    return (
      <div className='error-page'>
        <h1>😭</h1>
        <h2>No Definitions Found</h2>
        <p>Sorry pal, we couldn't find definitions for the word you were looking for.
          You can try the search again at a later time or head to the web instead.
        </p>
      </div>
    )
  }

  return (
    <div className='results'>
      {error === false ? renderPage() : renderErrorPage()}
    </div>
  );
}

export default Results