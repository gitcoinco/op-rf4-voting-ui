"use client";
import { useState, useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Heading } from "../ui/headings";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import Link from "next/link";

export function WelcomeCarousel({
  slides,
}: {
  slides: { title: string; description: string }[];
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  console.log(current, count);

  const { title, description } = slides[current - 1] ?? {};
  return (
    <div className="flex flex-col items-center">
      <Carousel setApi={setApi} className="w-full max-w-[450px]">
        <CarouselContent>
          {slides.map(({}, index) => (
            <CarouselItem key={index} className="flex flex-col items-center">
              <Card className="w-[300px] mb-6">
                <CardContent className="flex h-36 items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
              <div className="mx-auto">
                <Heading variant="h3" className="text-center mb-4">
                  {title}
                </Heading>
                <p className="text-center leading-relaxed">{description}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <Dots current={current - 1} total={slides.length} />

      {current === count ? (
        <Link href={"/ballot/metrics"}>
          <Button variant={"destructive"}>Let&apos; go!</Button>
        </Link>
      ) : (
        <Button variant={"secondary"} onClick={() => api?.scrollNext()}>
          Next
        </Button>
      )}
    </div>
  );
}

function Dots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex gap-3 py-6">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`w-2.5 h-2.5 rounded-full ${
            current === i ? "bg-gray-600" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
