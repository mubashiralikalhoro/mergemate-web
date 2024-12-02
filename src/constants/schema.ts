import * as Yup from "yup";

export const AppRepoSchema = Yup.object().shape({
  description: Yup.string().required(),
  contributionGuidelines: Yup.string().required(),
  difficulty: Yup.mixed().oneOf(["easy", "medium", "hard"]).required(),
  technologies: Yup.array().of(Yup.string()).required(),
  repo: Yup.object().required(),
});
