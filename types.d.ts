export interface Content {
  hero: Hero;
  why_getajob: WhyGetajob;
  how_it_works_section: HowItWorksSection;
  get_started_section: GetStartedSection;
}
interface Hero {
  title: string;
  subtitle: string;
  cta: string;
}
interface WhyGetajob {
  title: string;
  subtitle: string;
  cards?: CardsEntityOrStepsEntity[] | null;
}
interface CardsEntityOrStepsEntity {
  title: string;
  subtitle: string;
}
interface HowItWorksSection {
  title: string;
  steps?: CardsEntityOrStepsEntity[] | null;
}
interface GetStartedSection {
  title: string;
  cta: string;
}
