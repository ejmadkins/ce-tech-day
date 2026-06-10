import { GlobalWindow } from "happy-dom";

// 1. Initialize happy-dom immediately BEFORE importing any testing library modules
const window = new GlobalWindow();

// Safely copy properties from happy-dom window to global
const properties = Object.getOwnPropertyNames(window);
for (const prop of properties) {
  if (prop === "global" || prop === "window" || prop === "self") {
    continue;
  }
  try {
    if (!(prop in global)) {
      Object.defineProperty(global, prop, {
        get() {
          return (window as any)[prop];
        },
        set(val) {
          (window as any)[prop] = val;
        },
        configurable: true,
        enumerable: true,
      });
    }
  } catch (e) {
    // Skip read-only property assignment errors
  }
}

// Add standard browser globals if not present
(global as any).window = global;
(global as any).self = global;

// Mock crypto.randomUUID if it doesn't exist
if (typeof global.crypto === "undefined") {
  (global as any).crypto = {};
}
if (typeof global.crypto.randomUUID !== "function") {
  global.crypto.randomUUID = () => {
    return "12345678-1234-1234-1234-123456789012";
  };
}

// 2. Setup afterEach with dynamic import of @testing-library/react
import { afterEach } from "bun:test";

afterEach(async () => {
  const { cleanup } = await import("@testing-library/react");
  cleanup();
});
