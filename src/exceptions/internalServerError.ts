import { IException } from "./interfaces/IException.js";

export const internalServerError: IException = {
  status: 500,
  message: "Ocorreu um erro interno no servidor."
};