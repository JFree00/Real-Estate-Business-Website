// @flow
import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

export type infoCardProps = {
  text: string;
  icon: React.ReactNode;
};
type InfoCardAreaProps = {
  children?: React.ReactNode;
  cardData?: infoCardProps[];
};

function InfoCardArea({ children, cardData = [] }: InfoCardAreaProps) {
  const cards = cardData?.map((data) => {
    return <InfoCards key={data.text} text={data.text} icon={data.icon} />;
  });
  return (
    <div
      className={
        "col-span-12 mx-5 lg:mx-0 rounded-2xl lg:rounded-none border border-sgrey-15 h-fit xl:h-[190px] 2xl:h-[252px]"
      }
    >
      <div
        className={
          "lg:mx-4 py-4 flex flex-wrap lg:flex-nowrap justify-center gap-5 h-full"
        }
      >
        {cards}
        {children}
      </div>
    </div>
  );
}

function InfoCards(props: infoCardProps) {
  return (
    <div
      className={
        " px-4  shrink-0 lg:shrink basis-[45%] h-fit lg:h-full bg-sgrey-10 border-sgrey-15 border pt-4 rounded-xl relative"
      }
    >
      <Button
        size={"icon"}
        variant={"ghost"}
        className={"absolute right-5 text-sgrey-30"}
      >
        <ArrowUpRightIcon />
      </Button>
      <div className={"flex flex-nowrap justify-center items-center h-3/5"}>
        <div className={"size-16 2xl:size-24"}>
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
                      <div className={" size-1/2"}>{props.icon}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={"flex justify-center items-center h-1/5"}>
        <div className={"text-base text-center 2xl:text-xl font-semibold"}>
          {props.text}
        </div>
      </div>
    </div>
  );
}

InfoCards.InfoCardsArea = InfoCardArea;
export default InfoCards;
