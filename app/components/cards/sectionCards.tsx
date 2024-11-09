// @flow
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type sectionCardProps = React.HTMLAttributes<HTMLDivElement> & {
  name: string;
  description: string;
  buttonText?: string;
};

type Props = {
  data?: sectionCardProps;
};

export function SectionCards({ data }: Props) {
  data = data as sectionCardProps;
  return (
    <div key={data.name} className={"dataCard"}>
      <Card className={"bg-sgrey-8 dataCardComponent"}>
        <CardHeader className={" 2xl:px-6 2xl:pb-2 2xl:pt-6 "}>
          <CardTitle
            className={
              "text-xl lg:text-2xl font-semibold leading-normal min-h-[72px]"
            }
          >
            {data.name}
          </CardTitle>
          <p
            className={"pt-6 lg:text-left max-h-32 text-sgrey-60  min-h-[80px]"}
          >
            {data.description}
          </p>
        </CardHeader>
        <CardContent className={"flex justify-start items-center"}>
          {data.buttonText ? (
            <Button
              size={"responsive"}
              variant={"secondary"}
              className={"text-lg"}
            >
              {data.buttonText}
            </Button>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
