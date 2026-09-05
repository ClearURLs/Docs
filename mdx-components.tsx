import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { OverviewGithubInfo } from '@/components/github-info';
import type { MDXComponents } from 'mdx/types';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Tab,
    Tabs,
    Accordion,
    Accordions,
    Step,
    Steps,
    OverviewGithubInfo,
    ...components,
  };
}

export const useMDXComponents = getMDXComponents;

declare global {
  // Fumadocs-mdx picks the component type up from here.
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
