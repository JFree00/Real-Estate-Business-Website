// @flow
import * as React from "react";
import symbol from "@/assets/icons/symbol.svg";
import logoSm from "@/assets/icons/LogoSm.svg";
import logoMd from "@/assets/icons/LogoMd.svg";
import logoLg from "@/assets/icons/LogoLg.svg";
type props = {
  size: "xs" | "sm" | "md" | "lg";
};

export function LogoSvg({ size }: props) {
  return size === "xs" ? (
    <img src={symbol} alt={"Logo"} />
  ) : size === "sm" ? (
    <img src={logoSm} alt={"Logo"} />
  ) : size === "md" ? (
    <img src={logoMd} alt={"Logo"} />
  ) : size === "lg" ? (
    <img src={logoLg} alt={"Logo"} />
  ) : (
    <img src={symbol} alt={"Logo"} />
  );
}
