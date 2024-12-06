// @flow
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/styles";
import { createContext, useContext } from "react";

import { namedUnknown } from "../../../KV/filter";

export interface sectionCardProps extends namedUnknown {
  name: string;
  description: string;
  buttonText?: string | boolean;
  icon?: React.ReactNode;
}
const SectionData = createContext({} as sectionCardProps);

type Props = React.HTMLAttributes<HTMLDivElement> & {
  data?: sectionCardProps;
  wrap?: boolean;
};

function SectionIcon({ data, className }: Props) {
  const cardData = data ?? useContext(SectionData);
  return <div className={className}>{cardData.icon}</div>;
}
function SectionCardContent({
  data,
  className,
  children,
  buttonText,
  variant,
}: Props & Partial<sectionCardProps> & Partial<ButtonProps>) {
  const cardData = data ?? useContext(SectionData);
  return (
    <CardContent className={cn("", className)}>
      {children}
      {buttonText || cardData?.buttonText ? (
        <Button
          size={"responsive"}
          variant={variant ?? "secondary"}
          className={"text-lg  desktop:h-[60px] mt-5"}
        >
          {typeof buttonText === "boolean"
            ? "Learn More"
            : (buttonText ?? cardData?.buttonText)}
        </Button>
      ) : null}
    </CardContent>
  );
}
function SectionCardTitle({ data, className, children }: Props) {
  const cardData = data ?? useContext(SectionData);
  return (
    <CardTitle
      className={cn(
        "text-xl desktop:text-2xl font-semibold leading-normal",
        className,
      )}
    >
      {children ?? cardData.name}
    </CardTitle>
  );
}
function SectionCardDescription({ data, className, children }: Props) {
  const cardData = data ?? useContext(SectionData);
  return (
    <p className={cn(" lg:text-left text-sgrey-60 ", className)}>
      {children ?? cardData.description}
    </p>
  );
}

function SectionCardHeader({ data, className, children }: Props) {
  const cardData = data ?? useContext(SectionData);
  return (
    <CardHeader className={cn("flex flex-col justify-between", className)}>
      {children ? (
        children
      ) : (
        <>
          <SectionCardTitle data={cardData} />
          <SectionCardDescription data={cardData} />
        </>
      )}
    </CardHeader>
  );
}

function SectionCards({ data, children, className }: Props) {
  data = data!;
  return (
    <SectionData.Provider value={data}>
      {!children ? (
        <Card
          className={cn(
            "bg-sgrey-8 dataCardComponent dataCard grid auto-rows-auto gap-y-0 ",
            className,
          )}
        >
          <SectionCardHeader data={data} />
          <SectionCardContent data={data} />
        </Card>
      ) : (
        <Card
          className={cn(
            " bg-sgrey-8 dataCardComponent dataCard grid grid-rows-subgrid row-span-2 col-span-1 gap-y-4  first:grid",
            className,
          )}
        >
          {children}
        </Card>
      )}
    </SectionData.Provider>
  );
}
SectionCardHeader.Title = SectionCardTitle;
SectionCardHeader.Description = SectionCardDescription;
SectionCards.Title = SectionCardTitle;
SectionCards.Description = SectionCardDescription;
SectionCards.Header = SectionCardHeader;
SectionCards.Content = SectionCardContent;
SectionCards.Icon = SectionIcon;

export {
  SectionCards,
  SectionCardHeader,
  SectionCardContent,
  SectionCardTitle,
  SectionCardDescription,
  SectionIcon,
};
