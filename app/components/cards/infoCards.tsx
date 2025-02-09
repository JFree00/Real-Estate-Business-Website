// @flow
import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/styles";
import { Link } from "react-router";
import { Swirl } from "@/components/swirl";

export type infoCardProps = React.HTMLAttributes<HTMLDivElement> & {
  text: string;
  icon: React.ReactNode;
  path?: string;
};
type InfoCardAreaProps = React.HTMLAttributes<HTMLDivElement> & {
  cardData?: infoCardProps[];
  gap?: string;
};

function InfoCardArea({
  children,
  cardData = [],
  className,
  gap,
  ...props
}: InfoCardAreaProps) {
  const cards = cardData?.map((data, index) => {
    return <InfoCards key={index} {...data} {...props} />;
  });
  return (
    <aside
      className={cn(
        "offset p-2.5 mt-10 tablet:mt-0 col-span-full tablet:mx-0 rounded-2xl tablet:rounded-none border border-sgrey-15  xl:h-[190px] 2xl:h-[252px] desktop:p-5",
        className,
      )}
    >
      <ul
        className={cn(
          " grid grid-cols-2 grid-rows-2 tablet:grid-rows-1 tablet:grid-cols-4 justify-center h-[270px] tablet:h-full gap-2.5 laptop:py-0 laptop:gap-2.5 desktop:gap-5",
          gap,
        )}
      >
        {cards}
        {children}
      </ul>
    </aside>
  );
}

function InfoCards({ text, icon, className, id, path }: infoCardProps) {
  return (
    <li
      className={cn(
        "  tablet:shrink h-full tablet:h-full bg-sgrey-10 border-sgrey-15 border px-2 tablet:py-4 rounded-xl relative",
        className,
      )}
      id={"#"}
    >
      <Button
        size={"icon"}
        variant={"ghost"}
        className={"absolute right-2 top-2 text-sgrey-30"}
        asChild
      >
        <Link title={path?.replace("/", "")} to={`${path ?? ""}#${id ?? ""}`}>
          <ArrowUpRightIcon />
        </Link>
      </Button>
      <div
        className={
          "flex h-3/5 flex-nowrap items-center justify-center pt-2 laptop:mb-4"
        }
      >
        <Swirl className={"bg-sgrey-10"} size={"laptop:size-20"}>
          <div className={"size-5 laptop:size-7"}>{icon}</div>
        </Swirl>
      </div>
      <p
        className={
          " min-h-12 items-center  justify-center overflow-hidden h-full shrink text-center text-sm font-semibold desktop:text-xl "
        }
      >
        {text}
      </p>
    </li>
  );
}

InfoCards.InfoCardsArea = InfoCardArea;
export default InfoCards;
