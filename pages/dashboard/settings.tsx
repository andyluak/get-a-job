import clsx from "clsx";
import { Inter } from "next/font/google";
import React, { useEffect, useState } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import DefaultHead from "@/components/DefaultHead";

import { deleteKey, getKey, saveKey } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const inter = Inter({ subsets: ["latin"] });

const Dashboard = () => {
  const [apiKey, setApiKey] = useState<string | boolean>("");
  const [model, setModel] = useState<string | boolean>("");
  const [log, setLog] = useState<boolean>(false);

  const { toast } = useToast();

  useEffect(() => {
    setApiKey(getKey("openai"));
    setModel(getKey("openai-model"));
    setLog(getKey("log") == "true" ? true : false);

    console.log(getKey("log"));
  }, []);

  const handleSettingsSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const api = formData.get("openai") as string;

    if (!api.startsWith("sk-")) {
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
      return;
    }
    console.log(log, "save");
    saveKey("openai", api);
    saveKey("openai-model", model);
    saveKey("log", log);
    toast({
      title: "Settings Saved",
      description: "Your API Key and Model have been saved",
    });
  };

  const handleApiDelete = () => {
    deleteKey("openai");
    deleteKey("openai-model");
    setApiKey("");
    setModel("GPT3.5");
    setLog(false);
    toast({
      title: "API Key Deleted",
      description: "Your settings have been cleared",
    });
  };

  return (
    <main
      className={clsx(
        inter.className,
        "max-desktop grid grid-cols-4 px-16 py-8"
      )}
    >
      <DefaultHead page="Settings" />
      <Sidebar />
      <section className="col-span-3 space-y-16">
        <h1 className="text-3xl font-bold">Settings</h1>
        <form
          className="flex w-full max-w-sm flex-col items-start gap-8"
          onSubmit={handleSettingsSave}
        >
          <div className="w-full space-y-4">
            <Label className="text-lg" htmlFor="openai">
              OpenAI Api Key
            </Label>
            <Input
              type="text"
              id="openai"
              placeholder="OpenAI Api Key"
              data-lpignore="true"
              name="openai"
              required
              minLength={51}
              maxLength={51}
              defaultValue={apiKey as string}
            />
          </div>
          <div className="w-full space-y-4">
            <Label className="text-lg" htmlFor="openai-model">
              OpenAI Model
            </Label>
            <Select
              name="openai-model"
              value={model as string}
              onValueChange={(value: string) => setModel(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a verified email to display" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-3.5-turbo">GPT 3.5 Model</SelectItem>
                <SelectItem value="gpt-4">GPT 4 Model</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-full items-center space-x-4">
            <Label htmlFor="log">Display logging in the console ?</Label>
            <input
              type="checkbox"
              checked={log}
              onChange={(e) => setLog(e.target.checked)}
              className="h-4 w-4 accent-black"
            />
          </div>
          <div className="flex w-full flex-row justify-between">
            <Button type="submit" size="lg">
              Save
            </Button>
            <Button
              type="button"
              size="lg"
              variant="destructive"
              onClick={handleApiDelete}
            >
              Delete
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Dashboard;
