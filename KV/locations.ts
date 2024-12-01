export type areas = "Regional" | "International";

export type building = {
  type: "Main Headquarters" | "Regional Office" | "Branch Office";
  address: string;
  phone?: string;
  email?: string;
  cityType: "Metropolis" | "Suburban" | "Rural";
  description: string;
};
export const companyPhone = "+1 (123) 456-7890";
export const companyEmail = "info@estatein.com";

export const locations: Map<areas, building[]> = new Map([
  [
    "International",
    [
      {
        type: "Main Headquarters",
        address: "123 Estatein Plaza, City Center, Metropolis",
        cityType: "Metropolis",
        description:
          "Our main headquarters serve as the heart of Estatein. Located in the bustling city center, this is where our core team of experts operates, driving the excellence and innovation that define us.",
      },
      {
        type: "Branch Office",
        address: "456 Urban Avenue, Downtown District, Metropolis",
        cityType: "Metropolis",
        description:
          "Estatein's presence extends to multiple regions, each with its own dynamic real estate landscape. Discover our regional offices, staffed by local experts who understand the nuances of their respective markets.",
      },
    ],
  ],
  [
    "Regional",
    [
      {
        type: "Regional Office",
        address: "789 Suburban Street, Green Valley, Suburban",
        cityType: "Suburban",
        description:
          "Estatein's presence extends to multiple regions, each with its own dynamic real estate landscape. Discover our regional offices, staffed by local experts who understand the nuances of their respective markets.",
      },
      {
        type: "Regional Office",
        address: "012 Rural Road, Serene Fields, Rural",
        cityType: "Rural",
        description:
          "Estatein's presence extends to multiple regions, each with its own dynamic real estate landscape. Discover our regional offices, staffed by local experts who understand the nuances of their respective markets.",
      },
    ],
  ],
]);
