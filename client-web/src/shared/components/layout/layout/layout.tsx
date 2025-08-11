import React, { type FC, type PropsWithChildren } from "react";

import { Main } from "../main";
import { Navbar } from "../navbar";
import { Header } from "../header";

import { LayoutStyled } from "./style";

import { useLayoutData } from "@/shared/components/layout/layout/utils";
import { Snackbar } from "@/shared/components/snackbar";
import { Footer } from "@/shared/components/layout/footer";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
    const { snackbar, resetSnackbar } = useLayoutData();

    return (
        <LayoutStyled>
            <Header />
            <Navbar />
            <Main>
                {children}
            </Main>
            <Footer />

            {snackbar && (
                <Snackbar
                    onClose={resetSnackbar}
                    {...snackbar}
                />
            )}
        </LayoutStyled>
    );
};
