import { create } from "zustand";

type ProjectObject = {
  name: string;
  description: string;
  slug: string;
  features: string[];
  homepageSections: string[];
  pages: string[];
};

type State = {
  data: Record<string, any>;
  setData: (values: Record<string, any>) => void;
  projectObject: ProjectObject;
  setProjectObject: (values: Record<string, any>) => void;
  resetProjectObjectProps: () => void;
};

export const useProjectCreateStore = create<State>((set, get) => ({
  data: {},
  setData: (values) => {
    set((state) => ({
      data: { ...state.data, ...values },
    }));
  },
  projectObject: {
    name: "",
    description: "",
    slug: "",
    features: [],
    homepageSections: [],
    pages: [],
  },
  setProjectObject: (values) => {
    set((state) => ({
      projectObject: { ...state.projectObject, ...values },
    }));
  },
  resetProjectObjectProps: () => {
    set((state) => ({
      projectObject: {
        ...state.projectObject,
        features: [],
        homepageSections: [],
        pages: [],
      },
    }));
  },
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
