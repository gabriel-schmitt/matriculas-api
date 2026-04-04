import { Card } from "../../components/card";
import { SectionHeader } from "../../components/sectionHeader";
import { FilterPill } from "../../components/filterPill";
import { EnrollmentChart } from "../../components/EnrollmentChart";
import { CourseRanking } from "../../components/CourseRanking";
import { IESRanking } from "../../components/IESRanking";



export default function MatriculasDashboard() {
    // Filtros
    const [enrollFilter, setEnrollFilter] = useState("todos");
    const [courseFilter, setCourseFilter] = useState("presencial");
    const [iesModalidade, setIesModalidade] = useState("todos");
    const [iesTipo, setIesTipo] = useState("todos");
  
    // Dados
    const [enrollData, setEnrollData] = useState([]);
    const [courseData, setCourseData] = useState([]);
    const [iesData, setIesData] = useState([]);
  
    // Loading
    const [loadingEnroll, setLoadingEnroll] = useState(true);
    const [loadingCourse, setLoadingCourse] = useState(true);
    const [loadingIES, setLoadingIES] = useState(true);
  
    useEffect(() => {
      API.getEnrollmentsByYear(enrollFilter).then((data) => {
        setEnrollData(data);
        setLoadingEnroll(false);
      });
    }, [enrollFilter]);
  
    useEffect(() => {
      API.getCourseRanking(courseFilter).then((data) => {
        setCourseData(data);
        setLoadingCourse(false);
      });
    }, [courseFilter]);
  
    useEffect(() => {
      API.getIESRanking({ modalidade: iesModalidade, tipo: iesTipo }).then((data) => {
        setIesData(data);
        setLoadingIES(false);
      });
    }, [iesModalidade, iesTipo]);
  
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
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "1.5rem 1rem", fontFamily: "var(--font-sans)" }}>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
        `}</style>
  
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: 22, fontWeight: 500, margin: "0 0 6px" }}>Matrículas no ensino superior</h1>
          <p style={{ margin: 0, fontSize: 14, color: "var(--color-text-secondary)" }}>
            Dados de matrículas por ano, cursos e instituições — Brasil
          </p>
        </div>
  
        {/* Grid principal */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(0, 1fr))", gap: "1rem" }}>
  
          {/* Matrículas por ano */}
          <Card style={{ gridColumn: "1 / -1" }}>
            <SectionHeader title="Matrículas por ano">
              <FilterPill options={modalidadeOpts} value={enrollFilter} onChange={setEnrollFilter} />
            </SectionHeader>
            <EnrollmentChart data={enrollData} loading={loadingEnroll} />
          </Card>
  
          {/* Ranking cursos */}
          <Card>
            <SectionHeader title="Ranking de cursos">
              <FilterPill
                options={modalidadeOpts.filter((o) => o.value !== "todos")}
                value={courseFilter}
                onChange={setCourseFilter}
              />
            </SectionHeader>
            <CourseRanking data={courseData} loading={loadingCourse} />
          </Card>
  
          {/* Ranking IES */}
          <Card>
            <SectionHeader title="Ranking de IES">
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <FilterPill options={tipoOpts} value={iesTipo} onChange={setIesTipo} />
                <FilterPill options={modalidadeOpts} value={iesModalidade} onChange={setIesModalidade} />
              </div>
            </SectionHeader>
            <IESRanking data={iesData} loading={loadingIES} />
          </Card>
  
        </div>
  
        <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", textAlign: "center", marginTop: "1.5rem" }}>
          Fonte: dados simulados — substitua API.* pelos seus endpoints reais
        </p>
      </div>
    );
  }
  