// @flow
import * as React from "react";
import { StarFilledIcon } from "@radix-ui/react-icons";

type Props = {
  amountOfRatings: number;
  ratings: number;
};

export function Ratings({ amountOfRatings, ratings }: Props) {
  const ratingButtons = [];
  for (let i = 0; i < amountOfRatings; i++) {
    console.log(i);
    console.log(ratings);
    console.log(i < ratings);
    ratingButtons.push(
      <div
        key={i}
        className="rounded-full border border-sgrey-15 bg-sgrey-10 mr-2"
      >
        <StarFilledIcon
          className={
            i < ratings ? "text-yellow-300 size-6 m-2.5" : " size-6 m-3"
          }
        />
      </div>,
    );
  }
  return <div className={"flex items-stretch py-6"}>{ratingButtons}</div>;
}
