import { IException } from "./interfaces/IException.js";

export const notFound: IException = {
  status: 404,
  message: "Não foi possível encontrar o recurso solicitado",
};