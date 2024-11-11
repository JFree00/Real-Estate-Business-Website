// @flow
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/styles";
import { createContext, useContext } from "react";

export type sectionCardProps = {
  name: string;
  description: string;
  buttonText?: string;
};
const SectionData = createContext({} as sectionCardProps);

type Props = React.HTMLAttributes<HTMLDivElement> & {
  data?: sectionCardProps;
};

function Content({ data, className, children }: Props) {
  const cardData = data ?? useContext(SectionData);
  return (
    <CardContent
      className={cn(
        "flex justify-start items-center  desktop:px-6 desktop:pb-2 desktop:pt-6",
        className,
      )}
    >
      {children}
      {cardData.buttonText ? (
        <Button size={"responsive"} variant={"secondary"} className={"text-lg"}>
          {cardData.buttonText}
        </Button>
      ) : null}
    </CardContent>
  );
}
function Title({ data, className, children }: Props) {
  const cardData = data ?? useContext(SectionData);
  return (
    <CardTitle
      className={cn(
        "text-xl lg:text-2xl font-semibold leading-normal",
        className,
      )}
    >
      {children ?? cardData.name}
    </CardTitle>
  );
}
function Description({ data, className, children }: Props) {
  const cardData = data ?? useContext(SectionData);
  return (
    <p
      className={cn(
        "pt-6 lg:text-left max-h-32 text-sgrey-60  min-h-[80px]",
        className,
      )}
    >
      {children ?? cardData.description}
    </p>
  );
}

function Header({ data, className, children }: Props) {
  const cardData = data ?? useContext(SectionData);
  return (
    <CardHeader
      className={cn(" desktop:px-6 desktop:pb-2 desktop:pt-6 ", className)}
    >
      {children ? (
        children
      ) : (
        <>
          <Title data={cardData} />
          <Description data={cardData} />
        </>
      )}
    </CardHeader>
  );
}

function SectionCards({ data, children, className }: Props) {
  data = data as sectionCardProps;
  return (
    <div key={data.name} className={cn("dataCard", className)}>
      <SectionData.Provider value={data}>
        {!children ? (
          <Card className={"bg-sgrey-8 dataCardComponent"}>
            <Header data={data} />
            <Content data={data} />
          </Card>
        ) : (
          <>{children}</>
        )}
      </SectionData.Provider>
    </div>
  );
}
Header.Title = Title;
Header.Description = Description;
SectionCards.Header = Header;
SectionCards.Content = Content;

export { SectionCards };
