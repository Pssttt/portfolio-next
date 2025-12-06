import type { MDXComponents } from "mdx/types";
import { CodeBlockWithCopy } from "@/components/CodeBlockWithCopy";

const components: MDXComponents = {
  pre: CodeBlockWithCopy,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
