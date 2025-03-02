import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function BannerSlider() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading completion
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    centerMode: true,
    centerPadding: "40px", // Increased padding for more space between slides
    dotsClass: "slick-dots custom-dots", // Custom class for styling
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerMode: true,
          centerPadding: "20px", // Smaller padding on mobile but still maintains gap
        },
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="slider-container h-36 bg-muted rounded-xl animate-pulse"></div>
    );
  }

  return (
    <div className="slider-container py-4">
      <style jsx>{`
        /* Custom styles for dots to work in dark mode */
        :global(.custom-dots) {
          bottom: -25px;
        }
        :global(.custom-dots li) {
          margin: 0 0px;
        }
        :global(.custom-dots li button) {
          width: 8px;
          height: 8px;
        }
        :global(.custom-dots li button:before) {
          font-size: 10px;
          color: rgba(138, 138, 138, 0.8);
          opacity: 0.4;
          width: 6px;
          height: 6px;
          content: "";
          border-radius: 50%;
          background-color: rgba(138, 138, 138, 0.8);
        }
        :global(.custom-dots li.slick-active button:before) {
          color: rgba(138, 138, 138, 0.8);
          opacity: 1;
          background-color: rgba(138, 138, 138, 0.8);
        }
      `}</style>
      <Slider {...settings}>
        {/* Slide 1 - Welcome */}
        <div className="px-2">
          <section className="relative overflow-hidden rounded-xl bg-foreground p-6 text-background">
            <div className="relative z-10 max-w-3xl">
              <h1 className="mb-2 text-2xl font-bold">Welcome to Musix</h1>
              <p className="text-base md:text-lg opacity-90">
                Discover the best music all in one place
              </p>
            </div>

            {/* Decorative SVG Icon */}
            <div className="absolute -right-10 -bottom-10 opacity-20">
              <svg
                width="300"
                height="300"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                  fill="currentColor"
                />
                <path
                  d="M19 12C19 13.1046 18.1046 14 17 14C15.8954 14 15 13.1046 15 12C15 10.8954 15.8954 10 17 10C18.1046 10 19 10.8954 19 12Z"
                  fill="currentColor"
                />
                <path
                  d="M9 19V5L19 12V19"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </section>
        </div>

        {/* Slide 2 - Top Charts */}
        <div className="px-2">
          <section className="relative overflow-hidden rounded-xl bg-indigo-600 p-6 text-white">
            <div className="relative z-10 max-w-3xl">
              <h1 className="mb-2 text-2xl font-bold">Weekly Top Charts</h1>
              <p className="text-base md:text-lg opacity-90">
                Listen to the trending songs of this week
              </p>
            </div>

            {/* Decorative SVG Icon */}
            <div className="absolute -right-10 -bottom-10 opacity-20">
              <svg
                width="300"
                height="300"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 2v12a4 4 0 1 1-4-4c.5 0 1 .08 1.5.22V2l7 4-4.5 2.5L16 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path d="M4 6h4v12H4z" fill="currentColor" />
                <path d="M10 11h4v7h-4z" fill="currentColor" />
              </svg>
            </div>
          </section>
        </div>

        {/* Slide 3 - New Releases */}
        <div className="px-2">
          <section className="relative overflow-hidden rounded-xl bg-emerald-600 p-6 text-white">
            <div className="relative z-10 max-w-3xl">
              <h1 className="mb-2 text-2xl font-bold">New Releases</h1>
              <p className="text-base md:text-lg opacity-90">
                Fresh tracks from your favorite artists
              </p>
            </div>

            {/* Decorative SVG Icon */}
            <div className="absolute -right-10 -bottom-10 opacity-20">
              <svg
                width="300"
                height="300"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 8a4 4 0 100 8 4 4 0 000-8z" fill="currentColor" />
                <path
                  d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </section>
        </div>

        {/* Slide 4 - Premium Features */}
        <div className="px-2">
          <section className="relative overflow-hidden rounded-xl bg-amber-600 p-6 text-white">
            <div className="relative z-10 max-w-3xl">
              <h1 className="mb-2 text-2xl font-bold">Go Explore</h1>
              <p className="text-base md:text-lg opacity-90">
                Ad-free music, offline listening, and more
              </p>
            </div>

            {/* Decorative SVG Icon */}
            <div className="absolute -right-10 -bottom-10 opacity-20">
              <svg
                width="300"
                height="300"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L4 6v12l8 4 8-4V6l-8-4z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M12 12l8-6M12 12v8M12 12L4 6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
              </svg>
            </div>
          </section>
        </div>
      </Slider>
    </div>
  );
}

export default BannerSlider;
