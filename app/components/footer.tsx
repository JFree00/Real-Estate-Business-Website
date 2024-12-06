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
    <footer>
      <div
        className={
          " border-t border-sgrey-15 grid grid-cols-12 mt-20 *:col-span-full "
        }
      >
        <div className={"relative grid grid-cols-subgrid"}>
          <div className={"col-span-full"}>
            <img
              src={globeLeft}
              alt="globe"
              height={"100%"}
              className={"absolute -z-10 bottom-0"}
            />
            <img
              src={globeRight}
              alt="globe"
              height={"100%"}
              className={"absolute -z-10 right-0 bottom-0"}
            />
          </div>
          <div
            className={
              " grid grid-cols-subgrid col-span-full" +
              " border-b border-sgrey-15 h-[367px] items-center offset"
            }
          >
            <div className={"col-span-8 "}>
              <h3 className={"text-3xl desktop::text-5xl font-semibold mb-6"}>
                Start Your Real Estate Journey Today
              </h3>
              <p className={"text-sgrey-60"}>
                Your dream property is just a click away. Whether you're looking
                for a new home, a strategic investment, or expert real estate
                advice, Estatein is here to assist you every step of the way.
                Take the first step towards your real estate goals and explore
                our available properties or get in touch with our team for
                personalized assistance.
              </p>
            </div>

            <Button
              variant={"primary"}
              size={"responsive"}
              className={
                " col-start-9 col-span-4 justify-self-end  right-0 laptop:h-12 desktop:h-14   laptop:py-0"
              }
            >
              Explore Properties
            </Button>
          </div>
        </div>
        <div className={"offset laptop:pt-20"}>
          <div className={"grid grid-cols-12 laptop:gap-x-20"}>
            <div className={"pt-10 col-span-full laptop:col-span-4"}>
              <img alt={"logo"} src={logoLg} />
              <FooterInput
                className={"my-5"}
                placeholder={"Enter Your Email"}
              ></FooterInput>
            </div>
            <div
              className={
                " laptop:col-start-5 col-span-full grid grid-rows-[repeat(3,max)] grid-cols-[repeat(2,1fr)] laptop:grid-cols-[repeat(5,auto)] laptop:justify-items-end laptop:py-16 gap-x-5 "
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
                          className={cn(
                            "text-xl text-sgrey-60 border-sgrey-15 ",
                          )}
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
        </div>
        <div className={" bg-sgrey-10 "}>
          <div
            className={
              "py-2.5 desktop:py-8 flex offset flex-col-reverse gap-2 lg:flex-row h-full items-center"
            }
          >
            <p className={"mx-5 order-3 laptop:order-1"}>
              @2023 Estatein. All Rights Reserved.
            </p>
            <p className={"mx-5 order-2"}>Terms & Conditions</p>
            <div className={"grow order-3"}></div>
            <div
              className={
                " gap-x-2.5 flex justify-between *:laptop:size-10 *:desktop:size-14 [&_img]:size-1/2 order-4"
              }
            >
              <Button
                size={"icon"}
                variant={"active"}
                className={"rounded-full size-16 border-transparent"}
              >
                <img alt={"facebook"} src={facebook} />
              </Button>
              <Button
                size={"icon"}
                variant={"active"}
                className={"rounded-full size-16 lg:size-12 border-transparent"}
              >
                <img alt={"linked in"} src={linkedIn} />
              </Button>
              <Button
                size={"icon"}
                variant={"active"}
                className={"rounded-full size-16 lg:size-12 border-transparent"}
              >
                <img alt={"twitter"} src={twitter} />
              </Button>
              <Button
                size={"icon"}
                variant={"active"}
                className={"rounded-full size-16 lg:size-12 border-transparent"}
              >
                <img alt={"youtube"} src={youtube} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
