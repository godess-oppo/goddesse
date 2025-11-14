tsx
export default function HeroSection() {
  return (
    <section className="relative h-screen-80 w-full overflow-hidden">
      {/* Background image/video */}
      <div className="absolute inset-0 bg-black/30 z-0">
        <img 
          src="/hero-bg.jpg" 
          alt="Hero Background"
          className="h-full w-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="container relative z-10 h-full flex flex-col justify-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">New Collection</h1>
        <p className="text-xl mb-8">Discover our latest designs</p>
        <button className="bg-white text-black px-8 py-3 w-fit hover:bg-gray-100 transition">
          Shop Now
        </button>
      </div>
    </section>
  )
}
