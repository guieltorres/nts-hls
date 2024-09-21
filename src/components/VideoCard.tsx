import React from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Card, Paragraph } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NavigationType } from "../routes";
import { useSelector } from "../state/store";

const { width } = Dimensions.get("window");

const imageHeight = width * (36 / 23);

type VideoCardProps = {
  index: number;
};

export const VideoCard: React.FC<VideoCardProps> = ({ index }) => {
  const navigation = useNavigation<NavigationType>();
  const video = useSelector((state) => state.videos.data[index]);

  return (
    <View testID={`video-card-${video.id}`}>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate("VideoDetails", {
            index,
          });
        }}
      >
        <Card style={styles.card}>
          <Card.Cover
            style={[styles.image, { height: imageHeight }]}
            source={{ uri: video.thumbnail }}
            alt={video.title}
          />
          <Card.Content style={styles.content}>
            <Paragraph>{video.description}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Paragraph>{`Likes: ${video.likes}`}</Paragraph>
            <Paragraph>{`Views: ${video.views}`}</Paragraph>
          </Card.Actions>
        </Card>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width - 24,
    marginBottom: 4,
  },

  image: {
    width: "100%",
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },

  content: {
    marginTop: 12,
  },
});
