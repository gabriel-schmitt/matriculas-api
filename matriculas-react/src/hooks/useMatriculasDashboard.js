"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { attachDashboardDataObservers } from "../observer/dashboardFilterObserver";
import { createObservableState } from "../observer/observableState";
import { dashboardInitialState } from "../model/dashboardInitialState";
import { createMatriculasRepository } from "../repositories/createMatriculasRepository";
import { MatriculasDashboardController } from "../controllers/MatriculasDashboardController";

export function useMatriculasDashboard(repository) {
  const [{ repo, store, controller }] = useState(() => {
    const repo = repository ?? createMatriculasRepository();
    const state = createObservableState(dashboardInitialState);
    const controller = new MatriculasDashboardController(state);
    return { repo: repo, store: state, controller: controller };
  });

  const state = useSyncExternalStore(
    store.subscribe,
    store.getState,
    store.getState,
  );

  useEffect(() => {
    const { bootstrap, dispose } = attachDashboardDataObservers(repo, store);
    bootstrap();
    return dispose;
  }, [repo, store]);

  const actions = useMemo(
    () => ({
      setEnrollFilter: (v) => controller.setEnrollFilter(v),
      setCourseFilter: (v) => controller.setCourseFilter(v),
      setIesTipo: (v) => controller.setIesTipo(v),
      setIesModalidade: (v) => controller.setIesModalidade(v),
    }),
    [controller],
  );

  return { state, actions };
}
