import { Link } from "@remix-run/react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { LogoSvg } from "@/components/ui/logoSvg";
import { useState } from "react";
import wavesComponent from "@/assets/waves.svg";
import { XMarkIcon } from "@heroicons/react/24/solid";
import burgerIcon from "@/assets/icons/burger.svg";
import { cn } from "@/lib/styles";
const routes = ["Home", "About Us", "Properties", "Services"];
export function Header() {
  const [route] = useState("Home");
  const [opened, toggle] = useState(true);

  const buttons = routes.map((buttonRoute) => {
    return (
      <Button
        key={buttonRoute}
        size={"nav"}
        variant={route === buttonRoute ? "active" : "ghost"}
      >
        {buttonRoute}
      </Button>
    );
  });

  return (
    <header
      className="bg-sgrey-10"
      style={{
        height: !opened ? "5rem" : "10rem",
      }}
    >
      {opened && (
        <div
          className={" overflow-hidden relative "}
          style={{
            height: "40%",
          }}
        >
          <div
            className={
              " flex justify-between items-center h-full z-10 absolute w-full "
            }
          >
            <div className={"basis-1/12 hidden lg:block"}></div>
            <div
              className={
                "grow flex justify-center items-center text-sm md:text-xl "
              }
            >
              <h3 className={"text-xs tablet:text-lg"}>
                ✨Discover Your Dream Property with Estatein
              </h3>
              <Button
                size={"sm"}
                variant={"permlink"}
                className={"text-xs sm:pl-2 md:text-lg"}
              >
                Learn More
              </Button>
            </div>
            <div
              className={"flex basis-1/12 justify-center laptop:justify-center"}
            >
              <Button
                size={"icon"}
                className={"bg-opacity-30 bg-sgrey-40 rounded-full"}
                onClick={() => {
                  toggle(!opened);
                }}
              >
                <XMarkIcon className={"size-2/3"} />
              </Button>
            </div>
          </div>
          <div
            className={" w-full absolute -top-48"}
            style={{
              backgroundImage: `url('${wavesComponent}')`,
              paddingTop: "99%",
              top: "calc(50% - 1282px/2 - 0.5px)",
            }}
          ></div>
        </div>
      )}
      <div
        className={
          "offset flex items-center justify-between border-b border-t border-sgrey-15"
        }
        style={{
          height: !opened ? "100%" : "60%",
        }}
      >
        <div className="basis-1/4">
          <Link className="flex  space-x-2" to="/">
            <LogoSvg size={"lg"} />
          </Link>
        </div>
        <div
          className={
            "hidden lg:visible basis-1/2 lg:flex space-x-2 justify-center"
          }
        >
          {buttons}
        </div>
        <MobileHeader className={"basis-1/12"} />
        <div className={" hidden basis-1/4 laptop:flex"}>
          <Button variant={"active"} className={"h-14 "}>
            Contact Us
          </Button>
        </div>
      </div>
    </header>
  );
}

const MobileHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className }, ref) => {
  return (
    <div ref={ref} className={cn("lg:hidden", className)}>
      <Button
        size={"icon"}
        variant={"ghost"}
        className={"size-full justify-end"}
      >
        <img alt={"navigation Button"} src={burgerIcon} />
      </Button>
    </div>
  );
});
