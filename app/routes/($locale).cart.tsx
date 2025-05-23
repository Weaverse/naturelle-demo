import { Await, type MetaFunction } from "@remix-run/react";
import type { CartQueryDataReturn } from "@shopify/hydrogen";
import { CartForm } from "@shopify/hydrogen";
import {
  type ActionFunctionArgs,
  type HeadersFunction,
  data,
} from "@shopify/remix-oxygen";
import { Suspense } from "react";
import type { CartApiQueryFragment } from "storefrontapi.generated";
import { CartMain } from "~/components/cart/Cart";
import { useRootLoaderData } from "~/root";

export const meta: MetaFunction = () => {
  return [{ title: `Hydrogen | Cart` }];
};

export const headers: HeadersFunction = ({ actionHeaders }) => actionHeaders;

export async function action({ request, context }: ActionFunctionArgs) {
  const { cart } = context;

  const [formData, customerAccessToken] = await Promise.all([
    request.formData(),
    await context.customerAccount.getAccessToken(),
  ]);

  const { action, inputs } = CartForm.getFormInput(formData);

  if (!action) {
    throw new Error("No action provided");
  }

  let status = 200;
  let result: CartQueryDataReturn;

  switch (action) {
    case CartForm.ACTIONS.LinesAdd:
      result = await cart.addLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds);
      break;
    case CartForm.ACTIONS.DiscountCodesUpdate: {
      const formDiscountCode = inputs.discountCode;

      // User inputted discount code
      const discountCodes = (
        formDiscountCode ? [formDiscountCode] : []
      ) as string[];

      // Combine discount codes already applied on cart
      discountCodes.push(...inputs.discountCodes);

      result = await cart.updateDiscountCodes(discountCodes);
      break;
    }
    case CartForm.ACTIONS.BuyerIdentityUpdate: {
      result = await cart.updateBuyerIdentity({
        ...inputs.buyerIdentity,
        customerAccessToken,
      });
      break;
    }
    default:
      throw new Error(`${action} cart action is not defined`);
  }

  const cartId = result.cart.id;
  const headers = cart.setCartId(result.cart.id);
  const { cart: cartResult, errors } = result;

  const redirectTo = formData.get("redirectTo") ?? null;
  if (typeof redirectTo === "string") {
    status = 303;
    headers.set("Location", redirectTo);
  }

  return data(
    {
      cart: cartResult,
      errors,
      analytics: {
        cartId,
      },
    },
    { status, headers },
  );
}

export default function Cart() {
  const rootData = useRootLoaderData();
  const cartPromise = rootData.cart;

  return (
    <div className="cart mb-16 h-full">
      <div className="bg-slate-300 h-48 flex items-center justify-center">
        <h1 className="font-bold p-4 text-center">Cart</h1>
      </div>
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await
          resolve={cartPromise}
          errorElement={<div>An error occurred</div>}
        >
          {(cart) => {
            return (
              <CartMain layout="page" cart={cart as CartApiQueryFragment} />
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}
