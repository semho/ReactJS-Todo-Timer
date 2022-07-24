declare module '*.svg' {
  import { ReactElement, SVGProps } from "react";
  const content: (props: SVGProps<SVGElement>) => ReactElement;
  const src: string;
  export default src;
}
