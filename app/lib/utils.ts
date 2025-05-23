import { useLocation, useRouteLoaderData } from "@remix-run/react";
import type { FulfillmentStatus } from "@shopify/hydrogen/customer-account-api-types";
import type { MoneyV2 } from "@shopify/hydrogen/storefront-api-types";
import { type ClassValue, clsx } from "clsx";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import { type LinkHTMLAttributes, useEffect, useState } from "react";
import type { MenuFragment } from "storefrontapi.generated";
import { twMerge } from "tailwind-merge";
import typographicBase from "typographic-base/index";
import { countries } from "~/data/countries";
import type { RootLoader } from "~/root";
import type { EnhancedMenu } from "./types/menu";
import type { I18nLocale } from "./types/type-locale";

export function missingClass(string?: string, prefix?: string) {
  if (!string) {
    return true;
  }

  const regex = new RegExp(` ?${prefix}`, "g");
  return string.match(regex) === null;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatText(input?: string | React.ReactNode) {
  if (!input) {
    return;
  }

  if (typeof input !== "string") {
    return input;
  }

  return typographicBase(input, { locale: "en-us" }).replace(
    /\s([^\s<]+)\s*$/g,
    "\u00A0$1",
  );
}

export function getExcerpt(text: string) {
  const regex = /<p.*>(.*?)<\/p>/;
  const match = regex.exec(text);
  return match?.length ? match[0] : text;
}

export function isNewArrival(date: string, daysOld = 30) {
  return (
    new Date(date).valueOf() >
    new Date().setDate(new Date().getDate() - daysOld).valueOf()
  );
}

export function isDiscounted(price: MoneyV2, compareAtPrice: MoneyV2) {
  if (compareAtPrice?.amount > price?.amount) {
    return true;
  }
  return false;
}

function resolveToFromType(
  {
    customPrefixes,
    pathname,
    type,
  }: {
    customPrefixes: Record<string, string>;
    pathname?: string;
    type?: string;
  } = {
    customPrefixes: {},
  },
) {
  if (!pathname || !type) return "";

  /*
    MenuItemType enum
    @see: https://shopify.dev/api/storefront/unstable/enums/MenuItemType
  */
  const defaultPrefixes = {
    BLOG: "blogs",
    COLLECTION: "collections",
    COLLECTIONS: "collections", // Collections All (not documented)
    FRONTPAGE: "frontpage",
    HTTP: "",
    PAGE: "pages",
    CATALOG: "collections/all", // Products All
    PRODUCT: "products",
    SEARCH: "search",
    SHOP_POLICY: "policies",
  };

  const pathParts = pathname.split("/");
  const handle = pathParts.pop() || "";
  const routePrefix: Record<string, string> = {
    ...defaultPrefixes,
    ...customPrefixes,
  };

  switch (true) {
    // special cases
    case type === "FRONTPAGE":
      return "/";

    case type === "ARTICLE": {
      const blogHandle = pathParts.pop();
      return routePrefix.BLOG
        ? `/${routePrefix.BLOG}/${blogHandle}/${handle}/`
        : `/${blogHandle}/${handle}/`;
    }

    case type === "COLLECTIONS":
      return `/${routePrefix.COLLECTIONS}`;

    case type === "SEARCH":
      return `/${routePrefix.SEARCH}`;

    case type === "CATALOG":
      return `/${routePrefix.CATALOG}`;

    // common cases: BLOG, PAGE, COLLECTION, PRODUCT, SHOP_POLICY, HTTP
    default:
      return routePrefix[type]
        ? `/${routePrefix[type]}/${handle}`
        : `/${handle}`;
  }
}

/*
  Parse each menu link and adding, isExternal, to and target
*/
function parseItem(primaryDomain: string, env: Env, customPrefixes = {}) {
  return (
    item:
      | MenuFragment["items"][number]
      | MenuFragment["items"][number]["items"][number],
  ):
    | EnhancedMenu["items"][0]
    | EnhancedMenu["items"][number]["items"][0]
    | null => {
    if (!item?.url || !item?.type) {
      // eslint-disable-next-line no-console
      console.warn("Invalid menu item.  Must include a url and type.");
      return null;
    }

    // extract path from url because we don't need the origin on internal to attributes
    const { host, pathname } = new URL(item.url);

    const isInternalLink =
      host === new URL(primaryDomain).host || host === env.PUBLIC_STORE_DOMAIN;

    const parsedItem = isInternalLink
      ? // internal links
        {
          ...item,
          isExternal: false,
          target: "_self",
          to: resolveToFromType({ type: item.type, customPrefixes, pathname }),
        }
      : // external links
        {
          ...item,
          isExternal: true,
          target: "_blank",
          to: item.url,
        };

    if ("items" in item) {
      return {
        ...parsedItem,
        items: item.items
          // @ts-ignore
          .map(parseItem(primaryDomain, env, customPrefixes))
          .filter(Boolean),
      } as EnhancedMenu["items"][number];
    }
    return parsedItem as EnhancedMenu["items"][number]["items"][number];
  };
}

/*
  Recursively adds `to` and `target` attributes to links based on their url
  and resource type.
  It optionally overwrites url paths based on item.type
*/
export function parseMenu(
  menu: MenuFragment,
  primaryDomain: string,
  env: Env,
  customPrefixes = {},
): EnhancedMenu | null {
  if (!menu?.items) {
    // eslint-disable-next-line no-console
    console.warn("Invalid menu passed to parseMenu");
    return null;
  }

  const parser = parseItem(primaryDomain, env, customPrefixes);

  const parsedMenu = {
    ...menu,
    items: menu.items.map(parser).filter(Boolean),
  } as EnhancedMenu;

  return parsedMenu;
}

export const INPUT_STYLE_CLASSES =
  "appearance-none rounded dark:bg-transparent border focus:border-line/50 focus:ring-0 w-full py-2 px-3 text-body/90 placeholder:text-body/50 leading-tight focus:shadow-outline";

export const getInputStyleClasses = (isError?: string | null) => {
  return `${INPUT_STYLE_CLASSES} ${
    isError ? "border-red-500" : "border-line/20"
  }`;
};

export function statusMessage(status: FulfillmentStatus) {
  const translations: Record<FulfillmentStatus, string> = {
    SUCCESS: "Success",
    PENDING: "Pending",
    OPEN: "Open",
    FAILURE: "Failure",
    ERROR: "Error",
    CANCELLED: "Cancelled",
  };
  try {
    return translations?.[status];
  } catch (error) {
    return status;
  }
}

export const DEFAULT_LOCALE: I18nLocale = Object.freeze({
  ...countries.default,
  pathPrefix: "",
});

export function getLocaleFromRequest(request: Request): I18nLocale {
  const url = new URL(request.url);
  const firstPathPart = `/${url.pathname.substring(1).split("/")[0].toLowerCase()}`;

  return countries[firstPathPart]
    ? {
        ...countries[firstPathPart],
        pathPrefix: firstPathPart,
      }
    : {
        ...countries.default,
        pathPrefix: "",
      };
}

export function usePrefixPathWithLocale(path: string) {
  const rootData = useRouteLoaderData<RootLoader>("root");
  const selectedLocale = rootData?.selectedLocale ?? DEFAULT_LOCALE;

  return `${selectedLocale.pathPrefix}${
    path.startsWith("/") ? path : `/${path}`
  }`;
}

export function useIsHomePath() {
  let { pathname } = useLocation();
  let rootData = useRouteLoaderData<RootLoader>("root");
  let selectedLocale = rootData?.selectedLocale ?? DEFAULT_LOCALE;
  let strippedPathname = pathname.replace(selectedLocale.pathPrefix, "");
  return strippedPathname === "/";
}

export function parseAsCurrency(value: number, locale: I18nLocale) {
  return new Intl.NumberFormat(`${locale.language}-${locale.country}`, {
    style: "currency",
    currency: locale.currency,
  }).format(value);
}

/**
 * Validates that a url is local
 * @param url
 * @returns `true` if local `false`if external domain
 */
export function isLocalPath(url: string) {
  try {
    // We don't want to redirect cross domain,
    // doing so could create fishing vulnerability
    // If `new URL()` succeeds, it's a fully qualified
    // url which is cross domain. If it fails, it's just
    // a path, which will be the current domain.
    new URL(url);
  } catch (e) {
    return true;
  }

  return false;
}

export function removeFalsy<T = any>(
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  obj: {},
  falsyValues: any[] = ["", null, undefined],
): T {
  if (!obj || typeof obj !== "object") return obj as any;

  return Object.entries(obj).reduce((a: any, c) => {
    let [k, v]: [string, any] = c;
    if (
      falsyValues.indexOf(v) === -1 &&
      JSON.stringify(removeFalsy(v, falsyValues)) !== "{}"
    ) {
      a[k] =
        typeof v === "object" && !Array.isArray(v)
          ? removeFalsy(v, falsyValues)
          : v;
    }
    return a;
  }, {}) as T;
}

export function getImageAspectRatio(
  image: {
    width?: number | null;
    height?: number | null;
    [key: string]: any;
  },
  aspectRatio: string,
) {
  if (aspectRatio === "adapt") {
    if (image?.width && image?.height) {
      return `${image.width}/${image.height}`;
    }
    return "1/1";
  }
  return aspectRatio;
}

export function loadCSS(attrs: LinkHTMLAttributes<HTMLLinkElement>) {
  return new Promise((resolve, reject) => {
    let found = document.querySelector(`link[href="${attrs.href}"]`);
    if (found) {
      return resolve(true);
    }
    let link = document.createElement("link");
    Object.assign(link, attrs);
    link.addEventListener("load", () => resolve(true));
    link.onerror = reject;
    document.head.appendChild(link);
  });
}

export function prefixClassNames(contentHtml: string, prefix: string) {
  const [articleContent, setArticleContent] = useState<string>("");
  const prefixClassNames = (html: string, prefix: string) => {
    html = html.replace(/class="([^"]*)"/g, (match, classNames) => {
      const prefixedClassNames = classNames
        .split(" ")
        .map((className: string) => `${prefix}${className}`)
        .join(" ");
      return `class="${prefixedClassNames}"`;
    });
    html = html.replace(/(\.[a-zA-Z0-9_-]+)\s*{/g, (match, className) => {
      return `.${prefix}${className.slice(1)} {`;
    });

    return html;
  };
  useEffect(() => {
    if (contentHtml) {
      const prefixedContent = prefixClassNames(contentHtml, prefix);
      setArticleContent(prefixedContent);
    }
  }, [contentHtml]);
  return articleContent;
}

extend([namesPlugin]);

export function isLightColor(color: string, threshold = 0.8) {
  let c = colord(color);
  return c.isValid() && c.brightness() > threshold;
}
