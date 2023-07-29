import React, { ReactNode } from "react";

import { useProgressFormStore } from "@/store";

import { Progress } from "../ui/progress";

type Props = {
  steps: number;
  children: ReactNode[];
};

const ProgressForm = ({ steps, children }: Props) => {
  const { currentStep } = useProgressFormStore();
  const progressValue = (currentStep / steps) * 100;

  const CurrentStepComponent = children[currentStep - 1];

  return (
    <div className="flex min-h-[500px] flex-col justify-between">
      {CurrentStepComponent}
      <div className="flex flex-col justify-between space-y-4">
        <Progress value={progressValue} />
      </div>
    </div>
  );
};

export default ProgressForm;
