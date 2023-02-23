import React, { type FC } from "react";

import { Footer } from "@/shared/components/layout/footer";
import { Popup } from "@/shared/components/popup";
import { useLayoutData } from "@/shared/components/layout/layout/utils";
import type { HasChildren } from "@/shared/types/props";

import { Main } from "../main";
import { Navbar } from "../navbar";
import { Header } from "../header";

import { LayoutStyled } from "./style";

export const Layout: FC<HasChildren> = ({ children }) => {
    const { popup, resetPopup } = useLayoutData();

    return (
        <LayoutStyled>
            <Header />
            <Navbar />
            <Main>
                {children}
            </Main>
            <Footer />

            {popup && (
                <Popup onClose={resetPopup} {...popup} />
            )}
        </LayoutStyled>
    );
};
