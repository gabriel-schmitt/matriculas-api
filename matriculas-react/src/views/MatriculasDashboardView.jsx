"use client";

import { Card } from "../components/card";
import { SectionHeader } from "../components/sectionHeader";
import { FilterPill } from "../components/filterPill";
import { EnrollmentChart } from "../components/EnrollmentChart";
import { CourseRanking } from "../components/CourseRanking";
import { IESRanking } from "../components/IESRanking";
import { useMatriculasDashboard } from "../hooks/useMatriculasDashboard";

export function MatriculasDashboardView() {
  const { state, actions } = useMatriculasDashboard();

  const modalidadeOpts = [
    { value: "todos", label: "Todos" },
    { value: "presencial", label: "Presencial" },
    { value: "ead", label: "EAD" },
  ];

  const tipoOpts = [
    { value: "todos", label: "Todas" },
    { value: "publica", label: "Pública" },
    { value: "privada", label: "Privada" },
  ];

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "1.5rem 1rem",
        fontFamily: "var(--font-sans)",
      }}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .dashboard-rankings {
          grid-column: 1 / -1;
          display: grid;
          gap: 1.75rem;
          align-items: start;
        }
        .dashboard-rankings .dashboard-ranking-pane {
          min-width: 0;
        }
        @media (min-width: 768px) {
          .dashboard-rankings {
            grid-template-columns: 1fr 1fr;
            gap: 0 2rem;
          }
          .dashboard-rankings .dashboard-ranking-pane:first-child {
            position: relative;
            padding-right: 1rem;
          }
          .dashboard-rankings .dashboard-ranking-pane:first-child::after {
            content: "";
            position: absolute;
            top: 0.35rem;
            bottom: 0.35rem;
            right: 0;
            width: 1px;
            background: var(--color-border-tertiary, rgba(0, 0, 0, 0.12));
          }
          @media (prefers-color-scheme: dark) {
            .dashboard-rankings .dashboard-ranking-pane:first-child::after {
              background: var(--color-border-tertiary, rgba(255, 255, 255, 0.12));
            }
          }
        }
        @media (max-width: 767px) {
          .dashboard-rankings .dashboard-ranking-pane + .dashboard-ranking-pane {
            border-top: 1px solid var(--color-border-tertiary, rgba(0, 0, 0, 0.12));
            padding-top: 1.75rem;
            margin-top: 0.25rem;
          }
          @media (prefers-color-scheme: dark) {
            .dashboard-rankings .dashboard-ranking-pane + .dashboard-ranking-pane {
              border-top-color: var(--color-border-tertiary, rgba(255, 255, 255, 0.12));
            }
          }
        }
      `}</style>

      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: 22, fontWeight: 500, margin: "0 0 6px" }}>
          Matrículas no ensino superior
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            color: "var(--color-text-secondary)",
          }}
        >
          Dados de matrículas por ano, cursos e instituições — Brasil
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(0, 1fr))",
          gap: "1rem",
        }}
      >
        <Card style={{ gridColumn: "1 / -1" }}>
          <SectionHeader title="Matrículas por ano">
            <FilterPill
              options={modalidadeOpts}
              value={state.enrollFilter}
              onChange={actions.setEnrollFilter}
            />
          </SectionHeader>
          <EnrollmentChart
            data={state.enrollData}
            loading={state.loadingEnroll}
          />
        </Card>

        <div
          className="dashboard-rankings"
          aria-label="Rankings de cursos e IES"
        >
          <div className="dashboard-ranking-pane">
            <Card>
              <SectionHeader title="Ranking de cursos">
                <FilterPill
                  options={modalidadeOpts.filter((o) => o.value !== "todos")}
                  value={state.courseFilter}
                  onChange={actions.setCourseFilter}
                />
              </SectionHeader>
              <CourseRanking
                data={state.courseData}
                loading={state.loadingCourse}
              />
            </Card>
          </div>
          <div className="dashboard-ranking-pane">
            <Card>
              <SectionHeader title="Ranking de IES">
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  <FilterPill
                    options={tipoOpts}
                    value={state.iesTipo}
                    onChange={actions.setIesTipo}
                  />
                  <FilterPill
                    options={modalidadeOpts}
                    value={state.iesModalidade}
                    onChange={actions.setIesModalidade}
                  />
                </div>
              </SectionHeader>
              <IESRanking data={state.iesData} loading={state.loadingIES} />
            </Card>
          </div>
        </div>
      </div>

      <p
        style={{
          fontSize: 12,
          color: "var(--color-text-tertiary)",
          textAlign: "center",
          marginTop: "1.5rem",
        }}
      >
        Fonte: API de matrículas do projeto (Express)
      </p>
    </div>
  );
}
