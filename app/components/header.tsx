import { Link } from "@remix-run/react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { LogoSvg } from "@/components/ui/logoSvg";
import { useState } from "react";
import wavesComponent from "@/assets/waves.svg";
import { XMarkIcon } from "@heroicons/react/24/solid";
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
          className={"overflow-hidden relative "}
          style={{
            height: "40%",
          }}
        >
          <div
            className={
              "flex justify-between items-center h-full z-10 absolute w-full "
            }
          >
            <div className={"basis-1/3"} />
            <div className={" flex text-lg"}>
              <h3 className={" self-center"}>
                ✨Discover Your Dream Property with Estatein
              </h3>
              <Button size={"sm"} variant={"permlink"} className={"text-lg"}>
                Learn More
              </Button>
            </div>
            <div className={"flex basis-1/3 justify-end mr-3"}>
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
        className={"flex items-center  border-b border-t border-sgrey-15"}
        style={{
          height: !opened ? "100%" : "60%",
        }}
      >
        <div className="basis-1/4">
          <Link className="flex justify-center space-x-2" to="/">
            <LogoSvg size={"lg"} />
          </Link>
        </div>
        <div className={"basis-1/2 flex space-x-2 justify-center"}>
          {buttons}
        </div>
        <div className={"basis-1/4 flex justify-center"}>
          <Button variant={"active"} className={"h-14"}>
            Contact Us
          </Button>
        </div>
      </div>
    </header>
  );
}
