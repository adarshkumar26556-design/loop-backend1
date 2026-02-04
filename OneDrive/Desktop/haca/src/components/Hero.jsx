// import { coreStats } from '../data/mockData';

// const Hero = () => {
//     return (
//         <div className="bg-[#141414] pt-16 md:pt-24 pb-16 md:pb-24 px-4 sm:px-6 flex flex-col justify-center min-h-screen overflow-hidden">
//             <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center">

//                 {/* Heading */}
//                 <h1 className="
//                     mt-10 md:mt-16 lg:mt-20
//                     text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl
//                     leading-tight md:leading-relaxed lg:leading-[2.2] tracking-tight
//                     text-[#6b6b6b] font-light
//                     max-w-[1100px] mx-auto text-center
//                     mb-8 md:mb-16 lg:mb-20
//                     px-2 sm:px-6 md:px-8
//                 ">
//                     Crafting transformative <span className="text-white font-semibold">digital experiences</span> for the world’s leading brands by seamlessly blending design, technology, <span className="text-white font-semibold">and marketing.</span>
//                 </h1>

//                 {/* Stats */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-24 w-full max-w-7xl mt-12">
//                     {coreStats.map((stat, index) => (
//                         <div key={index} className="flex flex-col items-center">
//                             <span className="text-5xl md:text-5xl lg:text-[70px] font-semibold text-gray-300 mb-4 leading-none">
//                                 {stat.value}
//                             </span>
//                             <span className="text-[#9ca3af] text-xl md:text-2xl lg:text-4xl font-normal">
//                                 {stat.label}
//                             </span>
//                         </div>
//                     ))}
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default Hero;
import { coreStats } from '../data/mockData';

const Hero = () => {
  return (
    <div className="bg-[#141414] px-4 py-12 md:py-24 min-h-screen">
      <div className="max-w-[1200px] mx-auto text-center">

        {/* Heading */}
        <h1 className="
          mt-16 md:mt-32
          text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl
          leading-snug md:leading-relaxed
          text-[#6b6b6b] font-light
          max-w-[900px] mx-auto
          mb-10 md:mb-16
        ">
          Crafting transformative <span className="text-white font-semibold">digital experiences</span> for the world’s leading brands by seamlessly blending design, technology, <span className="text-white font-semibold">and marketing.</span>
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 mt-8">
          {coreStats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-300">
                {stat.value}
              </span>
              <span className="text-sm sm:text-lg md:text-xl text-[#9ca3af]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Hero;
