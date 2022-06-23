import { MantineProvider } from "@mantine/core";
import { store } from "../slicer/store"
import { Provider } from "react-redux";
import persistStore from "redux-persist/lib/persistStore";

export const AppProviders = ({ children }: any) => {

    let persistor = persistStore(store);
    return (
        <Provider store={store}>
            <MantineProvider
                theme={{ fontFamily: "Open Sans" }}
                withGlobalStyles
                withNormalizeCSS
            >
                {children}
            </MantineProvider>
        </Provider>
    );
}
