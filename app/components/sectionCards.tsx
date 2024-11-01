// @flow
import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type sectionCardProps = {
  name: string;
  description: string;
  buttonText?: string;
};

type Props = {
  cardData: sectionCardProps[];
};

export function SectionCards({ cardData }: Props) {
  return cardData.map((data) => {
    return (
      <Card key={data.name} className={"grid-cols-1 bg-sgrey-8"}>
        <CardHeader className={"mx-6 my-6"}>
          <text
            className={"text-2xl font-semibold leading-normal min-h-[72px]"}
          >
            {data.name}
          </text>
          <p
            className={
              "pt-6 text-left max-h-32 text-sgrey-60 mb-6  min-h-[80px]"
            }
          >
            {data.description}
          </p>
        </CardHeader>
        <CardContent className={"flex justify-start items-center mx-5"}>
          {data.buttonText ? (
            <Button
              size={"section"}
              variant={"secondary"}
              className={"text-lg"}
            >
              {data.buttonText}
            </Button>
          ) : null}
        </CardContent>
      </Card>
    );
  });
}
