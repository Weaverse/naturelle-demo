import type { HydrogenThemeSchema } from "@weaverse/hydrogen";
let variantSwatch = {
  configs: [],
  swatches: {
    imageSwatches: [],
    colorSwatches: [],
  },
};
export const themeSchema: HydrogenThemeSchema = {
  info: {
    version: "1.0.0",
    author: "Weaverse",
    name: "Naturélle",
    authorProfilePhoto:
      "https://cdn.shopify.com/s/files/1/0838/0052/3057/files/Weaverse_logo_-_3000x_e2fa8c13-dac2-4dcb-a2c2-f7aaf7a58169.png?v=1698245759",
    documentationUrl: "https://weaverse.io/docs",
    supportUrl: "https://weaverse.io/contact",
  },
  inspector: [
    {
      group: "Product swatches",
      inputs: [
        {
          type: "swatches",
          name: "swatches",
          label: "Config swatches",
          defaultValue: variantSwatch,
        },
      ],
    },
    {
      group: "Layout",
      inputs: [
        {
          type: "range",
          label: "Page width",
          name: "pageWidth",
          configs: {
            min: 1000,
            max: 1600,
            step: 10,
            unit: "px",
          },
          defaultValue: 1440,
        },
        {
          type: "range",
          label: "Nav height (mobile)",
          name: "navHeightMobile",
          configs: {
            min: 2,
            max: 8,
            step: 1,
            unit: "rem",
          },
          defaultValue: 3,
        },
        {
          type: "range",
          label: "Nav height (tablet)",
          name: "navHeightTablet",
          configs: {
            min: 2,
            max: 8,
            step: 1,
            unit: "rem",
          },
          defaultValue: 4,
        },
        {
          type: "range",
          label: "Nav height (desktop)",
          name: "navHeightDesktop",
          configs: {
            min: 2,
            max: 8,
            step: 1,
            unit: "rem",
          },
          defaultValue: 6,
        },
      ],
    },
    {
      group: "Announcement bar",
      inputs: [
        {
          type: "textarea",
          name: "content",
          label: "Text",
          defaultValue: "FREE SHIPPING IN THE US FOR ORDER OVER $100",
        },
        {
          type: "toggle-group",
          label: "Text size",
          name: "textSize",
          configs: {
            options: [
              { label: "S", value: "16" },
              { label: "M", value: "18" },
              { label: "L", value: "20" },
            ],
          },
          defaultValue: "16",
        },
        {
          type: "range",
          label: "Height",
          name: "announcementBarHeight",
          configs: {
            min: 10,
            max: 100,
            step: 1,
            unit: "px",
          },
          defaultValue: 48,
        },
        {
          type: "switch",
          name: "enableScrollingText",
          label: "Enable scrolling text",
          defaultValue: false,
        },
        {
          type: "range",
          name: "speed",
          label: "Speed",
          defaultValue: 9,
          configs: {
            min: 0.1,
            max: 20,
            step: 0.1,
            unit: "s",
          },
          condition: "enableScrollingText.eq.true",
        },
        {
          type: "range",
          name: "gap",
          label: "Gap",
          defaultValue: 10,
          configs: {
            min: 0,
            max: 100,
            step: 1,
            unit: "px",
          },
          condition: "enableScrollingText.eq.true",
        },
        {
          type: "switch",
          label: "Sticky",
          name: "stickyAnnouncementBar",
          defaultValue: true,
        },
        {
          type: "switch",
          name: "enableTrialShipping",
          label: "Enable trial shipping",
          defaultValue: false,
        },
      ],
    },
    {
      group: "Header",
      inputs: [
        {
          type: "select",
          name: "headerWidth",
          label: "Header width",
          configs: {
            options: [
              { value: "full", label: "Full page" },
              { value: "stretch", label: "Stretch" },
              { value: "fixed", label: "Fixed" },
            ],
          },
          defaultValue: "fixed",
        },
        {
          type: "toggle-group",
          label: "Header menu type for desktop",
          name: "typeMenuHeader",
          configs: {
            options: [
              { value: "mega", label: "Mega" },
              { value: "drawer", label: "Drawer" },
            ],
          },
          defaultValue: "mega",
        },
        {
          type: "toggle-group",
          label: "Type open menu",
          name: "typeOpenMenu",
          configs: {
            options: [
              { value: "mouseHover", label: "Mouse hover" },
              { value: "mouseClick", label: "Mouse click" },
            ],
          },
          defaultValue: "mouseHover",
          condition: "typeMenuHeader.eq.mega",
        },
        {
          type: "switch",
          label: "Enable transparent header",
          name: "enableTransparentHeader",
          defaultValue: true,
        },
        {
          type: "image",
          name: "logoData",
          label: "Logo",
          defaultValue: {
            altText: "Logo",
            url: "https://cdn.shopify.com/s/files/1/0838/0052/3057/files/naturelle_logo.png?v=1705045487",
            width: 320,
            height: 116,
          },
        },
        {
          type: "image",
          name: "transparentLogoData",
          label: "Transparent Logo",
          defaultValue: {
            altText: "Logo",
            url: "https://cdn.shopify.com/s/files/1/0652/5888/1081/files/Property_1_White.png?v=1720064102",
            width: 320,
            height: 116,
          },
          condition: "enableTransparentHeader.eq.true",
        },
        {
          type: "range",
          name: "logoWidth",
          label: "Logo width",
          configs: {
            min: 50,
            max: 500,
            step: 1,
            unit: "px",
          },
          defaultValue: 150,
        },
        {
          type: "toggle-group",
          label: "Search type for desktop",
          name: "searchType",
          configs: {
            options: [
              { value: "popupSearch", label: "Popup search" },
              { value: "drawerSearch", label: "Drawer search" },
            ],
          },
          defaultValue: "headerSearch",
        },
      ],
    },
    {
      group: "Footer",
      inputs: [
        {
          type: "select",
          name: "footerWidth",
          label: "Footer width",
          configs: {
            options: [
              { value: "full", label: "Full page" },
              { value: "stretch", label: "Stretch" },
              { value: "fixed", label: "Fixed" },
            ],
          },
          defaultValue: "fixed",
        },
        {
          type: "text",
          label: "Footer text Copyright @",
          name: "footerTextCopyright",
          defaultValue: "© 2024 Weaverse. All rights reserved.",
        },
        {
          type: "select",
          name: "tagNameTitle",
          label: "Tag name title",
          configs: {
            options: [
              { value: "h1", label: "<h1> (Heading 1)" },
              { value: "h2", label: "<h2> (Heading 2)" },
              { value: "h3", label: "<h3> (Heading 3)" },
              { value: "h4", label: "<h4> (Heading 4)" },
              { value: "h5", label: "<h5> (Heading 5)" },
              { value: "h6", label: "<h6> (Heading 6)" },
            ],
          },
          defaultValue: "h6",
        },
        {
          type: "heading",
          label: "Newsletter",
        },
        {
          type: "text",
          name: "newsletterTitle",
          label: "Newsletter title",
          defaultValue: "Newsletter",
        },
        {
          type: "text",
          name: "newsletterDescription",
          label: "Newsletter description",
          defaultValue:
            "Sign up for 15% off and updates straight to your inbox.",
        },
        {
          type: "text",
          name: "newsletterPlaceholder",
          label: "Input placeholder",
          defaultValue: "Enter your email",
        },
        {
          type: "text",
          name: "newsletterButtonText",
          label: "Button text",
          defaultValue: "Subcribe",
        },
      ],
    },
    {
      group: "Colors",
      inputs: [
        {
          type: "heading",
          label: "General",
        },
        {
          type: "color",
          label: "Background",
          name: "colorBackground",
          defaultValue: "#F0F2EE",
        },
        {
          type: "color",
          label: "Text (primary)",
          name: "colorTextPrimary",
          defaultValue: "#26490D",
        },
        {
          type: "color",
          label: "Text (subtle)",
          name: "colorTextSubtle",
          defaultValue: "#68887C",
        },
        {
          type: "color",
          label: "Text (inverse)",
          name: "colorTextInverse",
          defaultValue: "#FFFFFF",
        },
        {
          type: "heading",
          label: "Announcement bar",
        },
        {
          type: "color",
          label: "Announcement text",
          name: "topbarTextColor",
          defaultValue: "#26490D",
        },
        {
          type: "color",
          label: "Announcement border",
          name: "topbarBorderColor",
          defaultValue: "#3d490b",
        },
        {
          type: "color",
          label: "Announcement background",
          name: "topbarBgColor",
          defaultValue: "#E0E5D6",
        },
        {
          type: "heading",
          label: "Header",
        },
        {
          type: "color",
          label: "Header text",
          name: "headerText",
          defaultValue: "#26490D",
        },
        {
          type: "color",
          label: "Transparent header",
          name: "transparentHeader",
          defaultValue: "#ffffff",
        },
        {
          type: "color",
          label: "Header background",
          name: "headerBgColor",
          defaultValue: "#E0E5D6",
        },
        { type: "heading", label: "Footer" },
        {
          type: "color",
          label: "Footer text",
          name: "footerText",
          defaultValue: "#26490D",
        },
        {
          type: "color",
          label: "Footer background",
          name: "footerBgColor",
          defaultValue: "#E0E5D6",
        },
        { type: "heading", label: "Border" },
        {
          type: "color",
          label: "Border",
          name: "borderColor",
          defaultValue: "#386E4A",
        },
        {
          type: "color",
          label: "Border (subtle)",
          name: "borderSubtleColor",
          defaultValue: "#78A286",
        },
        {type: "heading", label: "Drawer"},
        {
          type: "color",
          label: "Drawer background",
          name: "drawerBgColor",
          defaultValue: "#E0E5D6",
        },
        { type: "heading", label: "Buttons" },
        {type: "heading", label: "Button primary"},
        {
          type: "color",
          label: "Button text",
          name: "buttonTextPrimary",
          defaultValue: "#EAEAD6",
        },
        {
          type: "color",
          label: "Button background",
          name: "buttonBgColorPrimary",
          defaultValue: "#2B602A",
        },
        {
          type: "color",
          label: "Button border",
          name: "buttonBorderColorPrimary",
          defaultValue: "#2E6A53",
        },
        {
          type: "color",
          label: "Button text (hover)",
          name: "buttonTextHoverPrimary",
          defaultValue: "#2E6A53",
        },
        {
          type: "color",
          label: "Button background (hover)",
          name: "buttonBgHoverPrimary",          
          defaultValue: "#F8F8F0",
        },
        {
          type: "color",
          label: "Button border (hover)",
          name: "buttonBorderHoverPrimary",
          defaultValue: "#2E6A53",
        },
        {type: "heading", label: "Button secondary"},
        {
          type: "color",
          label: "Button text",
          name: "buttonTextSecondary",
          defaultValue: "#2E6A53",
        },
        {
          type: "color",
          label: "Button background",
          name: "buttonBgColorSecondary",
          defaultValue: "#F8F8F0",
        },
        {
          type: "color",
          label: "Button border",
          name: "buttonBorderColorSecondary",
          defaultValue: "#2E6A53",
        },
        {
          type: "color",
          label: "Button text (hover)",
          name: "buttonTextHoverSecondary",
          defaultValue: "#F8F8F0",
        },
        {
          type: "color",
          label: "Button background (hover)",
          name: "buttonBgHoverSecondary",          
          defaultValue: "#2E6A53",
        },
        {
          type: "color",
          label: "Button border (hover)",
          name: "buttonBorderHoverSecondary",
          defaultValue: "#2E6A53",
        },
        {type: "heading", label: "Button outlined"},
        {
          type: "color",
          label: "Button text",
          name: "buttonTextOutline",
          defaultValue: "#25490B",
        },
        {
          type: "color",
          label: "Button border",
          name: "buttonBorderColorOutline",
          defaultValue: "#25490B",
        },
        {
          type: "color",
          label: "Button text (hover)",
          name: "buttonTextHoverOutline",
          defaultValue: "#25490B",
        },
        {
          type: "color",
          label: "Button border (hover)",
          name: "buttonBorderHoverOutline",
          defaultValue: "#25490B",
        },
        {type: "heading", label: "Label"},
        {
          type: "color",
          label: "Label text",
          name: "labelText",
          defaultValue: "#FFFFFF",
        },
        {
          type: "color",
          label: "Label background (sale)",
          name: "labelBgSale",
          defaultValue: "#AB2E2E",
        },
        {
          type: "color",
          label: "Label background (new)",
          name: "labelBgNew",
          defaultValue: "#87A473",
        },
        {
          type: "color",
          label: "Label background (sold out)",
          name: "labelBgSoldOut",
          defaultValue: "#A8A79C",
        },
      ],
    },
    {
      group: "Typography",
      inputs: [
        {
          type: "heading",
          label: "Headings",
        },
        {
          type: "select",
          label: "Letter spacing",
          name: "headingBaseSpacing",
          configs: {
            options: [
              { label: "-75", value: "-0.075em" },
              { label: "-50", value: "-0.05em" },
              { label: "-25", value: "-0.025em" },
              { label: "-12.5", value: "-0.0125em" },
              { label: "0", value: "0em" },
              { label: "12.5", value: "0.0125em" },
              { label: "25", value: "0.025em" },
              { label: "50", value: "0.05em" },
              { label: "75", value: "0.075em" },
              { label: "100", value: "0.1em" },
              { label: "150", value: "0.15em" },
              { label: "200", value: "0.2em" },
              { label: "250", value: "0.25em" },
            ],
          },
          defaultValue: "0.025em",
        },
        {
          type: "range",
          label: "Font size",
          name: "headingBaseSize",
          configs: {
            min: 22,
            max: 60,
            step: 1,
            unit: "px",
          },
          defaultValue: 38,
        },
        {
          type: "range",
          label: "Line height",
          name: "headingBaseLineHeight",
          configs: {
            min: 0.8,
            max: 2,
            step: 0.1,
          },
          defaultValue: 1.2,
        },
        {
          type: "heading",
          label: "Body text",
        },
        {
          type: "select",
          label: "Letter spacing",
          name: "bodyBaseSpacing",
          configs: {
            options: [
              { label: "-75", value: "-0.075em" },
              { label: "-50", value: "-0.05em" },
              { label: "-25", value: "-0.025em" },
              { label: "0", value: "0em" },
              { label: "25", value: "0.025em" },
              { label: "50", value: "0.05em" },
              { label: "75", value: "0.075em" },
              { label: "100", value: "0.1em" },
              { label: "150", value: "0.15em" },
              { label: "200", value: "0.2em" },
              { label: "250", value: "0.25em" },
            ],
          },
          defaultValue: "0.025em",
        },
        {
          type: "range",
          label: "Font size",
          name: "bodyBaseSize",
          configs: {
            min: 12,
            max: 48,
            step: 1,
            unit: "px",
          },
          defaultValue: 18,
        },
        {
          type: "range",
          label: "Line height",
          name: "bodyBaseLineHeight",
          configs: {
            min: 0.8,
            max: 2,
            step: 0.1,
          },
          defaultValue: 1.2,
        },
      ],
    },
    {
      group: "Animations and effects",
      inputs: [
        {
          type: "switch",
          label: "Enable view transition",
          name: "enableViewTransition",
          defaultValue: true,
        },
        {
          type: "switch",
          label: "Enable scroll reveal",
          name: "enableScrollReveal",
          defaultValue: true,
        },
      ],
    },
    {
      group: "Quick view",
      inputs: [
        {type: "heading", label: "Product form"},
        {
          type: "text",
          label: "Add to cart text",
          name: "addToCartText",
          defaultValue: "Add to cart",
          placeholder: "Add to cart",
        },
        {
          type: "text",
          label: "Sold out text",
          name: "soldOutText",
          defaultValue: "Sold out",
          placeholder: "Sold out",
        },
        {
          type: "text",
          label: "Unavailable text",
          name: "unavailableText",
          defaultValue: "Unavailable",
          placeholder: "Unavailable",
        },
        {
          type: "switch",
          label: "Show vendor",
          name: "showVendor",
          defaultValue: true,
        },
        {
          type: "switch",
          label: "Show sale price",
          name: "showSalePrice",
          defaultValue: true,
        },
        {
          type: "switch",
          label: "Show details",
          name: "showDetails",
          defaultValue: true,
        },
        {
          type: "switch",
          label: "Show shipping policy",
          name: "showShippingPolicy",
          defaultValue: true,
        },
        {
          type: "switch",
          label: "Show refund policy",
          name: "showRefundPolicy",
          defaultValue: true,
        },
        {
          label: "Hide unavailable options",
          type: "switch",
          name: "hideUnavailableOptions",
        },
        {type: "heading", label: "Product media"},
        {
          type: "select",
          name: "imageAspectRatio",
          label: "Aspect ratio",
          defaultValue: "1/1",
          configs: {
            options: [
              { value: "1/1", label: "Square (1/1)" },
              { value: "3/4", label: "Portrait (3/4)" },
              { value: "4/3", label: "Landscape (4/3)" },
              { value: "16/9", label: "Widescreen (16/9)" },
            ],
          },
        },
        { 
          label: "Media direction",
          name: "mediaDirection",
          type: "toggle-group",
          defaultValue: "horizontal",
          configs: {
            options: [
              { value: "horizontal", label: "Horizontal" },
              { value: "vertical", label: "Vertical" },
            ],
          },
        },
        {
          label: "Show slide counter",
          name: "showSlideCounter",
          type: "switch",
          defaultValue: true,
        },
        {
          label: "Show thumbnails",
          name: "showThumbnails",
          type: "switch",
          defaultValue: true,
        },
        {
          label: "Gap between images",
          name: "spacing",
          type: "range",
          configs: {
            min: 0,
            step: 2,
            max: 100,
          },
          defaultValue: 10,
          condition: "showThumbnails.eq.true",
        },
      ],
    },
    {
      group: "Product card",
      inputs: [
        {type: "heading", label: "Image"},
        {
          type: "range",
          name: "pcardBorderRadius",
          label: "Border radius",
          configs: {
            min: 0,
            max: 40,
            step: 2,
            unit: "px",
          },
          defaultValue: 4,
        },
        {
          type: "switch",
          name: "pcardShowImageOnHover",
          label: "Show second image on hover",
          defaultValue: true,
        },
        {
          type: "select",
          name: "pcardImageRatio",
          label: "Image aspect ratio",
          defaultValue: "1/1",
          configs: {
            options: [
              { value: "1/1", label: "Square (1/1)" },
              { value: "3/4", label: "Portrait (3/4)" },
              { value: "4/3", label: "Landscape (4/3)" },
              { value: "16/9", label: "Widescreen (16/9)" },
            ],
          },
          helpText:
            'Learn more about image <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio" target="_blank" rel="noopener noreferrer">aspect ratio</a> property.',
        },
        {type: "heading", label: "Content"},
        {
          type: "toggle-group",
          name: "pcardAlignment",
          label: "Content alignment",
          configs: {
            options: [
              { value: "left", label: "Left", icon: "align-start-vertical" },
              {
                value: "center",
                label: "Center",
                icon: "align-center-vertical",
              },
              { value: "right", label: "Right", icon: "align-end-vertical" },
            ],
          },
          defaultValue: "center",
        },
        {
          type: "switch",
          label: "Show vendor",
          name: "pcardShowVendor",
          defaultValue: true,
        },
        {
          type: "switch",
          label: "Show sale price",
          name: "pcardShowSalePrice",
          defaultValue: true,
          condition: "pcardShowLowestPrice.ne.true",
        },
        {
          type: "switch",
          label: "Show option values",
          name: "pcardShowOptionValues",
          defaultValue: true,
        },
        {
          type: "text",
          label: "Option to show",
          name: "pcardOptionToShow",
          defaultValue: "Color",
          placeholder: "Color",
          condition: "pcardShowOptionValues.eq.true",
        },
        {
          type: "range",
          label: "Max option values to show",
          name: "pcardMaxOptionValues",
          configs: {
            min: 2,
            max: 10,
          },
          defaultValue: 2,
          condition: "pcardShowOptionValues.eq.true",
        },
      ]
    }
  ],
};
