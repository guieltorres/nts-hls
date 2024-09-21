import { renderHook, act } from "@testing-library/react-hooks";
import { useVideos } from "../useVideos";
import { getVideos } from "../../services/videos";
import { useDispatch } from "../../state/store";
import { actions } from "../../state/store";

jest.mock("../../services/videos");
jest.mock("../../state/store");

describe("useVideos", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    jest.clearAllMocks();
  });

  it("should set loading to true initially", () => {
    const { result } = renderHook(() => useVideos());

    expect(result.current.loading).toBe(true);
  });

  it("should fetch videos and update state", async () => {
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
    const mockResponse = { data: mockVideos, next: null };
    (getVideos as jest.Mock).mockResolvedValue(mockResponse);

    const { result, waitForNextUpdate } = renderHook(() => useVideos());

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(mockDispatch).toHaveBeenCalledWith(
      actions.videos.update(mockVideos)
    );
  });

  it("should handle errors and set loading to false", async () => {
    (getVideos as jest.Mock).mockRejectedValue(new Error("Failed to fetch"));

    const { result, waitForNextUpdate } = renderHook(() => useVideos());

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("should load more videos when loadMore is called", async () => {
    const initialVideos = [
      {
        id: "1",
        title: "Test Video 1",
        created_at: "2023-10-01T00:00:00Z",
        category: 1,
        hls_path: "path/to/hls",
        description: "This is a test video 1",
        thumbnail: "path/to/thumbnail",
        site_id: 1,
        views: 100,
        likes: 10,
      },
    ];
    const newVideos = [
      {
        id: "2",
        title: "Test Video 2",
        created_at: "2023-10-02T00:00:00Z",
        category: 1,
        hls_path: "path/to/hls",
        description: "This is a test video 2",
        thumbnail: "path/to/thumbnail",
        site_id: 1,
        views: 200,
        likes: 20,
      },
    ];
    const initialResponse = { data: initialVideos, next: "next-page-url" };
    const newResponse = { data: newVideos, next: null };

    (getVideos as jest.Mock)
      .mockResolvedValueOnce(initialResponse)
      .mockResolvedValueOnce(newResponse);

    const { result, waitForNextUpdate } = renderHook(() => useVideos());

    await waitForNextUpdate();

    act(() => {
      result.current.loadMore();
    });

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(mockDispatch).toHaveBeenCalledWith(
      actions.videos.update([...initialVideos, ...newVideos])
    );
  });
});
