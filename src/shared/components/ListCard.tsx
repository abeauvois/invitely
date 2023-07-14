import clsx from "clsx";
import React, { ForwardRefExoticComponent, SVGProps } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ListCardProps
  extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {}

export function ListCard({
  className = "",
  children,
  ...htmlProps
}: ListCardProps): React.ReactElement {
  return (
    <div
      className={clsx([
        "flex flex-1 items-stretch justify-between rounded  bg-white p-4 shadow-sm hover:shadow-md",
        className,
      ])}
      {...htmlProps}
    >
      {children}
    </div>
  );
}

function ListCardHeader({
  children,
  text,
  className = "",
  ...htmlProps
}: React.PropsWithChildren<
  { text?: string } & React.HTMLAttributes<HTMLDivElement>
>): React.ReactElement {
  return (
    <div
      className={`flex items-center gap-2 leading-tight ${className}`}
      {...htmlProps}
    >
      {text ? (
        <span className="text-sm font-medium text-supervan">{text}</span>
      ) : null}
      {children}
    </div>
  );
}

function ListCardContent({
  children,
  className = "",
  ...htmlProps
}: React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
>): React.ReactElement {
  return (
    <div
      className={`inline-flex flex-wrap items-center gap-2 font-semibold leading-tight ${className}`}
      {...htmlProps}
    >
      {children}
    </div>
  );
}

function ListCardInfo({
  children,
  className = "",
  ...htmlProps
}: React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
>): React.ReactElement {
  return (
    <div
      className={`flex flex-col leading-tight md:flex-row md:gap-2 ${className}`}
      {...htmlProps}
    >
      {children}
    </div>
  );
}

function ListCardCol({
  children,
  className = "",
  ...htmlProps
}: React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
>): React.ReactElement {
  return (
    <div
      className={`flex flex-col justify-between ${className}`}
      {...htmlProps}
    >
      {children}
    </div>
  );
}

function ListCardInfoValue({
  text,
  icon: Icon,
  className = "",
  valueClassName = "",
  ...htmlProps
}: {
  text: string;
  valueClassName?: string;
  icon: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref">>;
} & React.HTMLAttributes<HTMLSpanElement>): React.ReactElement {
  return (
    <div
      className={`inline-flex items-stretch text-xs leading-tight ${className}`}
      {...htmlProps}
    >
      <Icon className="mr-1 h-3 w-3 text-gray-600" />
      <span className={valueClassName || "text-gray-700"}>{text}</span>
    </div>
  );
}

function ListCardBadge({
  text,
  className = "",
  ...htmlProps
}: {
  text: string;
} & React.HTMLAttributes<HTMLSpanElement>): React.ReactElement {
  return (
    <span
      className={clsx(["badge", className || "bg-supervan uppercase"])}
      {...htmlProps}
    >
      {text}
    </span>
  );
}

ListCard.Header = ListCardHeader;
ListCard.Badge = ListCardBadge;
ListCard.Col = ListCardCol;
ListCard.Info = ListCardInfo;
ListCard.InfoValue = ListCardInfoValue;
ListCard.Content = ListCardContent;
