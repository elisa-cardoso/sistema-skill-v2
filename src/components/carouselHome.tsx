import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import banner1 from '../assets/banner1.jpg' 
import banner2 from '../assets/banner2.png' 
import banner3 from '../assets/banner3.png' 
import banner4 from '../assets/banner4.png' 
import banner5 from '../assets/banner5.png' 




export default function CarouselHome() {
  return (
    <div className="flex justify-center  items-center mt-10 ">
      <Carousel>
        <CarouselPrevious />
        <CarouselContent >
          <CarouselItem className="">
            <img src={banner4} alt="Imagem 1" className="w-full h-auto " />
          </CarouselItem>
          <CarouselItem className=" ">
            <img src={banner5} alt="Imagem 2" className="w-full h-auto" />
          </CarouselItem>
          <CarouselItem className="">
            <img src={banner2} alt="Imagem 3" className="w-full h-auto" />
          </CarouselItem>
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </div>
  )
}

