export default function SplashScreen() {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-black">
      <video
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source
          src="/videos/splash_video.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}
