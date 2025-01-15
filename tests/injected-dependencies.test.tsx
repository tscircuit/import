import { importSnippet } from "../lib"
import { test, expect } from "bun:test"
import { Circuit } from "@tscircuit/core"
import * as tscircuitCore from "@tscircuit/core"

test("should import with injected dependencies", async () => {
  const mockCore = {
    ...tscircuitCore,
    Circuit: class MockCircuit extends tscircuitCore.Circuit {
      constructor() {
        super()
        this.mockProperty = true
      }
      mockProperty: boolean
    },
  }

  const Flashlight = await importSnippet("seveibar/usb-c-flashlight", {
    dependencies: {
      "@tscircuit/core": mockCore,
    },
  })

  const circuit = new mockCore.Circuit()

  circuit.add(<Flashlight />)

  expect(circuit.mockProperty).toBe(true)
})
