import type {MetaFunction} from '@remix-run/react';
import {
  getPaginationVariables,
  getSeoMeta,
  type SeoConfig,
} from '@shopify/hydrogen';
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {json} from '@shopify/remix-oxygen';
import {routeHeaders} from '~/data/cache';
import {ALL_PRODUCTS_QUERY} from '~/graphql/data/queries';
import {PAGINATION_SIZE} from '~/lib/utils/const';
import {seoPayload} from '~/lib/seo.server';
import {WeaverseContent} from '~/weaverse';
import invariant from 'tiny-invariant';

export const headers = routeHeaders;

export async function loader({
  request,
  context: {storefront, weaverse},
}: LoaderFunctionArgs) {
  const variables = getPaginationVariables(request, {pageBy: PAGINATION_SIZE});

  const data = await storefront.query(ALL_PRODUCTS_QUERY, {
    variables: {
      ...variables,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });

  invariant(data, 'No data returned from Shopify API');

  const seo = seoPayload.collection({
    url: request.url,
    collection: {
      id: 'all-products',
      title: 'All Products',
      handle: 'products',
      descriptionHtml: 'All the store products',
      description: 'All the store products',
      seo: {
        title: 'All Products',
        description: 'All the store products',
      },
      metafields: [],
      products: data.products,
      updatedAt: '',
    },
  });

  return json({
    products: data.products,
    seo,
    weaverseData: await weaverse.loadPage({
      type: 'ALL_PRODUCTS',
    }),
  });
}

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return getSeoMeta(data!.seo as SeoConfig);
};
export default function AllProducts() {
  return <WeaverseContent />;
}
