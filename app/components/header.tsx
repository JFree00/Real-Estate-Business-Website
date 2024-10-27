import { Link } from "@remix-run/react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { LogoSvg } from "@/components/ui/logoSvg";
import { useState } from "react";

const routes = ["Home", "About Us", "Properties", "Services"];
export function Header() {
  const [route] = useState("Home");
  const buttons = routes.map((buttonRoute) => {
    return (
      <Button variant={route === buttonRoute ? "active" : "secondary"}>
        {buttonRoute}
      </Button>
    );
  });

  return (
    <header className="flex items-center justify-between px-4 py-2 md:py-4 bg-sgrey-10 h-20 flex-row border-b border-t border-sgrey-15">
      <div className="items-center basis-1/4 pl-40">
        <Link className="flex items-center space-x-2" to="/">
          <LogoSvg size={"lg"} />
        </Link>
      </div>
      <div className={"basis-1/2 flex space-x-2 justify-center"}>{buttons}</div>
      <div className={"basis-1/4 flex justify-center"}>
        <Button variant={"active"} className={"h-12"}>
          Contact Us
        </Button>
      </div>
    </header>
  );
}
