// it will import all providers -- and from here we will exporot one providder -- that will wrap app component -- and in future if we need to add more or remove provider we can come to this file and add / remove instead of chaning the root file

import { AuthProvider } from "./AuthProvider";

export function AppProviders({ children }) {
    return(
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}