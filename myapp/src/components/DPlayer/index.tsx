import React, { useEffect } from 'react';
import Player from 'griffith';

const VideoPlayer = (props: any) => {
  const { url } = props;
  console.log(url);
  
  const sources = {
    hd: {
      play_url: url,
    },
  }; 

  return <Player sources={sources} id={''} />;
};
export default VideoPlayer;
