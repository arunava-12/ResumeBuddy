import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "lib/redux/store";
import type {
  Resume,
  ResumeEducation,
  ResumeProfile,
  ResumeProject,
  ResumeSkills,
  ResumeWorkExperience,
} from "lib/redux/types";
import type { ShowForm } from "lib/redux/settingsSlice";

// Initial values

export const initialProfile: ResumeProfile = {
  name: "",
  summary: [],
  email: "",
  phone: "",
  location: "",
  url: "",
  photoUrl: "",
};

export const initialWorkExperience: ResumeWorkExperience = {
  id: "initial-work-1",
  company: "",
  jobTitle: "",
  date: "",
  descriptions: [],
};

export const initialEducation: ResumeEducation = {
  id: "initial-education-1",
  school: "",
  degree: "",
  gpa: "",
  date: "",
  descriptions: [],
};

export const initialProject: ResumeProject = {
  id: "initial-project-1",
  project: "",
  date: "",
  descriptions: [],
};

// Updated skill format: categorized + toggled
export const initialSkills: ResumeSkills = {
  featuredSkills: [], // ✅ add this
  descriptions: [], // ✅ add this
  categorySkills: {
    Languages : "",
    Frameworks : "",
    Tools : "",
    Libraries : "",  
    "Soft Skills": "",
  },
  selectedCategories: {
    Languages : true,
    Frameworks : true,
    Tools : true,
    Libraries : true,
    "Soft Skills ": true,
  },
};

export const initialCustom = {
  descriptions: [],
};

export const initialResumeState: Resume = {
  profile: initialProfile,
  workExperiences: [initialWorkExperience],
  educations: [initialEducation],
  projects: [initialProject],
  skills: initialSkills,
  custom: initialCustom,
};

// Generic type for updating fields with optional descriptions
export type CreateChangeActionWithDescriptions<T> = {
  idx: number;
} & (
  | {
      field: Exclude<keyof T, "descriptions">;
      value: string;
    }
  | { field: "descriptions"; value: string[] }
);

export const resumeSlice = createSlice({
  name: "resume",
  initialState: initialResumeState,
  reducers: {
    changeProfile: (
      draft,
      action: PayloadAction<{
        field: keyof ResumeProfile;
        value: string | string[];
      }>
    ) => {
      const { field, value } = action.payload;
      draft.profile[field] = value as any;
    },

    changeWorkExperiences: (
      draft,
      action: PayloadAction<
        CreateChangeActionWithDescriptions<ResumeWorkExperience>
      >
    ) => {
      const { idx, field, value } = action.payload;
      draft.workExperiences[idx][field] = value as any;
    },

    changeEducations: (
      draft,
      action: PayloadAction<
        CreateChangeActionWithDescriptions<ResumeEducation>
      >
    ) => {
      const { idx, field, value } = action.payload;
      draft.educations[idx][field] = value as any;
    },

    changeProjects: (
      draft,
      action: PayloadAction<
        CreateChangeActionWithDescriptions<ResumeProject>
      >
    ) => {
      const { idx, field, value } = action.payload;
      draft.projects[idx][field] = value as any;
    },

    changeSkills: (
      draft,
      action: PayloadAction<
        | { field: "categorySkills"; value: Record<string, string> }
        | { field: "selectedCategories"; value: Record<string, boolean> }
      >
    ) => {
      const { field, value } = action.payload;
      if (field === "categorySkills") {
        draft.skills.categorySkills = value;
      } else if (field === "selectedCategories") {
        draft.skills.selectedCategories = value;
      }
    },

    changeCustom: (
      draft,
      action: PayloadAction<{ field: "descriptions"; value: string[] }>
    ) => {
      draft.custom.descriptions = action.payload.value;
    },

    addSectionInForm: (draft, action: PayloadAction<{ form: ShowForm }>) => {
      const { form } = action.payload;
      const generateId = () =>
        Date.now().toString() + Math.random().toString(36).substr(2, 9);

      switch (form) {
        case "workExperiences": {
          const newWork = structuredClone(initialWorkExperience);
          newWork.id = generateId();
          draft.workExperiences.push(newWork);
          break;
        }
        case "educations": {
          const newEdu = structuredClone(initialEducation);
          newEdu.id = generateId();
          draft.educations.push(newEdu);
          break;
        }
        case "projects": {
          const newProj = structuredClone(initialProject);
          newProj.id = generateId();
          draft.projects.push(newProj);
          break;
        }
      }
    },

    moveSectionInForm: (
      draft,
      action: PayloadAction<{
        form: ShowForm;
        idx: number;
        direction: "up" | "down";
      }>
    ) => {
      const { form, idx, direction } = action.payload;

      if (form !== "skills" && form !== "custom") {
        const arr = draft[form];
        if (
          (idx === 0 && direction === "up") ||
          (idx === arr.length - 1 && direction === "down")
        ) {
          return;
        }
        const swapIdx = direction === "up" ? idx - 1 : idx + 1;
        [arr[idx], arr[swapIdx]] = [arr[swapIdx], arr[idx]];
      }
    },

    deleteSectionInFormByIdx: (
      draft,
      action: PayloadAction<{ form: ShowForm; idx: number }>
    ) => {
      const { form, idx } = action.payload;
      if (form !== "skills" && form !== "custom") {
        draft[form].splice(idx, 1);
      }
    },

    setResume: (draft, action: PayloadAction<Resume>) => {
      return action.payload;
    },
  },
});

// Actions
export const {
  changeProfile,
  changeWorkExperiences,
  changeEducations,
  changeProjects,
  changeSkills,
  changeCustom,
  addSectionInForm,
  moveSectionInForm,
  deleteSectionInFormByIdx,
  setResume,
} = resumeSlice.actions;

// Selectors
export const selectResume = (state: RootState) => state.resume;
export const selectProfile = (state: RootState) => state.resume.profile;
export const selectWorkExperiences = (state: RootState) =>
  state.resume.workExperiences;
export const selectEducations = (state: RootState) => state.resume.educations;
export const selectProjects = (state: RootState) => state.resume.projects;
export const selectSkills = (state: RootState) => state.resume.skills;
export const selectCustom = (state: RootState) => state.resume.custom;

export default resumeSlice.reducer;
