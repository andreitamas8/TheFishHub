import { Cart } from "../components";

export function CartPage() {
  return (
    <div>
      <div className="p-6">
        <p className="flex justify-center items-center text-2xl p-5">
          Your cart:
        </p>
        <div className="divide-y divide-gray-300">
          <Cart reason="checkout" />
        </div>
      </div>
    </div>
  );
}
