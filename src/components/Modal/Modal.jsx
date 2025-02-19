import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useDebugValue, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeAlert, openAlert } from "../../redux/alertSlice";
import { useNavigate } from "react-router-dom";

export default function Modal({ title, description, navigateToHome = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAlertOpen = useSelector((state) => state.alert.isAlertOpen);

  function open() {
    dispatch(openAlert());
  }

  function close() {
    dispatch(closeAlert());
    if (navigateToHome) navigate("/");
  }

  return (
    <>
      <Dialog
        open={isAlertOpen}
        as="div"
        className="relative z-10 focus:outline-none "
        onClose={close}
        __demoMode
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-xs" />
        </TransitionChild>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto transition">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl p-6 bg-oxford-blue  duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-white"
              >
                {title}
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-white/50">{description}</p>
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-white/70 py-1.5 px-3 text-sm/6 font-semibold text-black shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={close}
                >
                  Got it, thanks!
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
