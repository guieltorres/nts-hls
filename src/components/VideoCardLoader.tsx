import React from "react";
import ContentLoader from "react-content-loader/native";
import { Dimensions } from "react-native";
import { Rect } from "react-native-svg";

const { width, height } = Dimensions.get("window");

const VideoCardLoader: React.FC = () => {
  const largeContainerHeight = 460;
  const smallLineHeight = 10;
  const smallLineSpacing = 10;
  const numberOfLines = 5;

  return (
    <ContentLoader
      testID={"video-card-loader"}
      height={height}
      width={width}
      speed={1}
      backgroundColor={"#dbdbdb"}
      foregroundColor={"#cccccc"}
      viewBox={`0 0 ${width} ${height}`}
    >
      <Rect
        x={12}
        y={12}
        rx="10"
        ry="10"
        width={width - 24}
        height={largeContainerHeight}
      />
      {Array.from({ length: numberOfLines }).map((_, index) => (
        <Rect
          key={index}
          x={20}
          y={
            largeContainerHeight +
            24 +
            index * (smallLineHeight + smallLineSpacing)
          }
          rx="5"
          ry="5"
          width={width - 40}
          height={smallLineHeight}
        />
      ))}
    </ContentLoader>
  );
};

export default VideoCardLoader;
