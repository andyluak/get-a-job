import { create } from "zustand";

import { getProjectIdeasWithLogging } from "./lib/openai";

const compareTwoObjects = (obj1: any, obj2: any) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

type State = {
  data: Record<string, any>;
  setData: (values: Record<string, any>) => void;
  prevData: {
    yearsOfExperience: any;
    projectType: any;
    projectSector: any;
  } | null;
  fetchProjectIdeas: () => void;
};

export const useProjectCreateStore = create<State>((set, get) => ({
  data: {},
  setData: (values) => {
    const { yearsOfExperience, projectType, projectSector } = get().data;
    set((state) => ({
      data: { ...state.data, ...values },
      prevData: { yearsOfExperience, projectType, projectSector },
    }));
  },
  fetchProjectIdeas: async () => {
    // get yearsOfExperience,projectType,projectSector from data
    const { yearsOfExperience, projectType, projectSector } = get().data;
    const {
      yearsOfExperience: prevYearsOfExperience,
      projectType: prevProjectType,
      projectSector: prevProjectSector,
    } = get().prevData || {};

    const areEqual = compareTwoObjects(
      {
        yearsOfExperience,
        projectType,
        projectSector,
      },
      {
        yearsOfExperience: prevYearsOfExperience,
        projectType: prevProjectType,
        projectSector: prevProjectSector,
      }
    );

    if (areEqual) return;
    set((state) => ({
      data: { ...state.data, projectIdeas: undefined },
    }));

    try {
      const res = await getProjectIdeasWithLogging({
        yearsOfExperience,
        projectType,
        projectSector,
      });

      set((state) => ({
        data: { ...state.data, projectIdeas: res.projectIdeas },
      }));
    } catch (err) {
      console.log(err);
    }
  },

  prevData: null,
}));

type ProgressFormState = {
  steps: number;
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
};

export const useProgressFormStore = create<ProgressFormState>((set) => ({
  steps: 3,
  currentStep: 1,
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
}));
