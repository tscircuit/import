import GlobalReact from "react"
import * as tscircuitCore from "@tscircuit/core"
import * as tscircuitMathUtils from "@tscircuit/math-utils"

const defaultDependencies: Record<string, any> = {
  react: GlobalReact,
  "@tscircuit/core": tscircuitCore,
  "@tscircuit/math-utils": tscircuitMathUtils,
}

export const importSnippet = async <T = any>(snippetId: string, {
  /**
   * A "bundle registry" is like esm.sh or unpkg.com, it serves bundled
   * javascript at "{bundleRegistryUrl}/{org}/{name}" e.g.
   * "https://cjs.tscircuit.com/seveibar/usb-c-flashlight"
   */
  bundleRegistryUrl = "https://cjs.tscircuit.com",

  /**
   * A map of dependencies to inject into the snippet.
   */
  dependencies = {},
}: {
  bundleRegistryUrl?: string
  
  dependencies?: Record<string, any>
} = {}): Promise<T> => {
  const jsBundle = await fetch(`${bundleRegistryUrl}/${snippetId}`).then(r => r.text())
  
  const React = GlobalReact

  // Used inside jsBundle
  const requireFn = (path: string) => {
    if (path in dependencies) {
      return dependencies[path]
    }
    if (path in defaultDependencies) {
      return defaultDependencies[path]
    }
    throw new Error(`Unknown module: ${path}`)
  }

  const module = { exports: {} };
  const fn = new Function("React", 'require', 'module', 'exports', jsBundle);
  fn(requireFn("react"), requireFn, module, module.exports)

  return module.exports as T
}