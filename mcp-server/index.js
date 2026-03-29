import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const designTokens = {
  colors: {
    primary: {
      50: "#FFFBEB",
      100: "#FEF3C7",
      200: "#FDE68A",
      300: "#FCD34D",
      400: "#FBBF24",
      500: "#F59E0B",
      600: "#D97706",
      700: "#B45309",
      800: "#92400E",
      900: "#78350F",
    },
    neutral: {
      50: "#FAFAF9",
      100: "#F5F5F4",
      200: "#E7E5E4",
      300: "#D6D3D1",
      400: "#A8A29E",
      500: "#78716C",
      600: "#57534E",
      700: "#44403C",
      800: "#292524",
      900: "#1C1917",
    },
    success: "#22C55E",
    danger: "#EF4444",
    background: "#FFFBEB",
    surface: "#FFFFFF",
    textPrimary: "#1C1917",
    textSecondary: "#57534E",
    textMuted: "#A8A29E",
  },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    scale: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
    },
    weight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    unit: "4px",
    scale: {
      1: "4px",
      2: "8px",
      3: "12px",
      4: "16px",
      5: "20px",
      6: "24px",
      8: "32px",
      10: "40px",
      12: "48px",
      16: "64px",
    },
  },
  borderRadius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
  },
  transitions: {
    fast: "150ms ease",
    normal: "200ms ease",
    slow: "300ms ease",
  },
};

const componentSpecs = {
  button: {
    description: "Button component with variants",
    variants: {
      primary: {
        background: designTokens.colors.primary[500],
        hoverBackground: designTokens.colors.primary[600],
        activeBackground: designTokens.colors.primary[700],
        text: "#FFFFFF",
        padding: `${designTokens.spacing.scale[2]} ${designTokens.spacing.scale[4]}`,
        borderRadius: designTokens.borderRadius.lg,
        fontWeight: designTokens.typography.weight.semibold,
        fontSize: designTokens.typography.scale.sm,
        transition: designTokens.transitions.fast,
        focusRing: `0 0 0 2px ${designTokens.colors.background}, 0 0 0 4px ${designTokens.colors.primary[500]}`,
      },
      secondary: {
        background: "transparent",
        hoverBackground: designTokens.colors.neutral[100],
        activeBackground: designTokens.colors.neutral[200],
        text: designTokens.colors.neutral[700],
        border: `1px solid ${designTokens.colors.neutral[300]}`,
        padding: `${designTokens.spacing.scale[2]} ${designTokens.spacing.scale[4]}`,
        borderRadius: designTokens.borderRadius.lg,
        fontWeight: designTokens.typography.weight.medium,
        fontSize: designTokens.typography.scale.sm,
        transition: designTokens.transitions.fast,
      },
      danger: {
        background: designTokens.colors.danger,
        hoverBackground: "#DC2626",
        text: "#FFFFFF",
        padding: `${designTokens.spacing.scale[2]} ${designTokens.spacing.scale[4]}`,
        borderRadius: designTokens.borderRadius.lg,
        fontWeight: designTokens.typography.weight.semibold,
        fontSize: designTokens.typography.scale.sm,
        transition: designTokens.transitions.fast,
      },
    },
  },
  card: {
    description: "Container card for grouping content",
    styles: {
      background: designTokens.colors.surface,
      border: `1px solid ${designTokens.colors.neutral[200]}`,
      borderRadius: designTokens.borderRadius.xl,
      padding: designTokens.spacing.scale[6],
      shadow: designTokens.shadows.sm,
      hoverShadow: designTokens.shadows.md,
      transition: designTokens.transitions.normal,
    },
  },
  input: {
    description: "Text input field",
    styles: {
      background: designTokens.colors.surface,
      border: `1px solid ${designTokens.colors.neutral[300]}`,
      focusBorder: designTokens.colors.primary[500],
      borderRadius: designTokens.borderRadius.lg,
      padding: `${designTokens.spacing.scale[2]} ${designTokens.spacing.scale[3]}`,
      fontSize: designTokens.typography.scale.base,
      color: designTokens.colors.textPrimary,
      placeholderColor: designTokens.colors.textMuted,
      focusRing: `0 0 0 2px ${designTokens.colors.primary[100]}`,
      transition: designTokens.transitions.fast,
    },
  },
  checkbox: {
    description: "Custom styled checkbox",
    styles: {
      size: "20px",
      border: `2px solid ${designTokens.colors.neutral[300]}`,
      checkedBackground: designTokens.colors.primary[500],
      checkedBorder: designTokens.colors.primary[500],
      checkmarkColor: "#FFFFFF",
      borderRadius: designTokens.borderRadius.sm,
      transition: designTokens.transitions.fast,
      focusRing: `0 0 0 2px ${designTokens.colors.primary[100]}`,
    },
  },
  badge: {
    description: "Status badge/tag",
    variants: {
      completed: {
        background: "#DCFCE7",
        text: "#166534",
        padding: `${designTokens.spacing.scale[1]} ${designTokens.spacing.scale[2]}`,
        borderRadius: designTokens.borderRadius.full,
        fontSize: designTokens.typography.scale.xs,
        fontWeight: designTokens.typography.weight.medium,
      },
      pending: {
        background: designTokens.colors.primary[100],
        text: designTokens.colors.primary[800],
        padding: `${designTokens.spacing.scale[1]} ${designTokens.spacing.scale[2]}`,
        borderRadius: designTokens.borderRadius.full,
        fontSize: designTokens.typography.scale.xs,
        fontWeight: designTokens.typography.weight.medium,
      },
    },
  },
};

const server = new McpServer({
  name: "design-system",
  version: "1.0.0",
});

server.tool(
  "get_design_tokens",
  "Returns the complete design system tokens including colors, typography, spacing, border radius, shadows, and transitions. Use these tokens for all styling decisions.",
  {},
  async () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify(designTokens, null, 2),
      },
    ],
  })
);

server.tool(
  "get_component_spec",
  "Returns the styling specification for a specific UI component. Available components: button, card, input, checkbox, badge.",
  {
    component_name: z
      .enum(["button", "card", "input", "checkbox", "badge"])
      .describe("The name of the component to get specs for"),
  },
  async ({ component_name }) => {
    const spec = componentSpecs[component_name];
    if (!spec) {
      return {
        content: [
          {
            type: "text",
            text: `Unknown component: ${component_name}. Available: ${Object.keys(componentSpecs).join(", ")}`,
          },
        ],
        isError: true,
      };
    }
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(spec, null, 2),
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
