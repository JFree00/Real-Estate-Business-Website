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
  icon?: React.ReactNode;
};
const SectionData = createContext({} as sectionCardProps);

type Props = React.HTMLAttributes<HTMLDivElement> & {
  data?: sectionCardProps;
  wrap?: boolean;
};

function Icon({ data, className }: Props) {
  const cardData = data ?? useContext(SectionData);
  return <div className={className}>{cardData.icon}</div>;
}
function Content({ data, className, children }: Props) {
  const cardData = data ?? useContext(SectionData);
  return (
    <CardContent className={cn("flex justify-start items-center", className)}>
      {children}
      {cardData.buttonText ? (
        <Button
          size={"responsive"}
          variant={"secondary"}
          className={"text-lg  desktop:h-[60px]"}
        >
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
    <p className={cn(" lg:text-left max-h-32 text-sgrey-60", className)}>
      {children ?? cardData.description}
    </p>
  );
}

function Header({ data, className, children }: Props) {
  const cardData = data ?? useContext(SectionData);
  return (
    <CardHeader className={cn("gap-y-6 ", className)}>
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
    <SectionData.Provider value={data}>
      {!children ? (
        <Card
          className={cn("bg-sgrey-8 dataCardComponent dataCard", className)}
        >
          <Header data={data} />
          <Content data={data} />
        </Card>
      ) : (
        <Card
          className={cn("bg-sgrey-8 dataCardComponent dataCard", className)}
        >
          {children}
        </Card>
      )}
    </SectionData.Provider>
  );
}
Header.Title = Title;
Header.Description = Description;
SectionCards.Header = Header;
SectionCards.Content = Content;
SectionCards.Icon = Icon;

export { SectionCards };
