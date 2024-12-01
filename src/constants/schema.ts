import * as Yup from "yup";

export const AppRepoSchema = Yup.object().shape({
  description: Yup.string(),
  contributionGuidelines: Yup.string(),
  difficulty: Yup.mixed().oneOf(["easy", "medium", "hard"]).required(),
  technologies: Yup.array().of(Yup.string()).required(),
  repo: Yup.object().required(),
});
