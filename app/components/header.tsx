import { Link, NavLink } from "react-router";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { LogoSvg } from "@/components/ui/logoSvg";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import burgerIcon from "@/assets/icons/burger.svg";
import { cn } from "@/lib/styles";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const routes = ["Home", "About Us", "Properties", "Services"];
const realRoutes = ["/", "about-us", "properties", "services"];
export function Header() {
  const [opened, toggle] = useState(true);

  const buttons = routes.map((buttonRoute, index) => {
    return (
      <li key={index}>
        <Button
          className={" transition-all focus:border-0 w-full"}
          size={"nav"}
          variant={"ghost"}
          asChild
        >
          <NavLink
            className={
              "rounded-none laptop:rounded-lg border-sgrey-15 group aria-[current]:border aria-[current]:bg-sgrey-8 aria-[current]:hover:bg-sgrey-8/60"
            }
            draggable={false}
            key={buttonRoute}
            to={realRoutes[index]}
          >
            {buttonRoute}
          </NavLink>
        </Button>
      </li>
    );
  });

  return (
    <header
      className={cn("flex flex-col bg-sgrey-10", opened ? "h-40" : "h-20")}
    >
      {opened && (
        <div className={" relative basis-3/5 overflow-hidden "}>
          <div
            className={
              " absolute z-10 flex size-full items-center justify-between "
            }
          >
            <div className={"hidden basis-1/12 lg:block"} />
            <section
              className={
                "flex grow items-center justify-center text-sm md:text-xl "
              }
            >
              <h3 className={"text-xs tablet:text-lg"}>
                ✨Discover Your Dream Property
                <span className={"hidden sm:contents"}> with Estatein</span>
              </h3>
              <Button
                size={"sm"}
                variant={"permlink"}
                className={"text-xs sm:pl-2 md:text-lg"}
                asChild
              >
                <Link to={"/about-us"}>Learn More</Link>
              </Button>
            </section>
            <div
              className={"flex basis-1/12 justify-center laptop:justify-center"}
            >
              <Button
                size={"icon"}
                className={"rounded-full bg-sgrey-40/30 "}
                onClick={() => {
                  toggle(!opened);
                }}
                aria-label={"Close Banner"}
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
      <nav
        title={"Main Navigation"}
        className={cn(
          "offset flex basis-auto items-center justify-between",
          opened ? "h-full" : "h-3/5",
        )}
      >
        <div className="basis-1/4">
          <Link className="flex space-x-2" to="/">
            <LogoSvg size={"lg"} />
          </Link>
        </div>
        <menu
          className={
            "hidden basis-1/2 justify-center space-x-2 lg:visible lg:flex"
          }
        >
          {buttons}
        </menu>
        <MobileHeader className={"basis-1/12"}>{buttons}</MobileHeader>
        <div className={" hidden basis-1/4 laptop:flex"}>
          <Button
            variant={"active"}
            className={
              "h-14 aria-[current]:hover:bg-pprimary-60/90 aria-[current]:bg-pprimary-60 aria-[current]:shadow-sm"
            }
            asChild
          >
            <NavLink to="/contact">Contact Us</NavLink>
          </Button>
        </div>
      </nav>
      <Separator />
    </header>
  );
}

const MobileHeader = ({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <nav className={cn("lg:hidden", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size={"icon"}
            variant={"ghost"}
            className={"size-full justify-end"}
            aria-label={"Open Navigation"}
          >
            <img alt={"navigation Icon"} src={burgerIcon} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={"p-0"} asChild>
          <menu
            className={" bg-sgrey-10 flex flex-col max-w-[40vw] p-0 border-x-0"}
          >
            {children}
          </menu>
        </PopoverContent>
      </Popover>
    </nav>
  );
};
