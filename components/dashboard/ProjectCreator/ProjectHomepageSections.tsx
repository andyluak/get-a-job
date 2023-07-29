import { Button } from "@/components/ui/button";
import { getProjectHomepageSectionsWithLogging } from "@/lib/openai";
import { useProgressFormStore, useProjectCreateStore } from "@/store";
import React from "react";
import clsx from "clsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Props = {};

const ProjectHomepageSections = (props: Props) => {
  const queryClient = useQueryClient();
  const { nextStep, prevStep } = useProgressFormStore();
  const { projectObject, setProjectObject, resetProjectObjectProps } =
    useProjectCreateStore((state) => state);

  const { name, description, slug, features, homepageSections } = projectObject;

  const { data } = useQuery({
    queryKey: [
      "projectHomepageSections",
      name,
      description,
      slug,
      features.join(""),
    ],
    queryFn: async () => {
      return await getProjectHomepageSectionsWithLogging({
        projectName: name,
        projectDescription: description,
        features,
      });
    },
  });
  const { projectHomepageSections } = data ?? [];

  const getMoreProjectHomepageSections = useMutation(
    async () => {
      const { projectHomepageSections: newProjectHomepageSections } =
        await getProjectHomepageSectionsWithLogging({
          projectName: name,
          projectDescription: description,
          features,
          exclusions: projectHomepageSections,
        });
      return newProjectHomepageSections;
    },
    {
      onSuccess: (newProjectHomepageSections) => {
        queryClient.setQueryData(
          [
            "projectHomepageSections",
            name,
            description,
            slug,
            features.join(""),
          ],
          {
            projectHomepageSections: [
              ...projectHomepageSections,
              ...newProjectHomepageSections,
            ],
          }
        );
      },
    }
  );

  const handlePageSelect = (homepageSection: string) => {
    if (homepageSections.includes(homepageSection)) {
      const newHomepageSections = homepageSections.filter(
        (f) => f !== homepageSection
      );
      setProjectObject({
        ...projectObject,
        homepageSections: newHomepageSections,
      });
    } else {
      setProjectObject({
        ...projectObject,
        homepageSections: [...homepageSections, homepageSection],
      });
    }
  };

  return (
    <div className="flex h-full flex-col gap-8">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">{name} - Homepage Sections</h2>
        <p className="text-sm leading-6 text-slate-500">{description}</p>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold">Features</h3>
        <ul className="max-h-[150px] space-y-2 overflow-y-scroll text-sm">
          {projectHomepageSections &&
            projectHomepageSections?.map((homepageSection: string) => (
              <Feature
                handleSelect={handlePageSelect}
                key={homepageSection}
                feature={homepageSection}
                isSelected={homepageSections.includes(homepageSection)}
              />
            ))}
        </ul>
        <Button
          onClick={() => getMoreProjectHomepageSections.mutate()}
          className="self-start"
        >
          Give Me More
        </Button>
      </div>
      <div className="flex flex-row justify-end gap-4">
        <Button
          type="submit"
          onClick={() => {
            resetProjectObjectProps();
            prevStep();
          }}
        >
          Prev
        </Button>
        <Button type="submit" onClick={nextStep}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default ProjectHomepageSections;

const Feature = ({
  feature,
  isSelected,
  handleSelect,
}: {
  feature: string;
  isSelected: boolean;
  handleSelect: (feature: string) => void;
}) => {
  return (
    <li onClick={() => handleSelect(feature)}>
      <div
        className={clsx(
          "w-fit select-none border-2 border-transparent",
          " after:transition-all",
          {
            "after:mt-1 after:block after:h-1 after:w-0 after:bg-transparent":
              !isSelected,
            "after:mt-1 after:block after:h-1 after:w-full after:bg-red-400":
              isSelected,
          }
        )}
      >
        {feature}
      </div>
    </li>
  );
};
