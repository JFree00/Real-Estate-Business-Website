import { Link } from "@remix-run/react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { LogoSvg } from "@/components/ui/logoSvg";
import { useState } from "react";
import background from "@/assets/waves.png";
const routes = ["Home", "About Us", "Properties", "Services"];
export function Header() {
  const [route] = useState("Home");
  const buttons = routes.map((buttonRoute) => {
    return (
      <Button
        key={buttonRoute}
        variant={route === buttonRoute ? "active" : "secondary"}
      >
        {buttonRoute}
      </Button>
    );
  });

  return (
    <header className=" py-0 md:py-0 bg-sgrey-10 h-40 flex-row">
      <div className={"overflow-hidden relative h-1/3"}>
        <div
          className={" bg-cover bg-no-repeat w-full absolute -top-48 z-10"}
          style={{
            backgroundImage: `url('${background}')`,
            paddingTop: "99%",
            top: "calc(50% - 1282px/2 - 0.5px)",
            //backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
      <div
        className={
          "flex items-center justify-between  border-b border-t border-sgrey-15 h-2/3"
        }
      >
        <div className="items-center basis-1/4 pl-40">
          <Link className="flex items-center space-x-2" to="/">
            <LogoSvg size={"lg"} />
          </Link>
        </div>
        <div className={"basis-1/2 flex space-x-2 justify-center"}>
          {buttons}
        </div>
        <div className={"basis-1/4 flex justify-center"}>
          <Button variant={"active"} className={"h-12"}>
            Contact Us
          </Button>
        </div>
      </div>
    </header>
  );
}
