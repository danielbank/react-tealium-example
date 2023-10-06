import { useUtag } from "hooks/useUtag";
import type { Utag } from "hooks/useUtag";

export const ShirtsForm = () => {
  const utag: Utag = useUtag();
  return (
    <div>
      <h1>Acme Inc. Mens Fashion</h1>
      <input
        name="shirts"
        type="range"
        min="0"
        max="100"
        step="1"
        onChange={(e) => {
          utag.link({
            tealium_event: "Change Quantity",
            product_id: ["12345"],
            product_name: ["Lucky Shirt"],
            product_quantity: [e.target.value],
            product_price: ["12.99"],
          });
        }}
      />
    </div>
  );
};
