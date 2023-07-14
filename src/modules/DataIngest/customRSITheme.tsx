// custom theme for react-spreashsheet-importer component (used by DataIngest.tsx)
export const customRSITheme = {
  colors: {
    textColor: "var(--color-supervan)",
    subtitleColor: "var(--color-supervan-dark)",
    inactiveColor: "var(--color-supervan-light)",
    border: "var(--color-supervan)",
    // background: "white";
    backgroundAlpha: "rgba(255,255,255,0)",
    secondaryBackground: "var(--color-supervan-light)",
    // highlight: "#E2E8F0";
    rsi: {
      50: "var(--color-supervan-extralight)",
      100: "var(--color-supervan-mediumlight)",
      200: "#A2A5FC",
      300: "#8888FC",
      400: "#7069FA",
      500: "var(--color-supervan)",
      600: "var(--color-supervan-dark)",
      700: "#3525E6",
      800: "#1D0EBE",
      900: "#0C008C",
    },
  },
  components: {
    UploadStep: {
      baseStyle: {
        dropzoneButton: {
          bg: "var(--color-supervan)",
        },
      },
    },
  },
  styles: {
    global: {
      ".rdg": {
        contain: "size layout style paint",
        borderRadius: "lg",
        border: "none",
        borderTop: "1px solid var(--rdg-border-color)",
        blockSize: "100%",
        "--rdg-row-height": "35px",
        "--rdg-color": "var(--color-supervan-dark)",
        "--rdg-background-color": "white",
        "--rdg-header-background-color": "white",
        "--rdg-row-hover-background-color": "var(--color-supervan-light)",
        "--rdg-selection-color": "var(--colors-supervan)",
        "--rdg-row-selected-background-color": "var(--chakra-colors-rsi-50)",
        "--row-selected-hover-background-color": "var(--chakra-colors-rsi-100)",
        "--rdg-error-cell-background-color": "var(--chakra-colors-red-50)",
        "--rdg-warning-cell-background-color": "var(--chakra-colors-orange-50)",
        "--rdg-info-cell-background-color": "var(--chakra-colors-blue-50)",
        "--rdg-border-color": "var(--chakra-colors-border)",
        "--rdg-frozen-cell-box-shadow": "none",
        "--rdg-checkbox-color": "red",
        "--rdg-font-size": "var(--chakra-fontSizes-sm)",
      },
    },
  },
};
