import React from "react";
import ContentLoader from "react-content-loader/native";
import { Dimensions } from "react-native";
import { Rect } from "react-native-svg";

const { width, height } = Dimensions.get("window");

const Poster: React.FC = () => {
  const videoHeight = width * (9 / 16);
  return (
    <ContentLoader
      testID="video-poster-loader"
      height={height}
      width={width}
      speed={1}
      backgroundColor={"#dbdbdb"}
      foregroundColor={"#cccccc"}
      viewBox={`0 0 ${width} ${height}`}
    >
      <Rect x={0} y={0} rx="0" ry="0" width={width} height={videoHeight} />
    </ContentLoader>
  );
};

export default Poster;
