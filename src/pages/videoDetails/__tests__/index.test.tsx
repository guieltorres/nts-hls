import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import VideoDetailsScreen from "../index";
import { useVideoActions } from "../../../hooks/useVideosActions";
import { useSelector } from "../../../state/store";
import { RouteType } from "../../../routes";
import { createMockVideo } from "../../../jest/__mocks__/createMockVideo";

jest.mock("../../../hooks/useVideosActions");
jest.mock("../../../state/store");

describe("VideoDetailsScreen", () => {
  const mockVideo = createMockVideo();

  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((callback) =>
      callback({ videos: { data: [mockVideo] } })
    );
    (useVideoActions as jest.Mock).mockReturnValue({
      likedVideos: { "1": false },
      likeVideo: jest.fn(),
      viewVideo: jest.fn(),
    });
  });

  it("should render video details correctly", () => {
    const route: RouteType<"VideoDetails"> = {
      params: { index: 0 },
      key: "test-key",
      name: "VideoDetails",
    };
    const { getByText, getByTestId } = render(
      <VideoDetailsScreen route={route} />
    );

    expect(getByText("Test Video")).toBeTruthy();
    expect(getByText("This is a test video")).toBeTruthy();
    expect(getByTestId("video-player-1")).toBeTruthy();
  });

  it("should call viewVideo on mount", () => {
    const route: RouteType<"VideoDetails"> = {
      params: { index: 0 },
      key: "test-key",
      name: "VideoDetails",
    };
    const { viewVideo } = useVideoActions();

    render(<VideoDetailsScreen route={route} />);

    expect(viewVideo).toHaveBeenCalledWith(mockVideo);
  });

  it("should handle like button press", async () => {
    const route: RouteType<"VideoDetails"> = {
      params: { index: 0 },
      key: "test-key",
      name: "VideoDetails",
    };
    const { likeVideo } = useVideoActions();

    const { getByTestId } = render(<VideoDetailsScreen route={route} />);

    const likeButton = getByTestId("like-button");
    fireEvent.press(likeButton);

    await waitFor(() => {
      expect(likeVideo).toHaveBeenCalledWith(mockVideo);
    });
  });
});
