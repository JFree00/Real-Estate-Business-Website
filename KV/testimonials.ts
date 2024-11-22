import wadeWarren from "@/assets/wadeWarren.webp";
import emelieThomson from "@/assets/emelieThomson.webp";
import johnMans from "@/assets/johnMans.webp";
import { namedUnknown } from "./filter";

export type testimonialProps = namedUnknown & {
  location: string;
  title: string;
  testimonial: string;
  image?: string;
  rating: number;
};
export const defaultTestimonials: testimonialProps[] = [
  {
    name: "Wade Warren",
    location: "USA, California",
    title: "Exceptional Service!",
    testimonial:
      "Our experience with Estatein was outstanding. Their team's dedication and professionalism made finding our dream home a breeze. Highly recommended!",
    rating: 5,
    image: wadeWarren,
  },
  {
    name: "Emelie Thomson",
    location: "USA, Florida",
    title: "Efficient and Reliable",
    testimonial:
      "Estatein provided us with top-notch service. They helped us sell our property quickly and at a great price. We couldn't be happier with the results.",
    rating: 5,
    image: emelieThomson,
  },
  {
    name: "John Mans",
    location: "USA, Nevada",
    title: "Trusted Advisors",
    testimonial:
      "The Estatein team guided us through the entire buying process. Their knowledge and commitment to our needs were impressive. Thank you for your support",
    rating: 5,
    image: johnMans,
  },
];
