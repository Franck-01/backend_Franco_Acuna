import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { delay } from "https://deno.land/std@0.86.0/async/mod.ts";

Deno.test("Hello test #1", () => {
  // escribimos el test

  const x = 1 + 2;
  assertEquals(x, 3);
});

Deno.test({
  name: "Hello tst #2",
  fn: () => {
    // escribimos el test
    const x = 3 * 2;
    assertEquals(x, 6);
  },
});

// Simulacion de tiempos
Deno.test(" Async - Hello test #3", async () => {
  // escribo el test
  const x = 10 - 2;
  await delay(4000);
  assertEquals(x, 8);
});
