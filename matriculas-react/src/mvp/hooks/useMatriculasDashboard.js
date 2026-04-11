"use client";

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import { createObservableState } from "../architecture/observer/observableState";
import { dashboardInitialState } from "../model/dashboardInitialState";
import { createMatriculasRepository } from "../repositories/createMatriculasRepository";
import { MatriculasDashboardPresenter } from "../presenters/MatriculasDashboardPresenter";

export function useMatriculasDashboard(repository) {
  const ctx = useRef(null);
  if (!ctx.current) {
    const repo = repository ?? createMatriculasRepository();
    const store = createObservableState(dashboardInitialState);
    const presenter = new MatriculasDashboardPresenter(repo, store);
    ctx.current = { store, presenter };
  }

  const { store, presenter } = ctx.current;

  const state = useSyncExternalStore(
    store.subscribe,
    store.getState,
    store.getState,
  );

  useEffect(() => {
    presenter.mount();
  }, [presenter]);

  const actions = useMemo(
    () => ({
      setEnrollFilter: (v) => presenter.setEnrollFilter(v),
      setCourseFilter: (v) => presenter.setCourseFilter(v),
      setIesTipo: (v) => presenter.setIesTipo(v),
      setIesModalidade: (v) => presenter.setIesModalidade(v),
    }),
    [presenter],
  );

  return { state, actions };
}
