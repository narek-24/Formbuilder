"use client";

import { Toast } from "@base-ui/react/toast";
import { XIcon } from "lucide-react";

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Toast.Provider limit={1} timeout={3000}>
      {children}
      <Toast.Portal>
        <Toast.Viewport className="fixed bottom-4 left-4 z-10 mx-auto flex w-62.5 sm:bottom-8 sm:left-8 sm:w-75 lg:w-96">
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

function ToastList() {
  const { toasts } = Toast.useToastManager();
  return toasts.map((toast) => (
    <Toast.Root
      key={toast.id}
      toast={toast}
      className="data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]_translateY(var(--offset-y))] card absolute right-0 bottom-0 left-auto z-[calc(1000-var(--toast-index))] h-(--height) w-full origin-bottom transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))] bg-clip-padding p-4 shadow-xl/6 select-none [--gap:0.75rem] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))] [transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s] after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-[''] data-ending-style:opacity-0 data-expanded:h-(--toast-height) data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--offset-y)))] data-limited:opacity-0 data-starting-style:transform-[translateY(150%)] data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))] data-expanded:data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))] data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] data-expanded:data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] data-expanded:data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))] data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))] data-expanded:data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))] dark:shadow-xl/50 [&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:transform-[translateY(150%)]"
    >
      <Toast.Content className="overflow-hidden pl-2 text-foreground transition-opacity duration-250 data-behind:pointer-events-none data-behind:opacity-0 data-expanded:pointer-events-auto data-expanded:opacity-100">
        <Toast.Title className="leading-5 font-medium" />
        <Toast.Description className="text-sm leading-5 text-muted-foreground" />
        <Toast.Close
          className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-sm border-none bg-transparent hover:text-muted-foreground"
          aria-label="Close"
        >
          <XIcon className="h-4 w-4" />
        </Toast.Close>
      </Toast.Content>
    </Toast.Root>
  ));
}
