import { ICurso, ICursoRanking, ICursoModalidade } from "./models/interfaces/ICurso.js";
import { IIes, IIesRanking } from "./models/interfaces/IIes.js";
import { IMatricula, ITotalMatriculadosAno } from "./models/interfaces/IMatricula.js";
import { IGetRankingIesParamsCategoriaAdministrativa } from "./repositories/interfaces/IIesRepository.js";

/**
 * Common API responses
 */
export interface DefaultErrorResponse {
  error: string;
}

export interface DefaultPaginationQuery {
  limit?: number;
  orderBy?: string;
}

/**
 * API Contracts: Cursos
 */
export namespace ApiCursos {
  /**
   * Endpoint: GET /api/cursos
   */
  export namespace GetAll {
    export type Query = DefaultPaginationQuery;
    export type Response = ICurso[] | DefaultErrorResponse;
  }

  /**
   * Endpoint: GET /api/cursos/ranking
   */
  export namespace GetRanking {
    export interface Query {
      limit?: number;
      modalidade?: ICursoModalidade;
      ano?: number;
    }
    export type Response = ICursoRanking[] | DefaultErrorResponse;
  }

  /**
   * Endpoint: GET /api/cursos/:id
   */
  export namespace GetById {
    export interface Params {
      id: string | number;
    }
    export type Response = ICurso | DefaultErrorResponse;
  }
}

/**
 * API Contracts: Instituições de Ensino Superior (IES)
 */
export namespace ApiIes {
  /**
   * Endpoint: GET /api/ies
   */
  export namespace GetAll {
    export type Query = DefaultPaginationQuery;
    export type Response = IIes[] | DefaultErrorResponse;
  }

  /**
   * Endpoint: GET /api/ies/ranking
   */
  export namespace GetRanking {
    export interface Query {
      limit?: number;
      modalidade?: string;
      categoria_administrativa?: IGetRankingIesParamsCategoriaAdministrativa;
      ano?: number;
    }
    export type Response = IIesRanking[] | DefaultErrorResponse;
  }

  /**
   * Endpoint: GET /api/ies/:id
   */
  export namespace GetById {
    export interface Params {
      id: string | number;
    }
    export type Response = IIes | DefaultErrorResponse;
  }
}

/**
 * API Contracts: Matrículas
 */
export namespace ApiMatriculas {
  /**
   * Endpoint: GET /api/matriculas
   */
  export namespace GetAll {
    export type Query = DefaultPaginationQuery;
    export type Response = IMatricula[] | DefaultErrorResponse;
  }

  /**
   * Endpoint: GET /api/matriculas/total-por-ano
   */
  export namespace GetTotalPorAno {
    export interface Query {
      modalidade?: string;
    }
    export type Response = ITotalMatriculadosAno[] | DefaultErrorResponse;
  }

  /**
   * Endpoint: GET /api/matriculas/:id
   */
  export namespace GetById {
    export interface Params {
      id: string | number;
    }
    export type Response = IMatricula | DefaultErrorResponse;
  }
}
