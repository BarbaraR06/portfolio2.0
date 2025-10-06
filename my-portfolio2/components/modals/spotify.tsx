import MusicPlayer from "@/app/spotify/MusicPlayer";

export default function SpotifyModal({
  onDoubleClick,
}: {
  onDoubleClick?: () => void;
}) {
  return (
    <div
      className="text-defaultText font-bold flex justify-center w-full h-full cursor-pointer"
      onDoubleClick={onDoubleClick}
    ></div>
  );
}
