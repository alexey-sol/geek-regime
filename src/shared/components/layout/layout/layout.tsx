import "@/shared/style/style.scss";
import React, { ReactNode } from "react";
import { ErrorBoundary } from "@/shared/components/error-boundary";
import { Footer } from "@/shared/components/layout/footer";
import { Main } from "../main";
import { Navbar } from "../navbar";
import { Header } from "../header";
import { LayoutStyled } from "./layout.style";

export type LayoutProps = {
    children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => (
    <LayoutStyled>
        <Header />
        <Navbar />
        <Main>
            <ErrorBoundary>
                {children}
            </ErrorBoundary>
        </Main>
        <Footer />
    </LayoutStyled>
);
