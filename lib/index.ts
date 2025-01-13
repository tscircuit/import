import GlobalReact from "react"
import * as tscircuitCore from "@tscircuit/core"
import * as tscircuitMathUtils from "@tscircuit/math-utils"

export const importSnippet = async <T = any>(snippetId: string): Promise<T> => {
  const jsBundle = await fetch(`https://cjs.tscircuit.com/${snippetId}`).then(r => r.text())
  
  const React = GlobalReact

  // Used inside jsBundle
  const requireFn = (path: string) => {
    if (path === "@tscircuit/core") {
      return tscircuitCore
    }
    if (path === "@tscircuit/math-utils") {
      return tscircuitMathUtils
    }
    throw new Error(`Unknown module: ${path}`)
  }

  const module = { exports: {} };
  const fn = new Function("React", 'require', 'module', 'exports', jsBundle);
  fn(GlobalReact, requireFn, module, module.exports)

  return module.exports as T
}