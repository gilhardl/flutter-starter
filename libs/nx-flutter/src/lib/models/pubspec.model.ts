export interface Pubspec {
  name: string;
  version: string;
  description?: string;
  homepage?: string;
  documentation?: string;
  environment?: Record<string, Record<string, string>>;
  dependencies?: Record<string, PubspecDependency>;
  dev_dependencies?: Record<string, PubspecDependency>;
}

type PubspecDependency = string | { sdk: string } | { path: string };
