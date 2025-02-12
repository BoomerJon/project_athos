import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const ProductCarousel = () => {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80",
      alt: "Premium Facial Oil Front View",
    },
    {
      src: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80",
      alt: "Premium Facial Oil Side View",
    },
    {
      src: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80",
      alt: "Premium Facial Oil with Ingredients",
    },
  ];

  const plugin = React.useMemo(
    () =>
      Autoplay({
        delay: 4000,
      }),
    []
  );

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[plugin]}
      className="w-full max-w-lg mx-auto relative"
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="md:basis-1/1">
            <div className="p-1">
              <div className="overflow-hidden rounded-xl">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full aspect-square object-cover transition-transform hover:scale-105"
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
    </Carousel>
  );
};

export default ProductCarousel;