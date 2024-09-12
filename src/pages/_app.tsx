import "@/styles/globals.css";
import { ChakraBaseProvider, theme } from "@chakra-ui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraBaseProvider theme={theme}>
      <Component {...pageProps} />;
    </ChakraBaseProvider>
  );
}
