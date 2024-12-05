"use client";

import React, { useEffect, useState } from "react";
import ParentCats from "@/components/parent/ParentCats";
import { ParentCatsType } from "@/types/types";
import apiClient from "@/lib/axios";

const ParentCatsPage = () => {
  const [parentCats, setParentCats] = useState<ParentCatsType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParentCats = async () => {
      try {
        const response = await apiClient.get<ParentCatsType[]>("/parent");
        setParentCats(response.data);
      } catch (error) {
        console.error("親猫データの取得に失敗しました:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParentCats();
  }, []);

  if (loading) {
    return <p>読み込み中...</p>;
  }

  return <ParentCats parentCats={parentCats} />;
};

export default ParentCatsPage;