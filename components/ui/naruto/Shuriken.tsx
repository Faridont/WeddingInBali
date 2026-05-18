import { FumaShurikenIcon } from "./FumaShurikenIcon";

/** Четырёхконечный сюрикен (four_point_shuriken.svg). */
export function Shuriken({
  className = "",
  size = 24,
  spin = true,
}: {
  className?: string;
  size?: number;
  spin?: boolean;
}) {
  return (
    <FumaShurikenIcon className={className} size={size} spin={spin} />
  );
}
