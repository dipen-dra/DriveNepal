import { createFileRoute } from "@tanstack/react-router";
import { CatalogPage } from "@/components/CatalogPage";

export const Route = createFileRoute("/bikes")({
  head: () => ({ meta: [
    { title: "Rent a Bike in Nepal — DriveNepal" },
    { name: "description", content: "Adventure, sports, cruiser, and scooter rentals across Nepal." },
  ] }),
  component: () => <CatalogPage type="bike" title="Rent a Bike" subtitle="Conquer the Himalayas or weave the city — your ride awaits." />,
});
