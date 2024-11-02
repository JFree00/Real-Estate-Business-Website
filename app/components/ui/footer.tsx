// @flow
import * as React from "react";
import { Button } from "@/components/ui/button";
import globeLeft from "@/assets/globeLeft.png";
import globeRight from "@/assets/globeRight.png";
import logoLg from "@/assets/icons/logoLg.svg";
import { Input } from "@/components/ui/input";
import facebook from "@/assets/icons/facebook.svg";
import twitter from "@/assets/icons/twitter.svg";
import linkedIn from "@/assets/icons/linkedIn.svg";
import youtube from "@/assets/icons/youtube.svg";

type routes = "Home" | "About Us" | "Properties" | "Services" | "Contact Us";
const subRoutes: Record<routes, Array<string>> = {
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
      <div className={"h-[925px] border-t border-sgrey-15 flex flex-col "}>
        <div className={"relative"}>
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
          <div
            className={
              "border-b border-sgrey-15 h-[367px] flex items-center justify-around  px-20"
            }
          >
            <div className={"basis-2/3"}>
              <h3 className={"text-5xl font-semibold mb-6"}>
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
            <div>
              <Button variant={"primary"} className={"h-16"}>
                Explore Properties
              </Button>
            </div>
          </div>
        </div>
        <div className={"h-[454px] px-48"}>
          <div className={"flex justify-between pt-20"}>
            <div className={"mt-10 basis-4/12"}>
              <img alt={"logo"} src={logoLg} />
              <Input
                className={"my-5"}
                placeholder={"Enter Your Email"}
              ></Input>
            </div>
            <div className={"grid grid-cols-5 grid-flow-row gap-x-5 "}>
              {Object.keys(subRoutes).map((route) => (
                <div key={route}>
                  <h4 className={"text-xl text-sgrey-60 my-5"}>{route}</h4>
                  <ul>
                    {(subRoutes as Record<string, string[]>)[route].map(
                      (subRoute: string) => (
                        <li key={subRoute} className={"  my-5 text-lg"}>
                          {subRoute}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={"flex px-36 bg-sgrey-10 items-center grow"}>
          <p className={"mx-5"}>@2023 Estatein. All Rights Reserved.</p>
          <p className={"mx-5"}>Terms & Conditions</p>
          <div className={"grow"}></div>
          <div className={" gap-x-2.5 flex justify-between"}>
            <Button
              size={"icon"}
              variant={"active"}
              className={"rounded-full size-12 border-transparent"}
            >
              <img alt={"facebook"} src={facebook} />
            </Button>
            <Button
              size={"icon"}
              variant={"active"}
              className={"rounded-full size-12 border-transparent"}
            >
              <img alt={"linked in"} src={linkedIn} />
            </Button>
            <Button
              size={"icon"}
              variant={"active"}
              className={"rounded-full size-12 border-transparent"}
            >
              <img alt={"twitter"} src={twitter} />
            </Button>
            <Button
              size={"icon"}
              variant={"active"}
              className={"rounded-full size-12 border-transparent"}
            >
              <img alt={"youtube"} src={youtube} />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
