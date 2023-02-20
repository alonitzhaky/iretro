import React, { useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { selectCart } from "../Cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { newOrderAsync } from "./orderSlice";
import { selectNewAddress, selectNewCity, selectNewCountry, selectNewZipCode } from "./orderSlice";

const PaypalButton = () => {
  const dispatch = useAppDispatch()
  const cart = useAppSelector(selectCart)
  const address = useAppSelector(selectNewAddress)
  const city = useAppSelector(selectNewCity)
  const country = useAppSelector(selectNewCountry)
  const zip_code = useAppSelector(selectNewZipCode)

  let total = 0

  useEffect(() => {
    let newTotal = 0
    for (let index = 0; index < cart.length; index++) {
      newTotal += cart[index].price * cart[index].quantity + (Number.EPSILON * 100 / 100)
      total = newTotal
    }
  }, [cart])

  const handleApprove = (data: any, actions: any) => {
    if (actions.order) {
      return actions.order
        .capture()
        .then((details: any) => {
          dispatch(newOrderAsync({ orderDetails: cart }));
          toast.success(
            "Payment completed. Thank you " +
            (details.payer.name?.given_name || ""),
            {
              position: toast.POSITION.TOP_CENTER
            }
          );
        }, localStorage.removeItem("cart"),
          setTimeout(function () {
            window.location.replace("/")
          }, 3000)
        )
        .catch((error: any) => {
          toast.error("Error capturing the payment. Please try again.", {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    }
    return Promise.resolve()
  }

  return (
    <div>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AYAwtlmAjZaOpJIltcq1JhQPVM7S5Ge5bAAy2CfshzmC3XbMOWGzrjDH6N446YVG5Ula6yDEdrZHlsGD",
        }}
      >
        <PayPalButtons
          disabled={!address || !city || !country || !zip_code}
          style={{
            color: 'black',
            label: 'pay',
            height: 50,
            layout: 'vertical'
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: { value: String(total) },
                },
              ],
            });
          }}
          onApprove={(data, action) => handleApprove(data, action)}
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