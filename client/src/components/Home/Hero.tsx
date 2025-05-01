import { AnimatedTooltipPreview } from "./AnimatedTooltip";


export default function Hero() {
  return (
    <main className="flex h-auto flex-col items-center justify-center py-12 px-4 font-poppins">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-green-100 text-green-600 text-sm font-medium">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
          Over 500+ jobs added this week
        </div>

        
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
          Find Your Next Career Move <br className="hidden sm:inline" />
          with Us
        </h1>

        {/* Profile Images */}
        <AnimatedTooltipPreview/>
        {/* <div className="flex justify-center -space-x-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-12 h-12 rounded-full border-2 border-white overflow-hidden">
              <Image
                src={`/placeholder.svg?height=48&width=48`}
                alt={`Profile ${i}`}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
          ))}
        </div> */}

        {/* Star Rating */}
        <div className="flex justify-center text-yellow-400 text-2xl">
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className="mx-1">
              ★
            </span>
          ))}
        </div>

        {/* Testimonial Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Loved by 100,000+ professionals</h2>

        {/* Description */}
        <p className="text-base text-gray-600 max-w-2xl mx-auto">
          Join hundreds of professionals who have found their dream jobs through Jobfound. With over 3,000 active jobs
          and global opportunities, your next career move is just a click away.
        </p>
      </div>
    </main>
  )
}
