"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Alex Rivera",
      role: "Security Analyst at TechCorp",
      content:
        "The hands-on labs were a game changer. I went from theory to actually exploiting vulnerabilities in weeks. Landed my dream job thanks to the portfolio I built here.",
    },
    {
      name: "Sarah Chen",
      role: "Junior Pen Tester",
      content:
        "The mentorship is unlike anything else. having a veteran guide me through the complexities of Red Teaming made all the difference. Highly recommended!",
    },
    {
      name: "Marcus Johnson",
      role: "SOC Analyst",
      content:
        "This program doesn't just teach you tools; it teaches you the mindset. The live war rooms were intense and prepared me for real-world incidents.",
    },
    {
      name: "Emily Davis",
      role: "Cybersecurity Consultant",
      content:
        "Structure, depth, and community. The curriculum is constantly updated with the latest threats. You learn what's relevant now, not 5 years ago.",
    },
  ];

  return (
    <section className="relative z-10 py-24 px-6 md:px-20 max-w-8xl mx-auto ">
      <div className="text-left mb-16 space-y-4">
        <h2 className="text-4xl md:text-6xl font-extrabold font-mono text-white tracking-tighter">
          Success Stories
        </h2>
        <p className="text-white/60 font-mono text-lg max-w-xl">
          Hear from our alumni who are now protecting the digital frontier.
        </p>
      </div>

      <div className="w-full relative">
        <Carousel
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div className="h-full">
                  <div className="group relative overflow-hidden bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm p-6 h-full flex flex-col justify-between gap-6">
                    <div>
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-white text-white"
                          />
                        ))}
                      </div>
                      <p className="text-white/80 font-mono text-sm leading-relaxed">
                        &quot;{testimonial.content}&quot;
                      </p>
                    </div>
                    <div>
                      <h4 className="text-white font-bold font-mono">
                        {testimonial.name}
                      </h4>
                      <p className="text-white/40 text-xs font-mono">
                        {testimonial.role}
                      </p>
                    </div>

                    {/* Corner Accents */}
                    <div className="absolute top-0 right-0 w-2 h-2 bg-white/20 group-hover:bg-white/50 transition-colors" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 bg-white/20 group-hover:bg-white/50 transition-colors" />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white" />
          <CarouselNext className="hidden md:flex bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white" />
        </Carousel>
      </div>
    </section>
  );
}
