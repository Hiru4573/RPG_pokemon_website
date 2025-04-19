import Pkmn from "public/data/pkmn.json";
import attacks from "public/data/attacks.json";

export async function GET(req) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // Extract the Pokémon ID from the URL
  
  const API_URL = process.env.API_URL;
  const URL_KEY = process.env.URL_KEY;

  try {
    const response = await fetch(`${API_URL}/api/PKMN/get`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${URL_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    // Enrich the fetched data
    const enrichedResults = result.map((item) => {
      const matchingPkmn = Pkmn.find((pkmn) => pkmn.id === item.id_dex);
      return {
        ...item,
        pkmnDetails: matchingPkmn || null,
      };
    });

    const enrichedWithAttacks = enrichedResults.map((item) => {
      const resolvedAttacks = item.attacks.map((attackId) => {
        const matchingAttack = attacks.find((attack) => attack.id === attackId);
        return matchingAttack || null; // Replace with the attack object or null if not found
      });
      return {
        ...item,
        attacks: resolvedAttacks,
      };
    });

    return new Response(JSON.stringify(enrichedWithAttacks), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}