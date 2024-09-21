import { createMockVideo } from "../../../jest/__mocks__/createMockVideo";
import { getVideos, getVideoById, updateVideoById } from "../index";
import { videos, videoById, patchVideoById } from "../routes";

jest.mock("../routes");

describe("Service Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getVideos", () => {
    it("should fetch videos successfully", async () => {
      const mockVideos = [createMockVideo()];
      (videos as jest.Mock).mockResolvedValue({ data: mockVideos });

      const result = await getVideos();

      expect(result).toEqual({ data: mockVideos });
      expect(videos).toHaveBeenCalledTimes(1);
    });

    it("should handle errors", async () => {
      const mockError = new Error("Failed to fetch");
      (videos as jest.Mock).mockRejectedValue(mockError);

      await expect(getVideos()).rejects.toThrow(mockError);
      expect(videos).toHaveBeenCalledTimes(1);
    });
  });

  describe("getVideoById", () => {
    it("should fetch a video by ID successfully", async () => {
      const mockVideo = createMockVideo();
      (videoById as jest.Mock).mockResolvedValue({ data: mockVideo });

      const result = await getVideoById("1");

      expect(result).toEqual(mockVideo);
      expect(videoById).toHaveBeenCalledWith("1");
      expect(videoById).toHaveBeenCalledTimes(1);
    });

    it("should handle errors", async () => {
      const mockError = new Error("Failed to fetch");
      (videoById as jest.Mock).mockRejectedValue(mockError);

      await expect(getVideoById("1")).rejects.toThrow(mockError);
      expect(videoById).toHaveBeenCalledWith("1");
      expect(videoById).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateVideoById", () => {
    it("should update a video by ID successfully", async () => {
      const mockVideo = createMockVideo({ title: "Updated Video" });
      const updateData = { title: "Updated Video" };
      (patchVideoById as jest.Mock).mockResolvedValue({ data: mockVideo });

      const result = await updateVideoById("1", updateData);

      expect(result).toEqual(mockVideo);
      expect(patchVideoById).toHaveBeenCalledWith("1", updateData);
      expect(patchVideoById).toHaveBeenCalledTimes(1);
    });

    it("should handle errors", async () => {
      const mockError = new Error("Failed to update");
      const updateData = { title: "Updated Video" };
      (patchVideoById as jest.Mock).mockRejectedValue(mockError);

      await expect(updateVideoById("1", updateData)).rejects.toThrow(mockError);
      expect(patchVideoById).toHaveBeenCalledWith("1", updateData);
      expect(patchVideoById).toHaveBeenCalledTimes(1);
    });
  });
});
