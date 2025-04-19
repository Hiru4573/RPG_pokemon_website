"use client";

import Pkmn from "public/data/pkmn.json"; 
import { useState, useEffect } from "react";

const API_URL = process.env.API_URL;
const URL_KEY = process.env.URL_KEY;

export default function Home() {

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_URL}/api/PKMN/get`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${URL_KEY}`,
          },
        });

        const data = await response;
        console.log(`${API_URL}/api/PKMN/get`);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="flex items-center justify-center">
      <button className="text-white capitalize bg-red-900 hover:bg-red-800 w-full cursor-pointer" onClick={()=>window.location.href = `/`}>retornar</button>
      <div>
      </div>
    </main>
  );
}