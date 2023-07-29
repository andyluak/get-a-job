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
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { getProjectIdeasWithLogging } from "@/lib/openai";

type Props = {};

const ProjectIdeas = (props: Props) => {
  const { nextStep, prevStep } = useProgressFormStore();

  const {
    data: { yearsOfExperience, projectType, projectSector },
    projectObject,
    setProjectObject,
  } = useProjectCreateStore();
  const { name, description, slug } = projectObject;

  const { data } = useQuery({
    queryKey: ["projectIdeas", yearsOfExperience, projectType, projectSector],
    queryFn: async () => {
      return await getProjectIdeasWithLogging({
        yearsOfExperience,
        projectType,
        projectSector,
      });
    },
  });
  const { projectIdeas } = data ?? [];

  const selectDefaultProject = () => {
    const defaultProjectDescription = projectIdeas?.[0]?.description;
    const defaultProjectName = projectIdeas?.[0]?.name;
    const defaultProjectSlug = slugifyProjectName(defaultProjectName);

    setProjectObject({
      name: defaultProjectName,
      description: defaultProjectDescription,
      slug: defaultProjectSlug,
    });
  };

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
    (idea: { name: string }) => slugifyProjectName(idea?.name) === slug
  )?.description;

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
        value={slug ?? ""}
        onValueChange={(val) => {
          const newProjectDescription = projectIdeas?.find(
            (idea: { name: string }) => slugifyProjectName(idea?.name) === val
          )?.description;

          const newProjectName = projectIdeas?.find(
            (idea: { name: string }) => slugifyProjectName(idea?.name) === val
          )?.name;

          setProjectObject({
            name: newProjectName,
            description: newProjectDescription,
            slug: val,
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
