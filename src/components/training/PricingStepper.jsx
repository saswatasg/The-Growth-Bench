import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { formatINR, BASE_PRICE_PAISE, MAX_SELF_SERVE_SEATS } from '@/lib/training';

const PricingStepper = ({ seatCount, setSeatCount, pricing, onDiscountApply, discountError }) => {
  const isBulk = seatCount > MAX_SELF_SERVE_SEATS;

  return (
    <div className="p-6 bg-soft-cloud border border-hairline-soft sticky top-24">
      <h3 className="text-heading-md text-ink mb-4">Pricing</h3>

      {/* Seat stepper */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-body-md text-ink">Seats</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSeatCount(Math.max(1, seatCount - 1))}
            disabled={seatCount <= 1}
            className="w-8 h-8 rounded-full border border-hairline-soft flex items-center justify-center text-ink hover:bg-canvas disabled:opacity-30 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-display text-heading-lg text-ink w-8 text-center">{seatCount}</span>
          <button
            onClick={() => setSeatCount(seatCount + 1)}
            className="w-8 h-8 rounded-full border border-hairline-soft flex items-center justify-center text-ink hover:bg-canvas transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Price breakdown */}
      <div className="border-t border-hairline-soft pt-4 space-y-2">
        <div className="flex justify-between text-body-sm">
          <span className="text-mute">{seatCount} × {formatINR(BASE_PRICE_PAISE)}</span>
          <span className="text-ink">{formatINR(pricing.subtotal)}</span>
        </div>
        {pricing.discount > 0 && (
          <div className="flex justify-between text-body-sm">
            <span className="text-success">Discount ({pricing.discountCode})</span>
            <span className="text-success">−{formatINR(pricing.discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-heading-md border-t border-hairline-soft pt-3">
          <span className="text-ink">Total</span>
          <span className="text-ink">{formatINR(pricing.total)}</span>
        </div>
      </div>

      {/* Discount code */}
      {!isBulk && (
        <div className="mt-4 pt-4 border-t border-hairline-soft">
          <DiscountCodeField onApply={onDiscountApply} error={discountError} />
        </div>
      )}

      {/* Bulk pricing note */}
      {isBulk && (
        <p className="text-body-sm text-mute mt-4">
          For {seatCount} seats, we offer custom bulk pricing. Contact us to discuss.
        </p>
      )}
    </div>
  );
};

const DiscountCodeField = ({ onApply, error }) => {
  const [code, setCode] = React.useState('');

  return (
    <div>
      <label className="text-body-sm text-ink mb-1 block">Discount code</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Enter code"
          className="flex-1 px-3 py-2 text-body-sm bg-canvas border border-hairline-soft focus:outline-none focus:border-ink transition-colors"
        />
        <button
          onClick={() => onApply(code)}
          className="px-4 py-2 text-body-sm font-medium bg-ink text-canvas hover:bg-charcoal transition-colors"
        >
          Apply
        </button>
      </div>
      {error && <p className="text-caption-sm text-sale mt-1">{error}</p>}
    </div>
  );
};

export default PricingStepper;
