import { useVideoActions } from "../useVideosActions";
import { updateVideoById } from "../../services/videos";
import { actions, useDispatch, useSelector } from "../../state/store";
import { createMockVideo } from "../../jest/__mocks__/createMockVideo";

jest.mock("../../services/videos");
jest.mock("../../state/store");

const mockedVideo = createMockVideo();

describe("useVideoActions", () => {
  const dispatch = jest.fn();
  const likedVideos = { video1: true };

  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatch);
    (useSelector as jest.Mock).mockReturnValue({ likedVideos });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should like a video and dispatch toggleLikeVideo action", async () => {
    const { likeVideo } = useVideoActions();
    (updateVideoById as jest.Mock).mockResolvedValueOnce(undefined);

    await likeVideo(mockedVideo);

    expect(updateVideoById).toHaveBeenCalledWith(mockedVideo.id, {
      likes: mockedVideo.likes,
    });
    expect(dispatch).toHaveBeenCalledWith(
      actions.videos.toggleLikeVideo(mockedVideo.id)
    );
  });

  it("should handle errors in likeVideo", async () => {
    const { likeVideo } = useVideoActions();
    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
    const errorMessage = "Error liking video";
    (updateVideoById as jest.Mock).mockRejectedValueOnce(
      new Error(errorMessage)
    );

    await likeVideo(mockedVideo);

    expect(consoleWarnSpy).toHaveBeenCalledWith("likeVideo", errorMessage);
    consoleWarnSpy.mockRestore();
  });

  it("should view a video and dispatch incrementViewVideo action", async () => {
    const { viewVideo } = useVideoActions();
    (updateVideoById as jest.Mock).mockResolvedValueOnce(undefined);

    await viewVideo(mockedVideo);

    expect(updateVideoById).toHaveBeenCalledWith(mockedVideo.id, {
      views: mockedVideo.views + 1,
    });
    expect(dispatch).toHaveBeenCalledWith(
      actions.videos.incrementViewVideo("video1")
    );
  });

  it("should handle errors in viewVideo", async () => {
    const { viewVideo } = useVideoActions();
    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
    const errorMessage = "Error viewing video";
    (updateVideoById as jest.Mock).mockRejectedValueOnce(
      new Error(errorMessage)
    );

    await viewVideo(mockedVideo);

    expect(consoleWarnSpy).toHaveBeenCalledWith("viewVideo", errorMessage);
    consoleWarnSpy.mockRestore();
  });
});
