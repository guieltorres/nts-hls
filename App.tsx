import Routes from "./src/routes";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform, SafeAreaView as RNSafeArea } from "react-native";
import store from "./src/state/store";
import { Provider as ReduxProvider } from "react-redux";

const SafeArea = Platform.OS !== "android" ? RNSafeArea : SafeAreaView;

export default function App() {
  return (
    <SafeArea
      style={{
        flex: 1,
      }}
    >
      <ReduxProvider store={store}>
        <Routes />
      </ReduxProvider>
    </SafeArea>
  );
}
