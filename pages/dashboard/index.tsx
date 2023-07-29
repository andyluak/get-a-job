import React from "react";
import clsx from "clsx";
import { Inter } from "next/font/google";

import Sidebar from "@/components/dashboard/Sidebar";
import DefaultHead from "@/components/DefaultHead";
import ProgressForm from "@/components/dashboard/ProgressForm";
import { Button } from "@/components/ui/button";
import Initial from "@/components/dashboard/ProjectCreator/Initial";
import ProjectIdeas from "@/components/dashboard/ProjectCreator/ProjectIdeas";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ProjectFeatures from "@/components/dashboard/ProjectCreator/ProjectFeatures";
import { getProjectIdeasWithLogging } from "@/lib/openai";

const inter = Inter({ subsets: ["latin"] });

const Step3 = () => {
  return (
    <div>
      <h1>Step 3</h1>
    </div>
  );
};
const Step4 = () => {
  return (
    <div>
      <h1>Step 4</h1>
    </div>
  );
};

const Dashboard = () => {
  return (
    <main
      className={clsx(
        inter.className,
        "max-desktop grid grid-cols-4 px-16 py-8"
      )}
    >
      <DefaultHead page="Dashboard" />
      <Sidebar />
      <section className="col-span-3">
        <div className="space-y-8">
          <h1 className="text-3xl font-bold ">My Projects</h1>
          <NoProjectsMessage />
          <Dialog>
            <DialogTrigger asChild>
              <Button>Create New Project</Button>
            </DialogTrigger>
            <DialogContent>
              <ProgressForm steps={4}>
                <Initial />
                <ProjectIdeas />
                <ProjectFeatures />
                <Step4 />
              </ProgressForm>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;


const NoProjectsMessage = () => {
  return (
    <div className="space-y-2">
      <p className="text-lg"> You don&apos;t have any projects yet. </p>
    </div>
  );
}