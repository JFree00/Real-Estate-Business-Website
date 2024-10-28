import { Link } from "@remix-run/react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { LogoSvg } from "@/components/ui/logoSvg";
import { useState } from "react";
import wavesComponent from "@/assets/waves.svg";
const routes = ["Home", "About Us", "Properties", "Services"];
export function Header() {
  const [route] = useState("Home");
  const buttons = routes.map((buttonRoute) => {
    return (
      <Button
        key={buttonRoute}
        size={"nav"}
        variant={route === buttonRoute ? "active" : "secondary"}
      >
        {buttonRoute}
      </Button>
    );
  });

  return (
    <header className="bg-sgrey-10 h-40">
      <div
        className={"overflow-hidden relative "}
        style={{
          height: "40%",
        }}
      >
        <div className={"flex justify-center h-full z-10 absolute w-full "}>
          <h3 className={"font-medium text-lg self-center"}>
            ✨Discover Your Dream Property with Estatein
          </h3>
          <Button variant={"permlink"} className={"h-full text-lg"}>
            Learn More
          </Button>
        </div>
        <div
          className={" bg-contain  w-full absolute -top-48"}
          style={{
            backgroundImage: `url('${wavesComponent}')`,
            paddingTop: "99%",
            top: "calc(50% - 1282px/2 - 0.5px)",
          }}
        ></div>
      </div>
      <div
        className={"flex items-center  border-b border-t border-sgrey-15"}
        style={{
          height: "60%",
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
