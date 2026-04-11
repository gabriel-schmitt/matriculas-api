export class MatriculasDashboardPresenter {
  constructor(repository, store) {
    this.repository = repository;
    this.store = store;
  }

  mount() {
    this.loadEnrollments();
    this.loadCourses();
    this.loadIES();
  }

  setEnrollFilter(value) {
    this.store.setState({ enrollFilter: value, loadingEnroll: true });
    this.loadEnrollments();
  }

  setCourseFilter(value) {
    this.store.setState({ courseFilter: value, loadingCourse: true });
    this.loadCourses();
  }

  setIesTipo(value) {
    this.store.setState({ iesTipo: value, loadingIES: true });
    this.loadIES();
  }

  setIesModalidade(value) {
    this.store.setState({ iesModalidade: value, loadingIES: true });
    this.loadIES();
  }

  async loadEnrollments() {
    const { enrollFilter } = this.store.getState();
    try {
      const data = await this.repository.getEnrollmentsByYear(enrollFilter);
      this.store.setState({ enrollData: data, loadingEnroll: false });
    } catch (e) {
      console.error(e);
      this.store.setState({ enrollData: [], loadingEnroll: false });
    }
  }

  async loadCourses() {
    const { courseFilter } = this.store.getState();
    try {
      const data = await this.repository.getCourseRanking(courseFilter);
      this.store.setState({ courseData: data, loadingCourse: false });
    } catch (e) {
      console.error(e);
      this.store.setState({ courseData: [], loadingCourse: false });
    }
  }

  async loadIES() {
    const { iesModalidade, iesTipo } = this.store.getState();
    try {
      const data = await this.repository.getIESRanking({
        modalidade: iesModalidade,
        tipo: iesTipo,
      });
      this.store.setState({ iesData: data, loadingIES: false });
    } catch (e) {
      console.error(e);
      this.store.setState({ iesData: [], loadingIES: false });
    }
  }
}
