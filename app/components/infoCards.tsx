// @flow
import * as React from "react";

type Props = {
  text: string;
  icon: React.ReactNode;
};

export function InfoCards(props: Props) {
  return (
    <div
      className={
        "w-1/4 h-5/6 bg-sgrey-10 border-sgrey-15 border pt-4 rounded-2xl"
      }
    >
      <div className={"flex flex-nowrap justify-center items-center h-3/5"}>
        <div className={" basis-1/4 h-full mx-auto"}>
          <div
            className={
              "size-full text-pprimary-75  bg-gradient-to-tr from-pprimary-75 from-0% via-transparent via-30% rounded-full"
            }
          >
            <div
              className={
                "flex size-full text-pprimary-75  bg-gradient-to-bl from-pprimary-75 from-0% via-transparent via-50% rounded-full"
              }
            >
              <div
                className={"rounded-full bg-sgrey-10 mx-auto flex items-center"}
                style={{
                  flexBasis: "96%",
                  marginTop: "1%",
                  marginBottom: "1%",
                }}
              >
                <div
                  className={
                    "h-3/4 basis-3/4 mx-auto text-pprimary-75  bg-gradient-to-br from-pprimary-75 from-0% via-transparent via-30% rounded-full"
                  }
                >
                  <div
                    className={
                      "flex size-full text-pprimary-75  bg-gradient-to-tl from-pprimary-75 from-0% via-transparent via-50% rounded-full"
                    }
                  >
                    <div
                      className={"rounded-full size-full bg-sgrey-10 mx-auto"}
                      style={{
                        flexBasis: "96%",
                      }}
                    ></div>
                  </div>
                </div>
                {/*props.icon*/}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={"flex justify-center items-center h-2/5"}>
        <div className={"text-lg"}>{props.text}</div>
      </div>
    </div>
  );
}
