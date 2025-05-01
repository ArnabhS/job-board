import { DotBackgroundDemo } from "../ui/dot-background";
import { AnimatedTooltipPreview } from "./AnimatedTooltip";

export default function Hero() {
  return (
    <main className="relative flex h-auto flex-col items-center justify-center py-12 px-4 font-poppins overflow-hidden">
      
      <div className="absolute inset-0 -z-10">
        <DotBackgroundDemo />
      </div>

      
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-green-100 text-green-600 text-sm font-medium">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
          Over 500+ jobs added this week
        </div>

        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
          Find Your Next Career Move <br className="hidden sm:inline" />
          with Us
        </h1>

        
        <AnimatedTooltipPreview />

        
        <div className="flex justify-center text-yellow-400 text-2xl">
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className="">
              ★
            </span>
          ))}
        </div>

        
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Loved by 100,000+ professionals</h2>

       
        <p className="text-base text-gray-600 max-w-2xl mx-auto">
          Join hundreds of professionals who have found their dream jobs through Jobfound. With over 3,000 active jobs
          and global opportunities, your next career move is just a click away.
        </p>
      </div>
    </main>
  );
}
