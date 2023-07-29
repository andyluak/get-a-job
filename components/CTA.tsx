import React from "react";

import { Button } from "./ui/button";

type Props = {
  title: string;
  cta: string;
};

const CTA = ({ title, cta }: Props) => {
  return (
    <section className="flex flex-col items-center justify-center gap-8 bg-gradient-to-l from-slate-100 to-slate-200/50 px-8 py-16 text-center">
      <h2 className="text-3xl font-bold">{title}</h2>
      <Button className="self-center" size="xl">
        {cta}
      </Button>
    </section>
  );
};

export default CTA;
