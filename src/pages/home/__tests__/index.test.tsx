import HomeScreen from "..";
import { useVideos } from "../../../hooks/useVideos";
import { render } from "../../../jest/utils";
import { useSelector } from "../../../state/store";
import { waitFor } from "@testing-library/react-native";

jest.mock("../../../hooks/useVideos");
jest.mock("../../../state/store");

describe("HomeScreen", () => {
  beforeEach(() => {
    jest.mock("react-redux", () => ({
      ...jest.requireActual("react-redux"),
      useSelector: jest.fn(),
    }));
  });

  it("should display the loader when loading", () => {
    (useVideos as jest.Mock).mockReturnValue({ loading: true });
    (useSelector as jest.Mock).mockReturnValue([]);

    const screen = render(<HomeScreen />);

    expect(screen.getByTestId("video-card-loader")).toBeTruthy();
  });

  it("should display the list of videos when not loading", async () => {
    const mockVideos = [
      {
        id: "1",
        title: "Test Video",
        created_at: "2023-10-01T00:00:00Z",
        category: 1,
        hls_path: "path/to/hls",
        description: "This is a test video",
        thumbnail: "path/to/thumbnail",
        site_id: 1,
        views: 100,
        likes: 10,
      },
    ];
    (useVideos as jest.Mock).mockReturnValue({ loading: false });
    (useSelector as jest.Mock).mockImplementation((callback) =>
      callback({ videos: { data: mockVideos } })
    );

    const screen = render(<HomeScreen />);

    expect(screen.getByTestId("video-card-1")).toBeTruthy();
    expect(screen.getByText("This is a test video")).toBeTruthy();
  });

  it("should display the empty state message when no videos are found", async () => {
    (useVideos as jest.Mock).mockReturnValue({ loading: false });
    (useSelector as jest.Mock).mockReturnValue([]);

    const screen = render(<HomeScreen />);

    await waitFor(() => {
      expect(screen.getByTestId("no-videos-founded")).toBeTruthy();
    });
  });
});
