const mockDelay = (ms) => new Promise((res) => setTimeout(res, ms));

export function createMockMatriculasRepository() {
  return {
    async getEnrollmentsByYear(modalidade) {
      await mockDelay(400);
      const base = {
        ead: [
          { ano: 2019, total: 1_230_000 },
          { ano: 2020, total: 1_750_000 },
          { ano: 2021, total: 2_100_000 },
          { ano: 2022, total: 2_480_000 },
          { ano: 2023, total: 2_870_000 },
        ],
        presencial: [
          { ano: 2019, total: 5_200_000 },
          { ano: 2020, total: 4_900_000 },
          { ano: 2021, total: 4_700_000 },
          { ano: 2022, total: 5_100_000 },
          { ano: 2023, total: 5_400_000 },
        ],
        todos: [
          { ano: 2019, total: 6_430_000 },
          { ano: 2020, total: 6_650_000 },
          { ano: 2021, total: 6_800_000 },
          { ano: 2022, total: 7_580_000 },
          { ano: 2023, total: 8_270_000 },
        ],
      };
      return base[modalidade] ?? base.todos;
    },

    async getCourseRanking(modalidade) {
      await mockDelay(400);
      const data = {
        ead: [
          { curso: "Administração", alunos: 620_000 },
          { curso: "Pedagogia", alunos: 480_000 },
          { curso: "Direito", alunos: 350_000 },
          { curso: "Serviço Social", alunos: 280_000 },
          { curso: "Ciências Contábeis", alunos: 240_000 },
          { curso: "Gestão de RH", alunos: 190_000 },
          { curso: "Tecnologia em TI", alunos: 175_000 },
          { curso: "Marketing", alunos: 160_000 },
          { curso: "Logística", alunos: 140_000 },
          { curso: "Psicologia", alunos: 105_000 },
        ],
        presencial: [
          { curso: "Direito", alunos: 890_000 },
          { curso: "Administração", alunos: 760_000 },
          { curso: "Engenharia Civil", alunos: 480_000 },
          { curso: "Medicina", alunos: 440_000 },
          { curso: "Ciências Contábeis", alunos: 380_000 },
          { curso: "Enfermagem", alunos: 340_000 },
          { curso: "Psicologia", alunos: 310_000 },
          { curso: "Engenharia de Produção", alunos: 280_000 },
          { curso: "Arquitetura", alunos: 210_000 },
          { curso: "Biomedicina", alunos: 185_000 },
        ],
      };
      return data[modalidade] ?? data.presencial;
    },

    async getIESRanking(filters) {
      await mockDelay(400);
      const all = [
        { ies: "UNIP", tipo: "privada", modalidade: "ead", alunos: 380_000 },
        {
          ies: "Anhanguera",
          tipo: "privada",
          modalidade: "ead",
          alunos: 290_000,
        },
        { ies: "UNOPAR", tipo: "privada", modalidade: "ead", alunos: 260_000 },
        {
          ies: "USP",
          tipo: "publica",
          modalidade: "presencial",
          alunos: 100_000,
        },
        {
          ies: "UNICAMP",
          tipo: "publica",
          modalidade: "presencial",
          alunos: 35_000,
        },
        {
          ies: "UFRJ",
          tipo: "publica",
          modalidade: "presencial",
          alunos: 50_000,
        },
        {
          ies: "Kroton",
          tipo: "privada",
          modalidade: "presencial",
          alunos: 210_000,
        },
        { ies: "Estácio", tipo: "privada", modalidade: "ead", alunos: 195_000 },
        {
          ies: "UNESP",
          tipo: "publica",
          modalidade: "presencial",
          alunos: 45_000,
        },
        {
          ies: "Pitágoras",
          tipo: "privada",
          modalidade: "ead",
          alunos: 170_000,
        },
        {
          ies: "UFMG",
          tipo: "publica",
          modalidade: "presencial",
          alunos: 48_000,
        },
        {
          ies: "Mackenzie",
          tipo: "privada",
          modalidade: "presencial",
          alunos: 55_000,
        },
      ];
      return all.filter((d) => {
        if (filters.tipo !== "todos" && d.tipo !== filters.tipo) return false;
        if (
          filters.modalidade !== "todos" &&
          d.modalidade !== filters.modalidade
        )
          return false;
        return true;
      });
    },
  };
}
