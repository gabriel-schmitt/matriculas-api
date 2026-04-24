function snapshotFilters(state) {
  return {
    enrollFilter: state.enrollFilter,
    courseFilter: state.courseFilter,
    iesTipo: state.iesTipo,
    iesModalidade: state.iesModalidade,
  };
}

export function attachDashboardDataObservers(repository, store) {
  let previous = snapshotFilters(store.getState());
  let enrollLoadGen = 0;
  let courseLoadGen = 0;
  let iesLoadGen = 0;

  async function loadEnrollments() {
    const gen = ++enrollLoadGen;
    const filterAtStart = store.getState().enrollFilter;
    try {
      const data = await repository.getEnrollmentsByYear(filterAtStart);
      if (gen !== enrollLoadGen) return;
      if (store.getState().enrollFilter !== filterAtStart) return;
      store.setState({ enrollData: data, loadingEnroll: false });
    } catch (e) {
      console.error(e);
      if (gen !== enrollLoadGen) return;
      if (store.getState().enrollFilter !== filterAtStart) return;
      store.setState({ enrollData: [], loadingEnroll: false });
    }
  }

  async function loadCourses() {
    const gen = ++courseLoadGen;
    const filterAtStart = store.getState().courseFilter;
    try {
      const data = await repository.getCourseRanking(filterAtStart);
      if (gen !== courseLoadGen) return;
      if (store.getState().courseFilter !== filterAtStart) return;
      store.setState({ courseData: data, loadingCourse: false });
    } catch (e) {
      console.error(e);
      if (gen !== courseLoadGen) return;
      if (store.getState().courseFilter !== filterAtStart) return;
      store.setState({ courseData: [], loadingCourse: false });
    }
  }

  async function loadIES() {
    const gen = ++iesLoadGen;
    const tipoAtStart = store.getState().iesTipo;
    const modalidadeAtStart = store.getState().iesModalidade;
    try {
      const data = await repository.getIESRanking({
        modalidade: modalidadeAtStart,
        tipo: tipoAtStart,
      });
      if (gen !== iesLoadGen) return;
      const { iesTipo, iesModalidade } = store.getState();
      if (iesTipo !== tipoAtStart || iesModalidade !== modalidadeAtStart)
        return;
      store.setState({ iesData: data, loadingIES: false });
    } catch (e) {
      console.error(e);
      if (gen !== iesLoadGen) return;
      const { iesTipo, iesModalidade } = store.getState();
      if (iesTipo !== tipoAtStart || iesModalidade !== modalidadeAtStart)
        return;
      store.setState({ iesData: [], loadingIES: false });
    }
  }

  function onStoreNotify() {
    const next = snapshotFilters(store.getState());
    if (next.enrollFilter !== previous.enrollFilter) {
      void loadEnrollments();
    }
    if (next.courseFilter !== previous.courseFilter) {
      void loadCourses();
    }
    if (
      next.iesTipo !== previous.iesTipo ||
      next.iesModalidade !== previous.iesModalidade
    ) {
      void loadIES();
    }
    previous = next;
  }

  const unsubscribe = store.subscribe(onStoreNotify);

  function bootstrap() {
    previous = snapshotFilters(store.getState());
    void loadEnrollments();
    void loadCourses();
    void loadIES();
  }

  function dispose() {
    unsubscribe();
  }

  return { bootstrap, dispose };
}
