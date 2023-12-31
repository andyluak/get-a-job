import { Button } from "@/components/ui/button";
import { getProjectFeaturesWithLogging } from "@/lib/openai";
import { useProgressFormStore, useProjectCreateStore } from "@/store";
import React from "react";
import clsx from "clsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Props = {};

const ProjectFeatures = (props: Props) => {
  const { nextStep, prevStep } = useProgressFormStore();
  const queryClient = useQueryClient();
  const {
    projectObject,
    data: { yearsOfExperience },
    setProjectObject,
    resetProjectObjectProps,
  } = useProjectCreateStore((state) => state);

  const { name, description, slug, features } = projectObject;

  const { data } = useQuery({
    queryKey: ["projectFeatures", name, description, yearsOfExperience, slug],
    queryFn: async () => {
      resetProjectObjectProps();
      return await getProjectFeaturesWithLogging({
        projectName: name,
        projectDescription: description,
        yearsOfExperience,
      });
    },
  });
  const { projectFeatures } = data ?? [];

  const getMoreProjectFeaturesMutation = useMutation(
    async () => {
      const { projectFeatures: newProjectFeatures } =
        await getProjectFeaturesWithLogging({
          projectName: name,
          projectDescription: description,
          exclusions: projectFeatures,
        });
      return newProjectFeatures;
    },
    {
      onSuccess: (newProjectFeatures) => {
        queryClient.setQueryData(
          ["projectFeatures", name, description, yearsOfExperience, slug],
          {
            projectFeatures: [...projectFeatures, ...newProjectFeatures],
          }
        );
      },
    }
  );

  const handleFeatureSelect = (feature: string) => {
    if (features.includes(feature)) {
      const newFeatures = features.filter((f) => f !== feature);
      setProjectObject({
        ...projectObject,
        features: newFeatures,
      });
    } else {
      setProjectObject({
        ...projectObject,
        features: [...features, feature],
      });
    }
  };
  console.log(projectObject);
  return (
    <div className="flex h-full flex-col gap-8">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">{name} - Features</h2>
        <p className="text-sm leading-6 text-slate-500">{description}</p>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold">Features</h3>
        <ul className="max-h-[150px] space-y-2 overflow-y-scroll text-sm">
          {projectFeatures &&
            projectFeatures?.map((feature: string) => (
              <Feature
                handleSelect={handleFeatureSelect}
                key={feature}
                feature={feature}
                isSelected={features.includes(feature)}
              />
            ))}
        </ul>
      </div>
      <Button
        onClick={() => getMoreProjectFeaturesMutation.mutate()}
        className="self-start"
      >
        Give Me More
      </Button>
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

export default ProjectFeatures;

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
