"use client";

import { ChakraProvider } from "@chakra-ui/react";
import NodeLayout from "./NodeLayout";
export default function Providers({ children }) {
  return (
    <ChakraProvider>
      <NodeLayout>{children}</NodeLayout>
    </ChakraProvider>
  );
}
