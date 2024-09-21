import { RenderOptions, render } from "@testing-library/react-native";
import { ReactElement } from "react";
import { NavigationContainer } from "@react-navigation/native";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => (
  <NavigationContainer>{children}</NavigationContainer>
);

const customRender = (component: ReactElement, options?: RenderOptions) =>
  render(component, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react-native";
export { customRender as render };
