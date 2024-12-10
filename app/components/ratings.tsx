// @flow
import * as React from "react";
import { StarIcon } from "@heroicons/react/24/solid";

interface Props {
  amountOfRatings: number;
  ratings: number;
}

export function Ratings({ amountOfRatings, ratings }: Props) {
  const ratingButtons = [];
  for (let i = 0; i < amountOfRatings; i++) {
    ratingButtons.push(
      <div
        key={i}
        className="mr-2 rounded-full border border-sgrey-15 bg-sgrey-10"
      >
        <StarIcon
          className={
            i < ratings
              ? "m-1 size-6 text-yellow-300 laptop:m-2.5  laptop:size-6"
              : " m-2.5 size-6"
          }
        />
      </div>,
    );
  }
  return <div className={"mb-3 flex laptop:mb-7"}>{ratingButtons}</div>;
}
