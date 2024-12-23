"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";

const HeaderWrapper = () => {
    const pathname = usePathname();
    const hideHeaderPaths = ["/login", "/signup"];

    if (hideHeaderPaths.includes(pathname)) return null;

    return <Header />;
};

export default HeaderWrapper;
