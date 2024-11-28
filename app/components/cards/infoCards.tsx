// @flow
import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/styles";

export type infoCardProps = React.HTMLAttributes<HTMLDivElement> & {
  text: string;
  icon: React.ReactNode;
};
type InfoCardAreaProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
  cardData?: infoCardProps[];
  gap?: string;
};

function InfoCardArea({
  children,
  cardData = [],
  className,
  gap,
}: InfoCardAreaProps) {
  const cards = cardData?.map((data) => {
    return <InfoCards key={data.text} text={data.text} icon={data.icon} />;
  });
  return (
    <div
      className={cn(
        "offset p-2.5 mt-10 tablet:mt-0 col-span-full tablet:mx-0 rounded-2xl tablet:rounded-none border border-sgrey-15  xl:h-[190px] 2xl:h-[252px] desktop:p-5",
        className,
      )}
    >
      <div
        className={cn(
          " grid grid-cols-2 grid-rows-2 tablet:grid-rows-1 tablet:grid-cols-4 justify-center h-[270px] tablet:h-full gap-2.5 laptop:py-0 laptop:gap-2.5 desktop:gap-5",
          gap,
        )}
      >
        {cards}
        {children}
      </div>
    </div>
  );
}

function InfoCards({ text, icon, className }: infoCardProps) {
  return (
    <div
      className={cn(
        "  tablet:shrink h-full tablet:h-full bg-sgrey-10 border-sgrey-15 border px-2 tablet:py-4 rounded-xl relative",
        className,
      )}
    >
      <Button
        size={"icon"}
        variant={"ghost"}
        className={"absolute right-2 top-2 text-sgrey-30"}
      >
        <ArrowUpRightIcon />
      </Button>
      <div
        className={
          "laptop:mb-4 flex flex-nowrap justify-center items-center h-3/5"
        }
      >
        <div className={"size-12 laptop:size-20"}>
          <div
            className={
              "size-full text-pprimary-75  bg-gradient-to-tr from-pprimary-75 from-0% via-transparent via-30% rounded-full"
            }
          >
            <div
              className={
                "flex size-full text-pprimary-75  bg-gradient-to-bl from-pprimary-75 from-0% via-transparent via-50% rounded-full"
              }
            >
              <div
                className={"rounded-full bg-sgrey-10 mx-auto flex items-center"}
                style={{
                  flexBasis: "98%",
                  marginTop: "1%",
                  marginBottom: "1%",
                }}
              >
                <div
                  className={
                    "h-3/4 basis-3/4 mx-auto text-pprimary-75  bg-gradient-to-br from-pprimary-75 from-0% via-transparent via-30% rounded-full"
                  }
                >
                  <div
                    className={
                      "flex size-full text-pprimary-75  bg-gradient-to-tl from-pprimary-75 from-0% via-transparent via-50% rounded-full"
                    }
                  >
                    <div
                      className={
                        "flex justify-center items-center rounded-full bg-sgrey-10 mx-auto my-px"
                      }
                      style={{
                        flexBasis: "96%",
                      }}
                    >
                      <div className={" size-1/2"}>{icon}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={" min-h-12 overflow-hidden  justify-center items-center"}>
        <p
          className={
            "h-full shrink text-sm text-center desktop:text-xl font-semibold "
          }
        >
          {text}
        </p>
      </div>
    </div>
  );
}

InfoCards.InfoCardsArea = InfoCardArea;
export default InfoCards;
