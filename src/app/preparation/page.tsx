'use client';
import React from "react";
import { Access } from "@/components/Layout/Access";
import { CheckPoints } from "@/components/Layout/CheckPoints";
import { Footer } from "@/components/Layout/Footer";
import { Header } from "@/components/Layout/Heder";
import { Preparation } from "@/components/Preparation";

//子猫を迎えるための準備品
export default function PreparationPage(){
    return(
        <>
        <Header />
        <Preparation />
        <CheckPoints />
        <Access />
        <Footer />
        </>
    )  
}
