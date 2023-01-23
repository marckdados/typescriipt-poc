import { QueryResult } from "pg";
import { CreateAvatar, Id, UpdateAvatar } from "../protocols.js";
import {
  deleteAvatar,
  postAvatar,
  putAvatar,
  searchIdAvatar,
} from "../repositores/avatar.repositore.js";

export async function createAvatarRules(avatar: CreateAvatar) {
  const { name, age, superPower, idCategory } = avatar;
  try {
    await postAvatar(name, age, superPower, idCategory);
    return;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updateAvatarRules(id: Id, avatar: UpdateAvatar) {
  const { name, age, superPower, idCategory } = avatar;
  try {
    const idExists = await searchIdAvatar(id);
    if (idExists.rowCount === 0) return new Error("Avatar não encontrado !");
    return await putAvatar(id, name, age, superPower, idCategory);
  } catch (error) {
    return error;
  }
}

export async function deleteAvatarRules(id: Id): Promise<QueryResult<Id>> {
  try {
    const idExists = await searchIdAvatar(id);
    console.log(idExists.rowCount);
    if (idExists.rowCount === 0) {
      throw new Error("Avatar não encontrado !");
    }
    return await deleteAvatar(id);
  } catch (error) {
    return error;
  }
}
