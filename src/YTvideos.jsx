import React, { useEffect, useState } from "react";
import api_key from "./api.env";
const url = `https://www.googleapis.com/youtube/v3/search?key=${api_key}&part=snippet&maxResults=5`;

const YTvideos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setVideos(data.items);
      } catch (error) {
        console.error("Error fetching videos: ", error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div>
      {videos.map((video) => {
        return (
          <div key={video.id}>
            <h2>{video.snippet.title}</h2>
            <iframe
              width="420"
              height="345"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
            ></iframe>
          </div>
        );
      })}
    </div>
  );
};

export default YTvideos;
