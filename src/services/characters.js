import api from "./apiConfig.js";

export const getCharacters = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCharacter = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCharacter = async (characterData) => {
  try {
    const response = await api.post("/", characterData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCharacter = async (id, characterData) => {
  try {
    const response = await api.put(`/${id}`, characterData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCharacter = async (id) => {
  try {
    const response = await api.delete(`${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
