import { Kunai } from "./Kunai";

/** Кунаи по углам секции — декор в духе ниндзя. */
export function NarutoCorners() {
  return (
    <>
      <span className="kunai-corner left-3 top-3 inline-block rotate-[-35deg]">
        <Kunai spin size={36} />
      </span>
      <span className="kunai-corner right-3 top-3 inline-block rotate-[35deg]">
        <Kunai spin flip size={36} />
      </span>
      <span className="kunai-corner bottom-3 left-3 inline-block rotate-[145deg]">
        <Kunai spin size={32} />
      </span>
      <span className="kunai-corner bottom-3 right-3 inline-block rotate-[-145deg]">
        <Kunai spin flip size={32} />
      </span>
    </>
  );
}
