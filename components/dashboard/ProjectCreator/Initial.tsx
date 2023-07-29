import React from "react";

import { useProgressFormStore, useProjectCreateStore } from "@/store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";

const Initial = () => {
  const { nextStep } = useProgressFormStore();

  const setData = useProjectCreateStore((state) => state.setData);
  const stateData = useProjectCreateStore((state) => state.data);

  const { yearsOfExperience, projectType, projectSector } = stateData;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const initialSchema = z.object({
      yearsOfExperience: z.string().min(1),
      projectType: z.string().min(1),
      projectSector: z.string().min(1),
    });

    const res = initialSchema.safeParse(data);

    if (!res.success) {
      const errorsObject = res.error.formErrors.fieldErrors;
      console.log(errorsObject);

      type ErrorKeys = keyof typeof errorsObject;

      (Object.keys(errorsObject) as ErrorKeys[]).forEach((key) => {
        console.log(key);
        const error = errorsObject[key];
        console.log(error);
      });

      return;
    }

    setData({
      ...stateData,
      ...data,
    });

    nextStep();
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <h3 className="text-slate-500">
        Initial Questions to be able to see what sort of project would fit you
      </h3>
      <div className="w-full space-y-4">
        <Label className="text-lg" htmlFor="yearsOfExperience">
          Years of Experience
        </Label>
        <Input
          type="number"
          id="yearsOfExperience"
          placeholder="Years of Experience"
          data-lpignore="true"
          name="yearsOfExperience"
          required
          minLength={1}
          defaultValue={yearsOfExperience}
        />
      </div>
      <div className="w-full space-y-4">
        <Label className="text-lg" htmlFor="projectType">
          Project Type
        </Label>
        <Input
          type="text"
          id="projectType"
          placeholder="Project Type"
          data-lpignore="true"
          name="projectType"
          required
          defaultValue={projectType}
        />
      </div>
      <div className="w-full space-y-4">
        <Label className="text-lg" htmlFor="projectSector">
          Project Sector
        </Label>
        <Input
          type="text"
          id="projectSector"
          placeholder="Project Sector"
          data-lpignore="true"
          name="projectSector"
          required
          minLength={1}
          maxLength={51}
          defaultValue={projectSector}
        />
      </div>
      <div className="flex flex-row justify-end">
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
};

export default Initial;
