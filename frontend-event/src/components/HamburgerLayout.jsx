import React from "react";
import { Outlet } from "react-router-dom";
import HamburgerMenu from "../components/HamburgerMenu";

const HamburgerLayout = () => {
    return (
        <div className="min-h-screen bg-DarkPurple flex flex-col">
            <HamburgerMenu />
            <main className="flex-grow flex flex-col items-center">
                <Outlet /> {/* Renders the child routes */}
            </main>
        </div>
    );
};

export default HamburgerLayout;
