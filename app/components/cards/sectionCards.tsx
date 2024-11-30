// @flow
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/styles";
import { createContext, useContext } from "react";

export type sectionCardProps = {
  name: string;
  description: string;
  buttonText?: string | boolean;
  icon?: React.ReactNode;
};
const SectionData = createContext({} as sectionCardProps);

type Props = React.HTMLAttributes<HTMLDivElement> & {
  data?: sectionCardProps;
  wrap?: boolean;
};

function SectionIcon({ data, className }: Props) {
  const cardData = data ?? useContext(SectionData);
  return <div className={className}>{cardData.icon}</div>;
}
function SectionContent({
  data,
  className,
  children,
  buttonText,
  variant,
}: Props & Partial<sectionCardProps> & Partial<ButtonProps>) {
  const cardData = data ?? useContext(SectionData);
  return (
    <CardContent className={cn("flex justify-start items-center ", className)}>
      {children}
      {buttonText || cardData?.buttonText ? (
        <Button
          size={"responsive"}
          variant={variant ?? "secondary"}
          className={"text-lg  desktop:h-[60px]"}
        >
          {typeof buttonText === "boolean"
            ? "Learn More"
            : buttonText || cardData?.buttonText}
        </Button>
      ) : null}
    </CardContent>
  );
}
function SectionTitle({ data, className, children }: Props) {
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
function SectionDescription({ data, className, children }: Props) {
  const cardData = data ?? useContext(SectionData);
  return (
    <p className={cn(" lg:text-left max-h-32 text-sgrey-60", className)}>
      {children ?? cardData.description}
    </p>
  );
}

function SectionHeader({ data, className, children }: Props) {
  const cardData = data ?? useContext(SectionData);
  return (
    <CardHeader className={cn("gap-y-6", className)}>
      {children ? (
        children
      ) : (
        <>
          <SectionTitle data={cardData} />
          <SectionDescription data={cardData} />
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
          className={cn(
            "bg-sgrey-8 dataCardComponent dataCard flex flex-col gap-y-8 justify-between",
            className,
          )}
        >
          <SectionHeader data={data} />
          <SectionContent data={data} />
        </Card>
      ) : (
        <Card
          className={cn(
            "bg-sgrey-8 dataCardComponent dataCard flex flex-col gap-y-8 justify-between",
            className,
          )}
        >
          {children}
        </Card>
      )}
    </SectionData.Provider>
  );
}
SectionHeader.Title = SectionTitle;
SectionHeader.Description = SectionDescription;
SectionCards.Title = SectionTitle;
SectionCards.Description = SectionDescription;
SectionCards.Header = SectionHeader;
SectionCards.Content = SectionContent;
SectionCards.Icon = SectionIcon;

export {
  SectionCards,
  SectionHeader,
  SectionContent,
  SectionTitle,
  SectionDescription,
  SectionIcon,
};
