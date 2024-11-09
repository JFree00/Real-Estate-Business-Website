// @flow
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/styles";

export type sectionCardProps = {
  name: string;
  description: string;
  buttonText?: string;
};

type Props = React.HTMLAttributes<HTMLDivElement> & {
  data?: sectionCardProps;
};

function Content({ data, className }: Props) {
  data = data as sectionCardProps;
  return (
    <CardContent
      className={cn(
        "flex justify-start items-center  desktop:px-6 desktop:pb-2 desktop:pt-6",
        className,
      )}
    >
      {data.buttonText ? (
        <Button size={"responsive"} variant={"secondary"} className={"text-lg"}>
          {data.buttonText}
        </Button>
      ) : null}
    </CardContent>
  );
}

function Header({ data, className }: Props) {
  data = data as sectionCardProps;
  return (
    <CardHeader
      className={cn(" desktop:px-6 desktop:pb-2 desktop:pt-6 ", className)}
    >
      <CardTitle
        className={
          "text-xl lg:text-2xl font-semibold leading-normal min-h-[72px]"
        }
      >
        {data.name}
      </CardTitle>
      <p className={"pt-6 lg:text-left max-h-32 text-sgrey-60  min-h-[80px]"}>
        {data.description}
      </p>
    </CardHeader>
  );
}

function SectionCards({ data, children }: Props) {
  data = data as sectionCardProps;
  return (
    <div key={data.name} className={"dataCard"}>
      {!children ? (
        <Card className={"bg-sgrey-8 dataCardComponent"}>
          <Header data={data} />
          <Content data={data} />
        </Card>
      ) : (
        <Card className={"bg-sgrey-8 dataCardComponent"}>{children}</Card>
      )}
    </div>
  );
}
SectionCards.Header = Header;
SectionCards.Content = Content;

export { SectionCards };
