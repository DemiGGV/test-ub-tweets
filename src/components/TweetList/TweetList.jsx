import { Tweet } from '../Tweet/Tweet.jsx';
import { SectionBox } from './TweetList.styles.jsx';

export const TweetList = ({  offsetView, tweetsToView, onPressHandle, isFollowedCheck }) => {
  console.log(tweetsToView)
  return (
    <SectionBox $offsetView = { offsetView }>
      { tweetsToView.map ( tweet => (
        <li key = { tweet.id }>
          <Tweet
            tweet = { tweet }
            onPressHandle = { onPressHandle }
            isFollowed = { isFollowedCheck ( tweet.id )}
          />
        </li>
      ))}
    </SectionBox>
  );
};
