import { Link, useLocation } from "react-router";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { LogoSvg } from "@/components/ui/logoSvg";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import burgerIcon from "@/assets/icons/burger.svg";
import { cn } from "@/lib/styles";
import { Separator } from "@/components/ui/separator";
const routes = ["Home", "About Us", "Properties", "Services"];
const realRoutes = ["", "about-us", "properties", "services"];
export function Header() {
  const currentRoute = useLocation();
  const [opened, toggle] = useState(true);

  const buttons = routes.map((buttonRoute, index) => {
    return (
      <Link key={buttonRoute} to={realRoutes[index]}>
        <Button
          size={"nav"}
          variant={
            "/" + realRoutes[index] === currentRoute.pathname
              ? "active"
              : "ghost"
          }
        >
          {buttonRoute}
        </Button>
      </Link>
    );
  });

  return (
    <header
      className="flex flex-col bg-sgrey-10"
      style={{
        height: !opened ? "5rem" : "10rem",
      }}
    >
      {opened && (
        <div className={" relative basis-3/5 overflow-hidden "}>
          <div
            className={
              " absolute z-10 flex size-full items-center justify-between "
            }
          >
            <div className={"hidden basis-1/12 lg:block"}></div>
            <div
              className={
                "flex grow items-center justify-center text-sm md:text-xl "
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
                className={"rounded-full bg-sgrey-40/30"}
                onClick={() => {
                  toggle(!opened);
                }}
              >
                <XMarkIcon className={"size-2/3"} />
              </Button>
            </div>
          </div>
          <div
            className={
              "absolute size-full bg-waves bg-auto bg-center bg-no-repeat  opacity-30 desktop:bg-cover desktop:bg-left"
            }
          />
        </div>
      )}
      <Separator />
      <div
        className={"offset flex basis-auto items-center justify-between"}
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
            "hidden basis-1/2 justify-center space-x-2 lg:visible lg:flex"
          }
        >
          {buttons}
        </div>
        <MobileHeader className={"basis-1/12"} />
        <div className={" hidden basis-1/4 laptop:flex"}>
          <Button
            variant={
              currentRoute.pathname === "/contact" ? "primary" : "active"
            }
            className={"h-14 "}
            asChild
          >
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
      <Separator />
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
