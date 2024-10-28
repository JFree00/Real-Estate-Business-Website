import { title } from "@/config.shared";
import type { MetaFunction } from "@remix-run/cloudflare";

import homeBuildings from "@/assets/homeBuildings.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
export const meta: MetaFunction = () => {
  return [
    { title: title() },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <main>
      <div className={"grid grid-cols-12"}>
        <div className={"col-span-5 col-start-2"}>
          <div
            className={" w-10/12 grid grid-cols-6 grid-rows-4 mt-36 gap-x-4"}
          >
            <div
              className={"font-semibold text-balance max-w-prose col-span-6"}
            >
              <p className={"text-6xl"}>
                Discover You Dream Property with Estatein
              </p>
            </div>
            <h5 className={"col-span-6 self-center text-sgrey-60"}>
              Your journey to finding the perfect property begins here. Explore
              our listings to find the home that matches your dreams.
            </h5>
            <div className={"col-span-6 flex gap-x-3 items-center"}>
              <div className={"basis-1/5"}>
                <Button variant={"active"} className={"px-7 h-14"}>
                  Learn More
                </Button>
              </div>
              <div className={"basis-3/4"}>
                <Button
                  variant={"default"}
                  className={"h-14 bg-pprimary-60 px-7"}
                >
                  Browse Properties
                </Button>
              </div>
            </div>
            <div className={"col-span-2"}>
              <Card>
                <CardHeader>
                  <CardTitle>200+</CardTitle>
                </CardHeader>
                <CardFooter>Happy Customers</CardFooter>
              </Card>
            </div>
            <div className={"col-span-2"}>
              <Card>
                <CardHeader>
                  <CardTitle>10k+</CardTitle>
                </CardHeader>
                <CardFooter>Properties For Clients</CardFooter>
              </Card>
            </div>
            <div className={"col-span-2"}>
              <Card>
                <CardHeader>
                  <CardTitle>16+</CardTitle>
                </CardHeader>
                <CardFooter>Years Of Experience</CardFooter>
              </Card>
            </div>
          </div>
        </div>
        <div className={"col-span-6"}>
          <img src={homeBuildings} alt={"Real Estate"} width={"100%"} />
        </div>
      </div>
    </main>
  );
}
