# @tscircuit/import

Dynamically import a tscircuit snippet from the registry

```tsx
import { importSnippet } from "@tscircuit/import"
import { Circuit } from "@tscircuit/core"

const Flashlight = await importSnippet("seveibar/usb-c-flashlight")

const circuit = new Circuit()

circuit.add(<Flashlight />)
```

In order to import a snippet, often other snippets have to be imported. This
import system effectively downloads and bundles dependent snippets to keep the
usage as simple as possible.

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
import { setDefaultRegistry } from "@tscircuit/import"

setDefaultRegistry("https://myregistry.mycompany.com")
```

You can also provide the registry as an option to `importSnippet`

```tsx
import { importSnippet } from "@tscircuit/import"

importSnippet("seveibar/usb-c-flashlight", {
  registryUrl: "https://registry-api.tscircuit.com",
})
```
