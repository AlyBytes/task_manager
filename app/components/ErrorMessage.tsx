import { Text } from "@radix-ui/themes";
import React, { PropsWithChildren, ReactNode } from "react";

// interface Props{    --------> we don't need this anymore because we implicitly can define PropsWithChildren
//     children:ReactNode
// }

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <Text color="red" as="p">
      {children}
    </Text>
  );
};

export default ErrorMessage;
