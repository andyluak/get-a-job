import clsx from "clsx";
import { Inter } from "next/font/google";

import { motion, useScroll, useTransform } from "framer-motion";

import content from "@/content.json";

import { Content } from "@/types";

import CTA from "@/components/CTA";
import DefaultHead from "@/components/DefaultHead";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  content: Content;
};

export default function Home({ content }: Props) {
  const hero = content.hero;
  const why = content.why_getajob;
  const howItWorks = content.how_it_works_section;
  const cta = content.get_started_section;

  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start center", "center"],
    smooth: 1,
  });
  const translateX = useTransform(scrollYProgress, [0, 1], [-500, 0], { clamp: false });

  return (
    <>
      <DefaultHead page="Home" />
      <main
        className={clsx(inter.className, "max-desktop space-y-16 px-16 py-8")}
      >
        <motion.section
          className="flex flex-col items-center justify-center gap-10 md:gap-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h1 className="max-w-xl text-center text-xl">{hero.subtitle}</h1>
          <Button size="xl">{hero.cta}</Button>
        </motion.section>
        <section className="flex flex-col gap-8">
          <h2 className="text-3xl font-bold">{why.title}</h2>
          <p className="max-w-2xl text-lg leading-7 tracking-tighter md:leading-[3rem]">
            {why.subtitle}
          </p>
          <motion.ul
            className="grid grid-cols-1 gap-8 md:grid-cols-2 "
            initial={{ opacity: 0 }}
            style={{
              opacity: scrollYProgress,
              translateX,
            }}
            ref={listRef}
          >
            {why.cards?.map((card, index) => {
              return (
                <li
                  key={card.title}
                  className={clsx(
                    "flex w-full max-w-md flex-col items-center justify-center gap-4 rounded-lg  bg-gradient-to-r from-slate-100 to-slate-200/50 px-8 py-20 text-center",
                    {
                      "justify-self-end": index % 2,
                    }
                  )}
                >
                  <h3 className="text-2xl font-bold">{card.title}</h3>
                  <p className="max-w-md text-lg">{card.subtitle}</p>
                </li>
              );
            })}
          </motion.ul>
        </section>
        <CTA title={cta.title} cta={cta.cta} />
        <section className="flex flex-col gap-8">
          <h2 className="text-3xl font-bold">{howItWorks.title}</h2>
          <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {howItWorks.steps?.map((card, index) => {
              return (
                <li
                  key={card.title}
                  className={clsx(
                    "flex w-full max-w-md flex-col items-center justify-center gap-4 rounded-lg  bg-gradient-to-r from-slate-100 to-slate-200/50 px-8 py-20 text-center",
                    {
                      "justify-self-end": index % 2,
                    }
                  )}
                >
                  <h3 className="text-2xl font-bold">{card.title}</h3>
                  <p className="max-w-md text-lg">{card.subtitle}</p>
                </li>
              );
            })}
          </ul>
        </section>
        <CTA title={cta.title} cta={cta.cta} />
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      content,
    },
  };
};
