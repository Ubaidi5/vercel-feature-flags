"use client";

interface Props {
  discountCodeEnabled: boolean;
  discountCode: string;
  setDiscountCode: (code: string) => void;
}

const LegacyCheckout: React.FC<Props> = (props) => {
  const { discountCodeEnabled, discountCode, setDiscountCode } = props;

  return (
    <div className="space-y-6">
      <div className="p-4 bg-amber-50 border border-amber-200 rounded">
        <p className="text-amber-900 font-semibold">Classic Checkout</p>
        <p className="text-amber-800 text-sm mt-1">
          You're using our classic checkout experience.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Billing Address
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
            placeholder="123 Main St"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Payment Method
          </label>
          <select className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-500">
            <option>Credit Card</option>
            <option>PayPal</option>
          </select>
        </div>

        {discountCodeEnabled && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Discount Code
            </label>
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
              placeholder="Enter code"
            />
          </div>
        )}

        <button className="w-full bg-slate-600 hover:bg-slate-700 text-white font-semibold py-3 rounded transition">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default LegacyCheckout;
