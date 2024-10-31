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
    return <InfoCards text={data.text} icon={data.icon} />;
  });
  return (
    <div
      className={"col-span-12 border border-sgrey-15"}
      style={{
        height: "95%",
      }}
    >
      <div className={"mx-4 mt-5 flex gap-x-5 h-full"}>
        {children}
        {cards}
      </div>
    </div>
  );
}

function InfoCards(props: infoCardProps) {
  return (
    <div
      className={
        "w-1/4 h-5/6 bg-sgrey-10 border-sgrey-15 border pt-4 rounded-xl relative"
      }
    >
      <Button size={"icon"} className={"absolute right-5 text-sgrey-30"}>
        <ArrowUpRightIcon />
      </Button>
      <div className={"flex flex-nowrap justify-center items-center h-3/5"}>
        <div className={" basis-1/5 h-3/4 mx-auto"}>
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
        <div className={"text-xl font-semibold"}>{props.text}</div>
      </div>
    </div>
  );
}

InfoCards.InfoCardsArea = InfoCardArea;
export default InfoCards;
