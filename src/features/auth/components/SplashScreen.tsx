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
          src="https://cdn.dribbble.com/userupload/45819590/file/465734de176374010dd77546e6305993.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}