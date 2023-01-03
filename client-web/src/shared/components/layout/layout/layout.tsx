import React from "react";

import { ErrorBoundary } from "@/shared/components/error-boundary";
import { Footer } from "@/shared/components/layout/footer";
import type { HasChildren } from "@/shared/types/props";

import { Main } from "../main";
import { Navbar } from "../navbar";
import { Header } from "../header";

import { LayoutStyled } from "./style";

export type LayoutProps = HasChildren;

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
