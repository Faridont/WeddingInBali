import { FumaShurikenIcon } from "./FumaShurikenIcon";

/** Декор на сайте — четырёхконечный сюрикен (four_point_shuriken.svg). */
export function Kunai({
  className = "",
  size = 32,
  flip = false,
  spin = false,
}: {
  className?: string;
  size?: number;
  flip?: boolean;
  spin?: boolean;
}) {
  return (
    <FumaShurikenIcon
      className={className}
      size={size}
      flip={flip}
      spin={spin}
    />
  );
}
