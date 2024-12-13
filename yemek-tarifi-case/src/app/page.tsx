"use client";
import Image from "next/image";
import Header from "./components/Header";
import Recipes from "./components/Recipes";

export default function Home() {
  return (
    <div className="text-2xl text-white">
      <Header />
      <div className="pt-20">
        <Recipes />
      </div>
    </div>
  );
}

