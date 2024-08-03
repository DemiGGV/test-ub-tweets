import { useEffect, useState } from 'react';
import { TweetList } from '../components/TweetList/TweetList.jsx';
import { PagginationList } from '../components/PagginationList/PagginationList.jsx';
import { BackButton } from '../components/BackButton/BackButton.jsx';
import {
  saveLStorage,
  loadLStorage,
  fetchTweets,
} from '../utils/dataService.js';
import { FilterSelector } from '../components/FilterSelector/FilterSelector.jsx';
import { ViewWindow } from './Tweets.styles.jsx';
import {
  statusFilters,
  FAV_LS_KEY,
  count,
  viewWith,
} from '../utils/constants.js';

const Tweets = () => {
  const [ currentPage, setCurrentPage ] = useState( 1 );
  const [ offsetView, setOffsetView ] = useState( 0 );
  const [ tweetsArr, setTweetsArr ] = useState( [] );
  const [ tweetsDb, setTweetsDb ] = useState( [] );
  const [ lastPage, setLastPage ] = useState( 1 );
  const [ filter, setFilter ] = useState( statusFilters.all );
  const [ followedArr, setFollowedArr ] = useState( [] );

  // Initial fetching of tweets array
  useEffect(() => {
    const firstRun = async () => {
      const fetchArr = await fetchTweets();
      setTweetsArr( [...fetchArr] );
      setTweetsDb( [...fetchArr] );
      setFollowedArr( [...loadLStorage ( FAV_LS_KEY ) ]);
    };
    firstRun();
  }, []);

  useEffect(() => {
    const lastP = Math.ceil ( tweetsDb.length / count );
    setLastPage ( lastP );
    if ( currentPage > lastP && lastP > 0 ) {
      setCurrentPage( lastP );
    }
    setOffsetView (( currentPage - 1 ) * viewWith );
  }, [ currentPage, tweetsDb.length ]);

  useEffect(() => {
    if ( filter === statusFilters.all ) {
      setTweetsDb ( [...tweetsArr] );
      return;
    }
    if ( filter === statusFilters.follow ) {
      setTweetsDb ( tweetsArr.filter (( tweet) => !followedArr.includes ( tweet.id )));
      return;
    }
    setTweetsDb ( tweetsArr.filter (( tweet ) => followedArr.includes ( tweet.id )));
  }, [ filter, followedArr, tweetsArr ]);

  const onPressHandle = ( id ) => {
    const updatedFA = [ ...followedArr ];
    if ( followedArr.includes ( id )) {
      const index = followedArr.findIndex (( item ) => item === id );
      updatedFA.splice ( index, 1 );
    } else {
      updatedFA.push ( id );
    }
    setFollowedArr ( updatedFA );
    saveLStorage ( FAV_LS_KEY, updatedFA );
  };

  const isFollowedCheck = ( id ) => {
    return followedArr.includes ( id );
  };

  return (
    <>
      <FilterSelector 
        setFilter = { setFilter } 
        filter = { filter } />
      { tweetsDb.length > 0 ? (
        <>
          <ViewWindow>
            <TweetList
              offsetView = { offsetView }
              tweetsToView = { tweetsDb }
              onPressHandle = { onPressHandle }
              isFollowedCheck = { isFollowedCheck }
            />
          </ViewWindow>
          <PagginationList
            currentPage = { currentPage }
            lastPage = { lastPage }
            setCurrentPage = { setCurrentPage }
          />
          <BackButton label = "Back" />
        </>
      ) : (
        <p
        style={{
          textAlign: 'center',
          fontSize: 36,
          marginTop: 130
        }}
        >
          { followedArr.length === 0 && 'Empty list!' }
        </p>
      )}
    </>
  );
};

export default Tweets;
