import {
  Description,
  Field,
  Label,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import { LoginPage } from "./LoginPage";
import { Fragment, useEffect, useState } from "react";
import clsx from "clsx";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import {
  Button,
  Cart,
  CartProduct,
  LoginForm,
  PersonalInfoCard,
  RegisterForm,
} from "../components";
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import {
  hasSpecificAnimals,
  selectTotalDiscountedPrice,
  selectTotalPrice,
  selectTotalQuantity,
} from "../redux/cartItemsSlice";
import { login } from "../redux/userSlice";
import { useRegister } from "../hooks";
import { useNavigate } from "react-router-dom";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import {
  selectCourierOption,
  selectPaymentMethod,
  setCourierOption,
  setPaymentMethod,
} from "../redux/orderSlice";
import Modal from "../components/Modal/Modal";
import { openAlert } from "../redux/alertSlice";

const auth = ["Login", "Signup", "Without account"];
const courriers = [
  {
    name: "Courrier 1",
    arrivalTime: "24h-72h",
    acceptsLiveStock: true,
    price: 10,
  },
  {
    name: "Courrier 2",
    arrivalTime: "24h-48h",
    acceptsLiveStock: false,
    price: 15,
  },
  { name: "Courrier 3", arrivalTime: "24h", acceptsLiveStock: true, price: 20 },
];
const paymentMethods = [
  { name: "Credit Card" },
  { name: "PayPal" },
  { name: "Delivary" },
];
export function CheckOutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authSelected, setAuthSelected] = useState("");

  const isAlertOpen = useSelector((state) => state.alert.isAlertOpen);
  const user = useSelector((state) => state.user);
  const userPersonalData = useSelector((state) => state.user.personalData);
  const { handleLogin } = useAuth();
  const { handleRegister } = useRegister();
  const cartItems = useSelector((state) => state.cartItems);
  const cartQuatity = useSelector(selectTotalQuantity);
  const totalPrice = useSelector(selectTotalPrice);
  const totalDiscountedPrice = useSelector(selectTotalDiscountedPrice);
  const hasAnimals = hasSpecificAnimals(cartItems);
  const order = useSelector((state) => state.order);

  useEffect(() => {
    console.log(order);
  }, [order]);

  const handleNoAccountClick = (e) => {
    e.preventDefault();
  };
  const handleGoToPayment = () => {
    dispatch(openAlert());
  };
  const selectedPaymentMethod = useSelector(selectPaymentMethod);
  const selectedCourier = useSelector(selectCourierOption);

  const handlePaymentChange = (method) => {
    if (!method) {
      console.error("handlePaymentChange received an undefined method!");
      return;
    }
    dispatch(setPaymentMethod(method));
  };

  const handleCourierChange = (courier) => {
    if (!courier) {
      console.error("handleCourierChange received an undefined courier!");
      return;
    }
    dispatch(setCourierOption(courier));
  };

  return (
    <>
      <div className="p-6">
        {user.isAuthenticated ? (
          <div>
            <PersonalInfoCard />
            <p className="flex justify-center items-center text-2xl pt-10">
              Your cart:
            </p>
            <div className="divide-y divide-gray-300">
              <Cart />
            </div>
            <p className="flex justify-center items-center text-xl pt-10">
              Chose a delivery option:
            </p>
            <div className="w-full p-3">
              <div className="mx-auto w-full max-w-md">
                <RadioGroup
                  by="name"
                  value={selectedCourier}
                  onChange={(value) => handleCourierChange(value)}
                  aria-label="Server size"
                  className="space-y-2 flex flex-wrap"
                >
                  {courriers.map((courrier) => (
                    <Radio
                      disabled={!courrier.acceptsLiveStock && hasAnimals}
                      key={courrier.name}
                      value={courrier}
                      className="flex group relative cursor-pointer rounded-[18px] bg-white py-4 px-5 text-black shadow-md transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-dark-green data-[disabled]:bg-gray-300 data-[disabled]:"
                    >
                      <div className="flex w-full items-center justify-between">
                        <div className="text-sm/6">
                          <div className="flex flex-col gap-2 text-black/50 group-data-[checked]:text-white group-data-[disabled]:text-red-600">
                            <p className="font-semibold text-black  group-data-[checked]:text-white">
                              {courrier.name}
                            </p>
                            <div>
                              {courrier.acceptsLiveStock
                                ? "Accepts delivery of live animals"
                                : "Dosen't accept delivery of live animals"}
                            </div>
                          </div>
                          <div className="flex  justify-between group-data-[checked]:text-white ">
                            <p className="">{courrier.arrivalTime}</p>
                            <div className="">${courrier.price.toFixed(2)}</div>
                          </div>
                        </div>
                        <CheckCircleIcon className="size-6 fill-white opacity-0 transition group-data-[checked]:opacity-100" />
                      </div>
                    </Radio>
                  ))}
                </RadioGroup>
              </div>
            </div>
            {/* Payment Method Selection */}
            <p className="flex justify-center items-center text-xl pt-10 p-3">
              Choose a payment method:
            </p>
            <div className="w-full p-3">
              <div className="mx-auto w-full max-w-md">
                <RadioGroup
                  by="name"
                  value={selectedPaymentMethod}
                  onChange={(value) => handlePaymentChange(value)}
                  aria-label="Payment Method"
                  className="space-y-2 flex justify-center flex flex-col "
                >
                  {paymentMethods.map((method) => (
                    <Radio
                      key={method.name}
                      value={method}
                      className="flex group relative cursor-pointer rounded-[18px] bg-white py-4 px-5 text-black shadow-sm transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-dark-green"
                    >
                      <div className="flex w-full items-center justify-between">
                        <p className="font-semibold text-black group-data-[checked]:text-white">
                          {method.name}
                        </p>
                        <CheckCircleIcon className="size-6 fill-white opacity-0 transition group-data-[checked]:opacity-100" />
                      </div>
                    </Radio>
                  ))}
                </RadioGroup>
              </div>
            </div>

            <div className="mt-6 border-t border-gray-300 pt-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Subtotal:</span>
                <span>${Number(totalPrice).toFixed(2)}</span>
              </div>
              {totalDiscountedPrice < totalPrice && (
                <div className="flex justify-between text-lg font-semibold text-red-600">
                  <span>Discounted Price:</span>

                  <span>${Number(totalDiscountedPrice).toFixed(2)}</span>
                </div>
              )}
              {selectedCourier && (
                <div className="flex justify-between text-lg font-semibold text-blue-900">
                  <span>Shipping Cost:</span>
                  <span>${Number(selectedCourier.price).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold border-t border-gray-400 pt-4">
                <span>Total:</span>
                <span>
                  $
                  {selectedCourier
                    ? (
                        Number(totalDiscountedPrice) +
                        Number(selectedCourier.price)
                      ).toFixed(2)
                    : Number(totalDiscountedPrice).toFixed(2)}
                </span>
              </div>
            </div>
            <div className="mt-10">
              <Button title="Go to payment" handleClick={handleGoToPayment} />
              <Modal
                title={
                  order.paymentMethod && order.courierOption
                    ? "Now to payment..."
                    : "You need to choose a peyment and shiping method! "
                }
                description={
                  order.paymentMethod && order.courierOption
                    ? "Your payment has been successfully submitted. We’ve sent you an email with all of the details of your order."
                    : "You forgot to chose one of the otions. We can not get to payment without these informations."
                }
                navigateToHome={true}
              />
            </div>
          </div>
        ) : (
          <div>
            <p className="text-center text-2xl p-3">
              How wold you like to continue:
            </p>
            <RadioGroup
              value={authSelected}
              onChange={setAuthSelected}
              aria-label="Server size"
              className="flex flex-col items-center gap-2 justify-center p-3"
            >
              {auth.map((plan) => (
                <Field key={plan} className="flex items-center gap-2 w-full">
                  <Radio
                    value={plan}
                    className="group  text-center mx-auto p-2 border border-dark-green rounded-[18px] w-full items-center text-center data-[checked]:bg-dark-green data-[checked]:text-white transition"
                  >
                    {plan}
                  </Radio>
                </Field>
              ))}
            </RadioGroup>
            {authSelected === "Login" && (
              <div className="p-3">
                <LoginForm handleLogin={handleLogin} />
              </div>
            )}
            {authSelected === "Signup" && (
              <div className="p-3">
                <RegisterForm handleRegister={handleRegister} />
              </div>
            )}
            {authSelected === "Without account" && (
              <div className="p-3">
                <Button
                  title="Continue without account!"
                  handleClick={handleNoAccountClick}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
