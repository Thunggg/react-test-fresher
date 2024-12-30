import { createContext, useContext, useState } from "react";

interface IAppContext {
    isAuthenticated: boolean;
    user: IUser | null;
    setIsAuthenticated: (v: boolean) => void;
    setUser: (v: IUser) => void;
    isAppLoading: boolean;
    setIsAppLoading: (v: boolean) => void;
}

const CurrentAppContext = createContext<IAppContext | null>(null);

type IProps = {
    children: React.ReactNode
}

export const AppProvider = (props: IProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | null>(null);
    const [isAppLoading, setIsAppLoading] = useState<boolean>(true);


    return (
        <CurrentAppContext.Provider value={{
            isAuthenticated, user, setIsAuthenticated, setUser, isAppLoading, setIsAppLoading
        }
        }>
            {props.children}
        </CurrentAppContext.Provider>
    );
};

export const useCurrentApp = () => {
    const currentUserContext = useContext(CurrentAppContext);

    if (!currentUserContext) {
        throw new Error(
            "useCurrentUser has to be used within <CurrentUserContext.Provider>"
        );
    }

    return currentUserContext;
};