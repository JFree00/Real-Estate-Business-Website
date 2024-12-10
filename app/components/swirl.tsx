// @flow
import * as React from "react";
import { cn } from "@/lib/styles";
type Props = React.HTMLAttributes<HTMLDivElement> & {
  size?: string;
};

export function Swirl({ children, className, size }: Props) {
  return (
    <div className={cn("size-12 laptop:size-20", size)}>
      <div
        className={
          "size-full rounded-full  bg-gradient-to-tr from-pprimary-75 from-0% via-transparent via-30% text-pprimary-75"
        }
      >
        <div
          className={
            "flex size-full rounded-full  bg-gradient-to-bl from-pprimary-75 from-0% via-transparent via-50% text-pprimary-75"
          }
        >
          <div
            className={cn("rounded-full mx-auto flex items-center", className)}
            style={{
              flexBasis: "94%",
              marginTop: "1%",
              marginBottom: "2%",
            }}
          >
            <div
              className={
                "mx-auto h-3/4 basis-3/4 rounded-full  bg-gradient-to-br from-pprimary-75 from-0% via-transparent via-30% text-pprimary-75"
              }
            >
              <div
                className={
                  "flex size-full rounded-full  bg-gradient-to-tl from-pprimary-75 from-0% via-transparent via-50% text-pprimary-75"
                }
              >
                <div
                  className={cn(
                    "flex justify-center items-center rounded-full mx-auto my-px",
                    className,
                  )}
                  style={{
                    flexBasis: "96%",
                  }}
                >
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
