import type { Storefront } from "@shopify/hydrogen";
import { PRODUCT_QUERY, VARIANTS_QUERY } from "~/graphql/data/queries";

export let getProductData = async (storefront: Storefront, handle: string, metafield: string) => {
  const { shop, product } = await storefront.query(PRODUCT_QUERY, {
    variables: {
      handle: handle,
      selectedOptions: [],
      namespace: metafield.split('.')[0],
      key: metafield.split('.')[1],
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });
  const variants = await storefront.query(VARIANTS_QUERY, {
    variables: {
      handle: handle,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });
  return {
    variants,
    product,
    shop,
    storeDomain: shop.primaryDomain.url,
    // recommended
  };
};

export type ProductData = Awaited<ReturnType<typeof getProductData>>;
