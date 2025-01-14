import { importSnippet } from "../lib"
import { test, expect } from "bun:test"
import { Circuit } from "@tscircuit/core"

test("should import seveibar/usb-c-flashlight", async () => {
  const Flashlight = await importSnippet("seveibar/usb-c-flashlight")

  const circuit = new Circuit()

  circuit.add(
    <Flashlight />
  )

  circuit.render()

  expect(circuit.db.pcb_board.list()).toMatchInlineSnapshot(`
[
  {
    "center": {
      "x": 0,
      "y": 0,
    },
    "height": 30,
    "num_layers": 4,
    "outline": undefined,
    "pcb_board_id": "pcb_board_0",
    "thickness": 1.4,
    "type": "pcb_board",
    "width": 12,
  },
]
`)
})

