// @flow
import * as React from "react";
import { LogoLg, LogoMd, LogoSm, Symbol } from "@/assets";

type props = {
  size: "xs" | "sm" | "md" | "lg";
};

export function LogoSvg({ size }: props) {
  return size === "xs" ? (
    <Symbol />
  ) : size === "sm" ? (
    <LogoSm />
  ) : size === "md" ? (
    <LogoMd />
  ) : size === "lg" ? (
    <LogoLg />
  ) : (
    <Symbol />
  );
}
