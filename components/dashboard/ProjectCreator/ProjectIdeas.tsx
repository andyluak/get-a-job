import { useProgressFormStore, useProjectCreateStore } from "@/store";
import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import useEffectOnce from "@/utils/hooks/useEffectOnce";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

type Props = {};

const ProjectIdeas = (props: Props) => {
  const { nextStep, prevStep } = useProgressFormStore();
  
  const {
    yearsOfExperience,
    projectType,
    projectSector,
    projectIdeas,
    selectedProject,
  } = useProjectCreateStore((state) => state.data);
  const setData = useProjectCreateStore((state) => state.setData);
  const { fetchProjectIdeas } = useProjectCreateStore((state) => state);

  useEffectOnce(() => {
    fetchProjectIdeas();
  });

  useEffect(() => {
    if (!projectIdeas) return;
    selectDefaultProject();
  }, [projectIdeas]);

  const slugifyProjectName = (projectName: string) => {
    return projectName
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  };

  const newProjectDescription = projectIdeas?.find(
    (idea: { name: string }) =>
      slugifyProjectName(idea?.name) === selectedProject?.slug
  )?.description;

  const selectDefaultProject = () => {
    const defaultProjectDescription = projectIdeas?.[0]?.description;
    const defaultProjectName = projectIdeas?.[0]?.name;
    const defaultProjectSlug = slugifyProjectName(defaultProjectName);

    setData({
      selectedProject: {
        name: defaultProjectName,
        description: defaultProjectDescription,
        slug: defaultProjectSlug,
      },
    });
  };

  return (
    <div className="mb-4 flex h-full w-full flex-col gap-4">
      <Label className="text-lg" htmlFor="openai-model">
        Generated project ideas
      </Label>
      <p className="text-sm text-slate-500">
        Select the project idea to its descrioption.
      </p>
      <Select
        name="project-ideas"
        value={selectedProject?.slug ?? ""}
        onValueChange={(val) => {
          const newProjectDescription = projectIdeas?.find(
            (idea: { name: string }) => slugifyProjectName(idea?.name) === val
          )?.description;

          const newProjectName = projectIdeas?.find(
            (idea: { name: string }) => slugifyProjectName(idea?.name) === val
          )?.name;

          setData({
            selectedProject: {
              name: newProjectName,
              description: newProjectDescription,
              slug: val,
            },
          });
        }}
      >
        <SelectTrigger className="relative">
          <span
            className={clsx("absolute right-10", {
              "opacity-0": projectIdeas,
            })}
          >
            Loading
          </span>
          <SelectValue placeholder="Select a project" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="" disabled>
            Select a project
          </SelectItem>
          {projectIdeas?.map(
            (
              idea: {
                name: string;
                description: string;
              },
              index: number
            ) => (
              <SelectItem key={index} value={slugifyProjectName(idea.name)}>
                {idea.name}
              </SelectItem>
            )
          )}
        </SelectContent>
      </Select>
      <p className="text-sm leading-6 tracking-tight text-slate-600">
        {newProjectDescription ? newProjectDescription : ""}
      </p>
      <div className="mt-auto flex flex-row  justify-end gap-4">
        <Button type="submit" onClick={prevStep}>
          Prev
        </Button>
        <Button type="submit" onClick={nextStep}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default ProjectIdeas;
