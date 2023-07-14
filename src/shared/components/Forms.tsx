import clsx from "clsx";
import React from "react";

export function FormGroup({
  label,
  subLabel,
  id,
  className = "",
  labelClassName = "",
  subLabelClassName = "",
  direction = "horizontal",
  errorText,
  children,
  ...htmlProps
}: {
  id?: string;
  errorText?: string;
  label: React.ReactNode;
  labelClassName?: React.ReactNode;
  subLabel?: React.ReactNode;
  subLabelClassName?: React.ReactNode;
  direction?: "horizontal" | "vertical";
  children: React.ReactNode;
} & React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
>): React.ReactElement {
  return (
    <div className="flex flex-1 flex-col pb-2 pt-1" {...htmlProps}>
      <div
        className={clsx([
          "flex flex-1 flex-col justify-between md:items-baseline",
          className,
          direction === "horizontal" && "md:flex-row",
        ])}
      >
        <label
          htmlFor={id}
          className={`flex items-center pb-4 font-medium md:pb-0 ${labelClassName}`}
        >
          {label}
          {subLabel && (
            <span className={`ml-2 text-xs text-gray-700 ${subLabelClassName}`}>
              {subLabel}
            </span>
          )}
        </label>

        <div className="flex w-full max-w-[24rem] flex-col md:items-start">
          {React.isValidElement(children)
            ? React.cloneElement(children as React.ReactElement, {
                id,
              })
            : children}

          <span role="alert" className="mt-2 self-start text-sm text-red-500">
            {errorText ?? <>&#8203;</>}
          </span>
        </div>
      </div>
    </div>
  );
}
