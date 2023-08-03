import React, { useEffect, useState } from "react";
import api_key from "./api.env";
import YouTube from "react-youtube";
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
    <div className="grid-container">
      {videos.map((video) => {
        return (
          <div
            key={video.id.videoId}
            className="video-container"
            onMouseEnter={() => {
              const iframe = document.querySelector(`#${video.id.videoId}`);
              if (iframe) {
                iframe.contentWindow.postMessage(
                  '{"event":"command","func":"playVideo","args":""}',
                  "*"
                );
              }
            }}
            onMouseLeave={() => {
              const iframe = document.querySelector(`#${video.id.videoId}`);
              if (iframe) {
                iframe.contentWindow.postMessage(
                  '{"event":"command","func":"pauseVideo","args":""}',
                  "*"
                );
              }
            }}
          >
            <YouTube
              videoId={video.id.videoId}
              opts={{
                playerVars: {
                  autoplay: 0,
                },
              }}
              className="youtube-video"
              id={video.id.videoId}
            />
            <h3 className="video-title">{video.snippet.title}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default YTvideos;
