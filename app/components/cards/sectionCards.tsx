// @flow
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/styles";
import { createContext, useContext } from "react";
import { namedUnknown } from "../../../data/filter";
import { DataContext } from "@/context/paginationContext";

export interface sectionCardProps extends namedUnknown {
  name: string;
  description: string | boolean;
  buttonText?: string | boolean;
  disabled?: boolean;
  icon?: React.ReactElement;
}
const SectionData = createContext({} as sectionCardProps);

type Props = React.ComponentPropsWithoutRef<"div"> & {
  data?: sectionCardProps;
  wrap?: boolean;
};

function SectionIcon({ data, className }: Props) {
  const sectionData = useContext(SectionData);
  const cardData = data ?? sectionData;
  return <div className={className}>{cardData.icon}</div>;
}
function SectionCardContent({
  data,
  className,
  children,
  buttonText,
  variant,
}: Props & Partial<sectionCardProps> & Partial<ButtonProps>) {
  const sectionData = useContext(SectionData);
  const cardData = data ?? sectionData;
  return (
    <CardContent className={cn("", className)}>
      {children}
      {buttonText || cardData?.buttonText ? (
        <Button
          size={"responsive"}
          variant={variant ?? "secondary"}
          className={"mt-5  text-lg desktop:h-[60px]"}
          disabled={cardData?.disabled}
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
  const sectionData = useContext(SectionData);
  const cardData = data ?? sectionData;
  return (
    <CardTitle
      className={cn(
        "text-xl desktop:text-2xl font-semibold leading-normal",
        className ?? "desktop:text-3xl",
      )}
    >
      {children ?? cardData?.name ?? null}
    </CardTitle>
  );
}
function SectionCardDescription({ data, className, children }: Props) {
  const sectionData = useContext(SectionData);
  const cardData = data ?? sectionData;
  return (
    <div className={cn(" lg:text-left text-sgrey-60 ", className)}>
      {children ?? cardData?.description ?? null}
    </div>
  );
}

function SectionCardHeader({ data, className, children }: Props) {
  const sectionData = useContext(SectionData);
  const cardData = data ?? sectionData;
  return (
    <CardHeader className={cn("flex flex-col justify-between", className)}>
      {children ?? (
        <>
          <SectionCardTitle data={cardData} />
          <SectionCardDescription data={cardData} />
        </>
      )}
    </CardHeader>
  );
}

function SectionCards({ data, children, className, ...props }: Props) {
  const dataContext = useContext(DataContext) as sectionCardProps;
  data = data ?? dataContext;
  return (
    <SectionData.Provider {...props} value={data}>
      {!children ? (
        <Card
          className={cn(
            "bg-sgrey-8 dataCardComponent dataCard grid auto-rows-auto gap-y-0 ",
            className,
          )}
          {...props}
        >
          <SectionCardHeader data={data} />
          <SectionCardContent data={data} />
        </Card>
      ) : (
        <Card
          className={cn(
            " bg-sgrey-8 dataCardComponent dataCard grid grid-rows-subgrid row-span-2 col-span-1 gap-y-4 ",
            className,
          )}
          {...props}
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
