// @flow
import * as React from "react";
import symbol from "@/assets/icons/symbol.svg";
import logoSm from "@/assets/icons/logoSm.svg";
import logoMd from "@/assets/icons/logoMd.svg";
import logoLg from "@/assets/icons/logoLg.svg";
type props = React.SVGProps<SVGSVGElement> & {
  size: "xs" | "sm" | "md" | "lg";
};

export function LogoSvg({ size }: props) {
  return size === "xs" ? (
    <img src={symbol} alt={"Estatein"} />
  ) : size === "sm" ? (
    <img src={logoSm} alt={"Estatein"} />
  ) : size === "md" ? (
    <img src={logoMd} alt={"Estatein"} />
  ) : size === "lg" ? (
    <img src={logoLg} alt={"Estatein"} />
  ) : (
    <img src={symbol} alt={"Estatein"} />
  );
}
