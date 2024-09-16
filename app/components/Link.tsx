import React from "react";
import NextLink from "next/link";
import { Link as RadLink } from "@radix-ui/themes";

interface Props {
  href: string;
  children: string;
}
const Link = ({ href, children }: Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadLink>{children}</RadLink>
    </NextLink>
  );
};

export default Link;
