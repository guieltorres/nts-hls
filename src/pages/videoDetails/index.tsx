import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ResizeMode, Video } from "expo-av";
import { RouteType } from "../../routes";
import VideoPoster from "../../components/VideoPoster";
import { Paragraph, Title } from "react-native-paper";
import { useVideosActions } from "../../hooks/useVideosActions";
import { useSelector } from "../../state/store";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import ThumbsUpIcon from "../../components/elements/ThumbsUpIcon";
import ViewsIcon from "../../components/elements/ViewsIcon";

const { width } = Dimensions.get("window");

type VideoDetailsScreenProps = {
  route: RouteType<"VideoDetails">;
};

export default function VideoDetailsScreen({ route }: VideoDetailsScreenProps) {
  const { index } = route.params;
  const video = useSelector((state) => state.videos.data[index]);
  const videoHeight = width * (9 / 16);
  const { likedVideos, likeVideo, viewVideo } = useVideosActions();

  const scale = useSharedValue(1);

  useEffect(() => {
    viewVideo(video);
  }, [video.id]);

  const handleLike = async () => {
    await likeVideo(video);
    scale.value = withSpring(1.5, {}, () => {
      scale.value = withSpring(1);
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Video
        testID={`video-player-${video.id}`}
        usePoster={true}
        posterStyle={{
          width: width,
          height: videoHeight,
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
        source={{ uri: video.hls_path }}
        resizeMode={ResizeMode.CONTAIN}
        style={{ width: width, height: videoHeight }}
        shouldPlay={true}
        isMuted={false}
        useNativeControls={true}
        PosterComponent={() => {
          return <VideoPoster />;
        }}
      />
      <ScrollView style={styles.info}>
        <Title>{video.title}</Title>
        <Paragraph>{video.description}</Paragraph>
        <View style={styles.actions}>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleLike} testID="like-button">
              <Animated.View style={animatedStyle}>
                <ThumbsUpIcon
                  style={styles.icon}
                  color={likedVideos[video.id] ? "#5160d2" : "gray"}
                />
              </Animated.View>
            </TouchableOpacity>
            <Text style={styles.text}>{video.likes}</Text>
          </View>
          <View style={styles.iconContainer}>
            <ViewsIcon style={styles.icon} />
            <Text style={styles.text}>{video.views}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  info: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  text: {
    marginTop: 4,
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
});
