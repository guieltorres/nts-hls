import { FlatList, StyleSheet, View } from "react-native";
import { Paragraph } from "react-native-paper";
import VideoCard from "../../components/VideoCard";
import { useVideos } from "../../hooks/useVideos";
import VideoCardLoader from "../../components/VideoCardLoader";
import { useSelector } from "../../state/store";
import { Video } from "../../types/videos";

export default function HomeScreen() {
  const { loading, loadMore, hasMore } = useVideos();
  const videos = useSelector((state) => state.videos.data);

  const renderItem = ({ index }: { item: Video; index: number }) => {
    return <VideoCard index={index} />;
  };

  return (
    <View style={styles.container}>
      {loading && videos.length === 0 ? (
        <VideoCardLoader />
      ) : (
        <FlatList
          style={{ width: "100%" }}
          scrollEnabled={!loading}
          contentContainerStyle={styles.contentContainer}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          data={videos}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={renderItem}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Paragraph testID="no-videos-founded">
                Ops, something went wrong!
              </Paragraph>
            </View>
          }
          onEndReached={() => {
            if (hasMore && !loading) {
              loadMore();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading && hasMore ? <VideoCardLoader /> : null}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    alignItems: "center",
  },
});
