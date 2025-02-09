// @flow
import * as React from "react";
import { Button } from "@/components/ui/button";
import globeLeft from "@/assets/globeLeft.webp";
import globeRight from "@/assets/globeRight.webp";
import logoLg from "@/assets/icons/logoLg.svg";
import { FooterInput } from "@/components/footerInput";
import facebook from "@/assets/icons/facebook.svg";
import twitter from "@/assets/icons/twitter.svg";
import linkedIn from "@/assets/icons/linkedIn.svg";
import youtube from "@/assets/icons/youtube.svg";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/styles";

type routes = "Home" | "About Us" | "Properties" | "Services" | "Contact Us";
const subRoutes: Record<routes, string[]> = {
  Home: ["Hero Section", "Features", "Properties", "Testimonials", "FAQ's"],
  "About Us": [
    "Our Story",
    "Our Mission",
    "How It Works",
    "Our Team",
    "Our Clients",
  ],
  Properties: ["Portfolio", "Categories"],
  Services: [
    "Valuation Mastery",
    "Strategic Marketing",
    "Negotiation Wizardry",
    "Closing Success",
    "Property Management",
  ],
  "Contact Us": ["Contact Form", "Our Offices"],
};

export function Footer() {
  return (
    <footer
      className={
        " mt-20 grid grid-cols-12 border-t border-sgrey-15 *:col-span-full "
      }
    >
      <div className={"relative grid grid-cols-subgrid"}>
        <div className={"col-span-full"}>
          <img
            src={globeLeft}
            alt="Left side of a globe"
            height={"100%"}
            className={"absolute bottom-0 -z-10"}
          />
          <img
            src={globeRight}
            alt="Right side of a globe"
            height={"100%"}
            className={"absolute bottom-0 right-0 -z-10"}
          />
        </div>
        <div
          className={
            " grid grid-cols-subgrid col-span-full" +
            " border-b border-sgrey-15 h-[367px] items-center offset"
          }
        >
          <div className={"col-span-full laptop:col-span-8 "}>
            <h3 className={"desktop::text-5xl mb-6 text-3xl font-semibold"}>
              Start Your Real Estate Journey Today
            </h3>
            <p className={"text-sgrey-60"}>
              Your dream property is just a click away. Whether you're looking
              for a new home, a strategic investment, or expert real estate
              advice, Estatein is here to assist you every step of the way. Take
              the first step towards your real estate goals and explore our
              available properties or get in touch with our team for
              personalized assistance.
            </p>
          </div>

          <Button
            variant={"primary"}
            size={"responsive"}
            className={
              "right-0 col-span-full justify-self-end laptop:col-span-4  laptop:col-start-9 laptop:h-12 laptop:py-0   desktop:h-14"
            }
          >
            Explore Properties
          </Button>
        </div>
      </div>
      <div className={"offset laptop:pt-20 grid grid-cols-12 laptop:gap-x-20"}>
        <div className={"col-span-full pt-10 laptop:col-span-4"}>
          <img alt={"logo"} src={logoLg} />
          <FooterInput
            className={"my-5"}
            placeholder={"Enter Your Email"}
          ></FooterInput>
        </div>
        <div
          className={
            " col-span-full grid grid-cols-[repeat(2,1fr)] grid-rows-[repeat(3,max)] gap-x-5 laptop:col-start-5 laptop:grid-cols-[repeat(5,auto)] laptop:justify-items-end laptop:py-16 "
          }
        >
          {Object.keys(subRoutes).map((route, index) => {
            const contactUs = subRoutes["Contact Us"].map(
              (subRoute: string) => (
                <li key={subRoute} className={"  my-5  "}>
                  {subRoute}
                </li>
              ),
            );
            return (
              <div
                key={route}
                className={cn(
                  "my-3 border-sgrey-15 odd:border-r-2 laptop:odd:border-r-0 ",
                  route === "Contact Us" && "hidden laptop:block",
                )}
              >
                <h4 className={cn("text-xl text-sgrey-60 ")}>{route}</h4>
                <ul className={cn("my-5")}>
                  {(subRoutes as Record<string, string[]>)[route].map(
                    (subRoute: string) => (
                      <li key={subRoute} className={"my-5"}>
                        {subRoute}
                      </li>
                    ),
                  )}
                </ul>
                {route === "Properties" && (
                  <div className={"mt-10 laptop:hidden"}>
                    <h4
                      className={cn("text-xl text-sgrey-60 border-sgrey-15 ")}
                    >
                      {"Contact Us"}
                    </h4>
                    <ul className={cn("my-5")}>{contactUs}</ul>
                  </div>
                )}

                <Separator
                  className={cn(
                    "w-[88%] laptop:hidden",
                    index > Object.keys(subRoutes).length - 4 && "hidden",
                  )}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className={" bg-sgrey-10 "}>
        <div
          className={
            "offset flex h-full flex-col-reverse items-center gap-2 py-2.5 lg:flex-row desktop:py-8"
          }
        >
          <p className={"order-3 mx-5 laptop:order-1"}>
            @2023 Estatein. All Rights Reserved.
          </p>
          <p className={"order-2 mx-5"}>Terms & Conditions</p>
          <div className={"order-3 grow"}></div>
          <div
            className={
              " order-4 flex justify-between gap-x-2.5 *:laptop:size-10 *:desktop:size-14 [&_img]:size-1/2"
            }
          >
            <Button
              size={"icon"}
              variant={"active"}
              className={"size-16 rounded-full border-transparent"}
            >
              <img alt={"facebook"} src={facebook} />
            </Button>
            <Button
              size={"icon"}
              variant={"active"}
              className={"size-16 rounded-full border-transparent lg:size-12"}
            >
              <img alt={"linked in"} src={linkedIn} />
            </Button>
            <Button
              size={"icon"}
              variant={"active"}
              className={"size-16 rounded-full border-transparent lg:size-12"}
            >
              <img alt={"twitter"} src={twitter} />
            </Button>
            <Button
              size={"icon"}
              variant={"active"}
              className={"size-16 rounded-full border-transparent lg:size-12"}
            >
              <img alt={"youtube"} src={youtube} />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
