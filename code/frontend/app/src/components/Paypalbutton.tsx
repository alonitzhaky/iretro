import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { useAppDispatch } from "../app/hooks";
import { newOrderAsync } from "./Order/orderSlice";
import Cart from "./Cart/Cart";

const PaypalButton = () => {
  const dispatch = useAppDispatch()

  return (
    <div>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AT_RMGrGtqhVq-71qKQiqGSgox1JmeVTRco64KeCMqaWOs7jRnSEI40iuG_jpyHsJnzbHNUf0ueCPtqi",
        }}
      >
        <PayPalButtons
           style= {{layout: 'vertical'}}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: { value: "10.00" },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            if (actions.order) {
              return actions.order.capture()
                .then(details => {
                  toast.success(
                    'Payment completed. Thank you ' + (details.payer.name?.given_name || ''),{
                      position: toast.POSITION.TOP_CENTER
                    }
                  );
                })
                .then(() => {
                  dispatch(newOrderAsync(order))
                  // Add your second operation here
                });
            }
            return Promise.resolve();
          }}          
          onCancel={() => {
            toast.error("You canelled the payment", {
              position: toast.POSITION.TOP_CENTER,
            });
          }}
          onError={() => {
            toast.error("There was an error with your payment, Try again", {
              position: toast.POSITION.TOP_CENTER,
            });
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PaypalButton;