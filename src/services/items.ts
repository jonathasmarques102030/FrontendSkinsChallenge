import { api } from "./api";

export async function takeItems() {
  try {
    const response = await api.get("/items");

    if (response.status !== 200) {
      throw new Error("Falha ao buscar unidades.");
    }

    return response.data
  } catch (error) {
    console.error("Erro ao buscar os items: ", error);
    throw new Error("Falha ao buscar os items!");
  }
}
