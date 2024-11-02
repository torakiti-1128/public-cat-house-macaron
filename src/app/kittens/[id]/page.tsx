'use client';
// import { fetchKittenDetail, fetchKittenMediaUrls } from "@/api/kitten/detail";
// import { KittenDetailType, KittenMediaType } from "@/types/kitten";
// import React, { useEffect, useState } from "react";

interface Params {
    id: string; // ここでparamsの型を定義
  }

export default function KittenDetailPage({ params }: { params: Params }){
    // const [kittens, setKittens] = useState<KittenDetailType | null>(null);
    // const [kittensMedia, setKittensMedia] = useState<KittenMediaType[] | null>(null);
    // const kittenId = parseInt(params.id, 10);

    // useEffect(() => {
    //     const fetchKittens = async () => {
    //         try {
    //             const data: KittenDetailType | null = await fetchKittenDetail(kittenId);
    //             setKittens(data);
    //         } 
    //         catch (err) {
    //             console.log(err);
    //         } 
    //     };

    //     fetchKittens();
    // }, [kittenId]);

    // useEffect(() => {
    //     const fetchKittensMedia = async () => {
    //         try {
    //             const data: KittenMediaType[] | null = await fetchKittenMediaUrls(kittenId);
    //             setKittensMedia(data);
    //         } 
    //         catch (err) {
    //             console.log(err);
    //         } 
    //     };

    //     fetchKittensMedia();
    // }, [kittenId]);

    return(
        <></>
    )
}