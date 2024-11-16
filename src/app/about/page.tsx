'use client';
import { About } from "@/components/About";
import { Footer } from "@/components/Layout/Footer";
import { Header } from "@/components/Layout/Heder";
import React from "react";

export default function AboutPage(){
    return(
        <>
        <Header />
        <About />
        <Footer />
        </>
    )  
}
