"use client";

interface Props {
  discountCodeEnabled: boolean;
  discountCode: string;
  setDiscountCode: (code: string) => void;
}

const NewCheckout: React.FC<Props> = (props) => {
  const { discountCodeEnabled, discountCode, setDiscountCode } = props;
  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 border border-blue-200 rounded">
        <p className="text-blue-900 font-semibold">
          🎉 New Checkout Experience
        </p>
        <p className="text-blue-800 text-sm mt-1">
          You're part of our beta group! Enjoy the improved one-step checkout.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-slate-300 rounded lg:rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
            defaultValue="user@example.com"
          />
        </div>

        {discountCodeEnabled && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              🎁 Discount Code (New Feature!)
            </label>
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="SAVE10"
            />
            <p className="text-xs text-slate-500 mt-1">
              Enter a discount code to see your savings
            </p>
          </div>
        )}

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition">
          Complete Purchase
        </button>
      </div>
    </div>
  );
};

export default NewCheckout;
