// @flow
import * as React from "react";
import { StarIcon } from "@heroicons/react/24/solid";

type Props = {
  amountOfRatings: number;
  ratings: number;
};

export function Ratings({ amountOfRatings, ratings }: Props) {
  const ratingButtons = [];
  for (let i = 0; i < amountOfRatings; i++) {
    ratingButtons.push(
      <div
        key={i}
        className="rounded-full border border-sgrey-15 bg-sgrey-10 mr-2"
      >
        <StarIcon
          className={
            i < ratings
              ? "text-yellow-300 size-6 laptop:size-6 m-1  laptop:m-2.5"
              : " size-6 m-2.5"
          }
        />
      </div>,
    );
  }
  return <div className={"flex mb-3 laptop:mb-7"}>{ratingButtons}</div>;
}
