import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TFighterRecord = {
  wins: number;
  losses: number;
};
export type TFighter = {
  name: string;
  record?: TFighterRecord;
  id: string;
};
