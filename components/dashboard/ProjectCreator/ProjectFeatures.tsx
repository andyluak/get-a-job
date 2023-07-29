import { Button } from "@/components/ui/button";
import { getProjectFeaturesWithLogging } from "@/lib/openai";
import { useProgressFormStore, useProjectCreateStore } from "@/store";
import useEffectOnce from "@/utils/hooks/useEffectOnce";
import React from "react";
import clsx from "clsx";

type Props = {};

const ProjectFeatures = (props: Props) => {
  const { nextStep } = useProgressFormStore();
  const {
    yearsOfExperience,
    projectType,
    projectSector,
    projectIdeas,
    selectedProject,
  } = useProjectCreateStore((state) => state.data);
  const setData = useProjectCreateStore((state) => state.setData);

  const { name, description, slug, projectFeatures } = selectedProject;
  useEffectOnce(() => {
    if (projectFeatures) return;

    getProjectFeaturesWithLogging({
      projectName: name,
      projectDescription: description,
    }).then(({ projectFeatures, totalTokens }) => {
      setData({
        selectedProject: {
          ...selectedProject,
          projectFeatures: projectFeatures,
        },
      });
    });
  });

  const [selectedFeatures, setSelectedFeatures] = React.useState<string[]>([]);

  const handleFeatureSelect = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures((prev) => prev.filter((f) => f !== feature));
    } else {
      setSelectedFeatures((prev) => [...prev, feature]);
    }
  };

  return (
    <div className="space-y-8">
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
                isSelected={selectedFeatures.includes(feature)}
              />
            ))}
        </ul>
      </div>
      <Button
        onClick={async () => {
          console.log("projectFeatures", projectFeatures);
          const { projectFeatures: newProjectFeatures } =
            await getProjectFeaturesWithLogging({
              projectName: name,
              projectDescription: description,
              exclusions: projectFeatures,
            });
          setData({
            selectedProject: {
              ...selectedProject,
              projectFeatures: [
                ...selectedProject.projectFeatures,
                ...newProjectFeatures,
              ],
            },
          });
        }}
      >
        Give Me More
      </Button>
      <div className="mt-auto flex flex-row  justify-end">
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
            "after:mt-1 after:block after:h-1 after:w-0 after:bg-transparent": !isSelected,
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
