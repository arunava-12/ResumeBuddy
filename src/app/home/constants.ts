import {
  initialEducation,
  initialProfile,
  initialProject,
  initialWorkExperience,
} from "lib/redux/resumeSlice";
import type { Resume } from "lib/redux/types";
import { deepClone } from "lib/deep-clone";
import kenan from "public/assets/pfp.png";
import { SupportedLanguage } from "../lib/redux/types";

export const END_HOME_RESUME_EN: Resume = {
  profile: {
    name: "Conan Edogawa",
    summary: ["• High School - Leave of Absence", "• Elementary School - Enrolled"],
    email: "Konan@Konan.com",
    phone: "11111111111",
    location: "Beika Town",
    url: "konan.com",
    photoUrl: kenan.src,
  },
  workExperiences: [
    {
      id: "work-1",
      company: "Detective Boys",
      jobTitle: "Leader",
      date: "Since body shrinkage",
      descriptions: [
        "• Led group members to solve various cases involving missing children and treasure hunts, handling over 50 incidents and enhancing team investigation skills.",
        "• Rescued Mitsuhiko in a kidnapping case by analyzing clues and utilizing team members' strengths.",
        "• Solved a murder case in a library by noticing abnormal behavior, investigating in a dark environment, and exposing the murderer.",
      ],
    },
    {
      id: "work-2",
      company: "Mouri Detective Agency",
      jobTitle: "Intern Detective",
      date: "Since body shrinkage",
      descriptions: [
        "• Assisted in solving over 500 cases by collecting clues, investigating suspects, and reconstructing crime scenes.",
        "• Solved a locked room mystery by analyzing structural elements and exposing the trick involving tape and a mop.",
      ],
    },
  ],
  educations: [],
  projects: [
    {
      id: "project-1",
      project: "Black Organization Investigation",
      date: "",
      descriptions: [
        "• Conducted deep investigations on a criminal organization by analyzing evidence and decoding encrypted communications.",
        "• Helped uncover major operations and provided intelligence support to law enforcement.",
      ],
    },
    {
      id: "project-2",
      project: "Red vs Black",
      date: "",
      descriptions: [
        "• Planned and executed a fake death operation with FBI and CIA cooperation.",
        "• Successfully disrupted the criminal organization's activities and obtained crucial intelligence.",
      ],
    },
  ],
  skills: {
    featuredSkills: [
      { skill: "Deduction", rating: 5 },
      { skill: "Gadget Mastery", rating: 5 },
      { skill: "Soccer Tricks", rating: 5 },
      { skill: "Linguistic Skills", rating: 5 },
      { skill: "Disguise", rating: 5 },
      { skill: "Musical Talent", rating: 1 },
    ],
    descriptions: [
      "• Skilled in crime scene analysis and logic-based deduction",
      "• Proficient with gadgets like voice changer, tranquilizer watch, and enhanced shoes",
    ],
    categorySkills: {
      "Languages : ": "English, Japanese",
      "Frameworks : ": "Detective Work, Investigation",
      "Tools : ": "Voice Changer, Tranquilizer Watch, Enhanced Shoes",
      "Libraries : ": "Crime Scene Analysis, Logic Deduction",
      "Soft Skills : ": "Leadership, Problem Solving, Teamwork",
    },
    selectedCategories: {
      "Languages : ": true,
      "Frameworks : ": true,
      "Tools : ": true,
      "Libraries : ": true,
      "Soft Skills : ": true,
    },
  },
  custom: {
    descriptions: [],
  },
};

// Resume selector by language (currently returns same default)
export const getResumeByLang = (lang: SupportedLanguage): Resume => {
  return END_HOME_RESUME_EN;
};

// Default resume
export const END_HOME_RESUME = END_HOME_RESUME_EN;

// Initial resume state
export const START_HOME_RESUME: Resume = {
  profile: {
    ...deepClone(initialProfile),
    photoUrl: END_HOME_RESUME_EN.profile.photoUrl,
  },
  workExperiences: END_HOME_RESUME_EN.workExperiences.map((_, index) => {
    const workExp = deepClone(initialWorkExperience);
    workExp.id = `start-work-${index + 1}`;
    return workExp;
  }),
  educations: [],
  projects: [
    {
      ...deepClone(initialProject),
      id: "start-project-1",
    },
  ],
  skills: {
    featuredSkills: END_HOME_RESUME_EN.skills.featuredSkills.map((item: any) => ({
      skill: "",
      rating: item.rating,
    })),
    descriptions: [],
    categorySkills: {
      "Languages : ": "English, Japanese",
      "Frameworks : ": "Detective Work, Investigation",
      "Tools : ": "Voice Changer, Tranquilizer Watch, Enhanced Shoes",
      "Libraries : ": "Crime Scene Analysis, Logic Deduction",
      "Soft Skills : ": "Leadership, Problem Solving, Teamwork",
    },
    selectedCategories: {
      "Languages : ": true,
      "Frameworks : ": true,
      "Tools : ": true,
      "Libraries : ": true,
      "Soft Skills : ": true,
    },
  },
  custom: {
    descriptions: [],
  },
};
