tsx
export default function LookbookGallery() {
  // Temporary data - replace with your CMS data
  const lookbookImages = [
    { id: 1, src: "/lookbook/1.jpg", alt: "Spring Collection Look 1" },
    { id: 2, src: "/lookbook/2.jpg", alt: "Spring Collection Look 2" },
    { id: 3, src: "/lookbook/3.jpg", alt: "Spring Collection Look 3" },
  ]

  return (
    <section className="py-16 container">
      <h2 className="text-3xl text-center mb-12">Spring Lookbook</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {lookbookImages.map(image => (
          <div key={image.id} className="group relative overflow-hidden aspect-square">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all" />
          </div>
        ))}
      </div>
    </section>
  )
}
