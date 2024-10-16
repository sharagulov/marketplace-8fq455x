import Cards from "./Cards";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function MainBlocks() {
  return (
    <div className="w-[90%] md:w-[80%] max-w-[1000px] flex flex-col gap-3  mt-[100px]">
      <Cards />
    </div>
  )
}