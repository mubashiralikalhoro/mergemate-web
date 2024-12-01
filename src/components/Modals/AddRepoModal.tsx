import React from "react";
import CenterModal from "../Global/CenterModal";
import FormBuilder from "../Global/FormBuilder/FormBuilder";
import { AppRepoSchema } from "@/constants/schema";
import { techStackOptions } from "@/constants";
import api from "@/utils/api";
import apiEndPoints from "@/constants/apiEndPoints";

interface Props {
  isOpen: boolean;
  setOpen: any;
  repos: Repository[];
  addRepo: (values: any) => any;
}

const AddRepoModal = ({ isOpen, setOpen, repos = [], addRepo }: Props) => {
  const [teachSearchValue, setTechSearchValue] = React.useState("");
  const [searchRepos, setSearchRepos] = React.useState("");

  return (
    <CenterModal isOpen={isOpen} setOpen={setOpen}>
      <div className="p-2 my-container bg-background px-4 w-full">
        <FormBuilder
          className="w-[90vw] md:w-[70vw] max-w-4xl gap-2"
          yupSchema={AppRepoSchema}
          value={{
            contributionGuidelines: "",
            description: "",
            difficulty: "easy",
            repo: null,
            technologies: [],
          }}
          design={[
            {
              fieldName: "repo",
              label: "Repository",
              inputType: "select",
              options: repos
                .filter((item) => item.name.toLowerCase().includes(searchRepos.toLowerCase()))
                .map((item) => ({
                  label: item.name,
                  value: item,
                })),

              selectSearchValue: searchRepos,
              onSelectSearchChange(text, setValues, values) {
                setSearchRepos(text);
              },

              loadSelectValue(v) {
                return v.name;
              },
            },
            {
              fieldName: "technologies",
              label: "Technologies",
              inputType: "multiselect",
              options: techStackOptions.filter((tech) =>
                tech.value.toLowerCase().includes(teachSearchValue.toLowerCase())
              ),
              selectSearchValue: teachSearchValue,
              onSelectSearchChange(text, setValues, values) {
                setTechSearchValue(text);
              },
              loadSelectValue(v) {
                return v;
              },
            },
            {
              fieldName: "difficulty",
              label: "Difficulty",
              inputType: "enum",
              options: [
                { value: "easy", label: "Easy" },
                { value: "medium", label: "Medium" },
                { value: "hard", label: "Hard" },
              ],
            },
            {
              fieldName: "contributionGuidelines",
              label: "Contribution Guidelines",
              inputType: "textarea",
            },
            {
              fieldName: "description",
              label: "Description",
              inputType: "textarea",
            },
          ]}
          onSubmit={async (v) => {
            const is = await addRepo(v);
            if (is === true) {
              setOpen(false);
            }
          }}
          SubmitButton={({ isValid }) => (
            <div className={`my-button ${isValid ? "bg-primary" : "bg-grayed-out"}`}>Add</div>
          )}
        />
      </div>
    </CenterModal>
  );
};

export default AddRepoModal;
