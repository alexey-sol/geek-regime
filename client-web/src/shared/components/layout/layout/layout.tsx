import React from "react";

import { ErrorBoundary } from "@/shared/components/error-boundary";
import { Footer } from "@/shared/components/layout/footer";
import { Popup } from "@/shared/components/popup";
import { useLayoutData } from "@/shared/components/layout/layout/utils";
import type { HasChildren } from "@/shared/types/props";

import { Main } from "../main";
import { Navbar } from "../navbar";
import { Header } from "../header";

import { LayoutStyled } from "./style";

export const Layout = ({ children }: HasChildren) => {
    const { popup, resetPopup } = useLayoutData();

    return (
        <LayoutStyled>
            <Header />
            <Navbar />
            <Main>
                <ErrorBoundary>
                    {children}
                </ErrorBoundary>
            </Main>
            <Footer />

            {popup && <Popup {...popup} onClose={resetPopup} />}
        </LayoutStyled>
    );
};
