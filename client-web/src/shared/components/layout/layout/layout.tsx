import React, { type FC } from "react";

import { Footer } from "@/shared/components/layout/footer";
import { Notification } from "@/shared/components/notification";
import { useLayoutData } from "@/shared/components/layout/layout/utils";
import type { HasChildren } from "@/shared/types/props";

import { Main } from "../main";
import { Navbar } from "../navbar";
import { Header } from "../header";

import { LayoutStyled } from "./style";

export const Layout: FC<HasChildren> = ({ children }) => {
    const { notification, resetNotification } = useLayoutData();

    return (
        <LayoutStyled>
            <Header />
            <Navbar />
            <Main>
                {children}
            </Main>
            <Footer />

            {notification && (
                <Notification
                    onClose={resetNotification}
                    {...notification}
                />
            )}
        </LayoutStyled>
    );
};
