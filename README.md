# @tscircuit/import-snippet

Dynamically import a tscircuit snippet from the registry. Great for quick
scripts that need to import and build a circuit.

> [!WARNING]
> Do not use this inside of snippets, or whenever you're able to just do
> `bun add @tsci/myname.mysnippet`, dynamic imports are not nearly as fast,
> don't have lockfiles, it makes your code async and doesn't give you types!

```tsx
import { importSnippet } from "@tscircuit/import-snippet"
import { Circuit } from "@tscircuit/core"

const Flashlight = await importSnippet("seveibar/usb-c-flashlight")

const circuit = new Circuit()

circuit.add(<Flashlight />)
```

In order to import a snippet, often other snippets have to be imported. This
import system effectively downloads and bundles dependent snippets to keep the
usage as simple as possible.

## Usage without React/JSX

Some nodejs folks might not want to have a jsx transpiler, no problem!

```tsx
import { importSnippet } from "@tscircuit/import-snippet"
import { Circuit, createElement } from "@tscircuit/core"

const Flashlight = await importSnippet("seveibar/usb-c-flashlight")

const circuit = new Circuit()

circuit.add(
  createElement(Flashlight, {
    ledColor: "red",
  })
)
```

## Specifying Types

```tsx
import { importSnippet } from "@tscircuit/import-snippet"
import { Circuit } from "@tscircuit/core"

const Flashlight = await importSnippet<{
  ledColor: string
}>("seveibar/usb-c-flashlight")

const circuit = new Circuit()

circuit.add(<Flashlight ledColor="red" />)
```

## Acceptable Import URLs

You can specify imports in any of the following ways:

```tsx
importSnippet("https://tscircuit.com/seveibar/usb-c-flashlight")
importSnippet("seveibar/usb-c-flashlight")
importSnippet("@tsci/seveibar.usb-c-flashlight")
importSnippet("seveibar.usb-c-flashlight")
```

## Alternate registries

You can configure an alternate registry globally with `setDefaultRegistry`

```tsx
import { setDefaultRegistry } from "@tscircuit/import-snippet"

setDefaultRegistry("https://myregistry.mycompany.com")
```

You can also provide the registry as an option to `importSnippet`

```tsx
import { importSnippet } from "@tscircuit/import-snippet"

importSnippet("seveibar/usb-c-flashlight", {
  registryUrl: "https://registry-api.tscircuit.com",
})
```

## Injecting Dependencies

You can inject a custom version of [@tscircuit/core](https://github.com/tscircuit/core)
or other dependencies like [@tscircuit/math-utils](https://github.com/tscircuit/math-utils)
by providing the "dependencies" property.

If you do not inject dependencies, they will be loaded from the parent environment
via "require" (not supported in all environments)

```tsx
import { importSnippet } from "@tscircuit/import-snippet"
import * as tscircuitCore from "@tscircuit/core"

const MyComponent = await importSnippet("seveibar/usb-c-flashlight", {
  dependencies: {
    "@tscircuit/core": tscircuitCore,
  },
})
```
