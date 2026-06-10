import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const designTokens = {
  colors: {
    primary: {
      50: "#E8F0FE",   // Google Blue Light Accent
      100: "#D2E3FC",  // Google Blue Soft
      200: "#AECBFA",  // Google Blue Muted Border
      300: "#7BAAF7",  // Google Blue Soft Active
      400: "#4285F4",  // Google Blue (Standard Brand)
      500: "#1A73E8",  // Google Blue (Standard Action)
      600: "#1967D2",  // Google Blue Hover
      700: "#185ABC",  // Google Blue Active
      800: "#174EA6",  // Google Blue Dark
      900: "#164580",  // Google Blue Deep
    },
    neutral: {
      50: "#F8F9FA",   // Google Cool Gray Lightest
      100: "#F1F3F4",  // Google Cool Gray Soft
      200: "#E8EAED",  // Google Cool Gray Border Muted
      300: "#DADCE0",  // Google Cool Gray Border
      400: "#BDC1C6",  // Google Cool Gray Muted Icon
      500: "#9AA0A6",  // Google Cool Gray Secondary Icon
      600: "#80868B",  // Google Cool Gray Muted Text
      700: "#5F6368",  // Google Cool Gray Text
      800: "#3C4043",  // Google Cool Gray Dark Text
      900: "#202124",  // Google Cool Gray Darkest Text
    },
    success: "#34A853", // Google Green
    danger: "#EA4335",  // Google Red
    warning: "#FBBC05", // Google Yellow
    info: "#4285F4",    // Google Blue
    googleBlue: "#4285F4",
    googleRed: "#EA4335",
    googleYellow: "#FBBC05",
    googleGreen: "#34A853",
    background: "#F8F9FA", // Google Light Gray Background
    surface: "#FFFFFF",
    textPrimary: "#202124",
    textSecondary: "#5F6368",
    textMuted: "#80868B",
  },
  typography: {
    fontFamily: "'Google Sans', 'Product Sans', 'Roboto', 'Inter', system-ui, -apple-system, sans-serif",
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
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15)", // Clean Material shadow
    md: "0 1px 3px 0 rgba(60, 64, 67, 0.3), 0 4px 8px 3px rgba(60, 64, 67, 0.15)",
    lg: "0 4px 4px 0 rgba(60, 64, 67, 0.30), 0 8px 12px 6px rgba(60, 64, 67, 0.15)",
  },
  transitions: {
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    normal: "250ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "350ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
};

const componentSpecs = {
  button: {
    description: "Button component with Google branding and tactile Material feel",
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
        hoverBackground: designTokens.colors.primary[50],
        activeBackground: designTokens.colors.primary[100],
        text: designTokens.colors.primary[500],
        border: `1px solid ${designTokens.colors.neutral[300]}`,
        padding: `${designTokens.spacing.scale[2]} ${designTokens.spacing.scale[4]}`,
        borderRadius: designTokens.borderRadius.lg,
        fontWeight: designTokens.typography.weight.medium,
        fontSize: designTokens.typography.scale.sm,
        transition: designTokens.transitions.fast,
      },
      danger: {
        background: designTokens.colors.danger,
        hoverBackground: "#D93025",
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
    description: "Material-style container card with rich hover depth",
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
    description: "Google Material-style input field",
    styles: {
      background: designTokens.colors.surface,
      border: `1px solid ${designTokens.colors.neutral[300]}`,
      focusBorder: designTokens.colors.primary[500],
      borderRadius: designTokens.borderRadius.md,
      padding: `${designTokens.spacing.scale[2]} ${designTokens.spacing.scale[3]}`,
      fontSize: designTokens.typography.scale.base,
      color: designTokens.colors.textPrimary,
      placeholderColor: designTokens.colors.textMuted,
      focusRing: `0 0 0 2px ${designTokens.colors.primary[100]}`,
      transition: designTokens.transitions.fast,
    },
  },
  checkbox: {
    description: "Custom styled Google-blue checkbox",
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
    description: "Playful Google status badge/tag with high-contrast text",
    variants: {
      completed: {
        background: "#E6F4EA", // Google Green Light
        text: "#137333",       // Google Green Dark
        padding: `${designTokens.spacing.scale[1]} ${designTokens.spacing.scale[2]}`,
        borderRadius: designTokens.borderRadius.full,
        fontSize: designTokens.typography.scale.xs,
        fontWeight: designTokens.typography.weight.medium,
      },
      pending: {
        background: "#FEF7E0", // Google Yellow Light
        text: "#B06000",       // Google Yellow Dark
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
