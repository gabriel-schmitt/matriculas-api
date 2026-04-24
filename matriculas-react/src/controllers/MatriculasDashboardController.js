export class MatriculasDashboardController {
  constructor(store) {
    this.store = store;
  }

  setEnrollFilter(value) {
    this.store.setState({
      enrollFilter: value,
      loadingEnroll: true,
      enrollData: [],
    });
  }

  setCourseFilter(value) {
    this.store.setState({
      courseFilter: value,
      loadingCourse: true,
      courseData: [],
    });
  }

  setIesTipo(value) {
    this.store.setState({
      iesTipo: value,
      loadingIES: true,
      iesData: [],
    });
  }

  setIesModalidade(value) {
    this.store.setState({
      iesModalidade: value,
      loadingIES: true,
      iesData: [],
    });
  }
}
