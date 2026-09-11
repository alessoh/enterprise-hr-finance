import * as React from "react";

import { cn } from "@/lib/utils";

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Keep the header visible while the wrapper scrolls. Pair with a max-height on `wrapperClassName`. */
  stickyHeader?: boolean;
  /** Radius lg + ring around the table. Off for tables that sit inside a card. */
  framed?: boolean;
  wrapperClassName?: string;
}

/** Hairline rows, no vertical rules, 14px cells, tabular numerals. */
export const Table = React.forwardRef<HTMLTableElement, TableProps>(function Table(
  { className, wrapperClassName, stickyHeader = false, framed = true, ...props },
  ref,
) {
  return (
    <div
      className={cn(
        "relative w-full overflow-auto",
        framed && "rounded-lg ring-1 ring-border",
        wrapperClassName,
      )}
    >
      <table
        ref={ref}
        className={cn(
          "w-full caption-bottom border-collapse text-sm",
          stickyHeader && "[&_thead_th]:sticky [&_thead_th]:top-0 [&_thead_th]:z-10",
          className,
        )}
        {...props}
      />
    </div>
  );
});

export const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  function TableHeader({ className, ...props }, ref) {
    return <thead ref={ref} className={cn("[&_tr]:border-b [&_tr]:border-border [&_tr:hover]:bg-transparent", className)} {...props} />;
  },
);

export const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  function TableBody({ className, ...props }, ref) {
    return <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />;
  },
);

export const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  function TableFooter({ className, ...props }, ref) {
    return (
      <tfoot
        ref={ref}
        className={cn("border-t border-border bg-bg-subtle font-medium [&>tr]:last:border-b-0", className)}
        {...props}
      />
    );
  },
);

export const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  function TableRow({ className, ...props }, ref) {
    return (
      <tr
        ref={ref}
        className={cn(
          "border-b border-border transition-colors duration-120 ease-standard hover:bg-bg-subtle data-[state=selected]:bg-bg-subtle",
          className,
        )}
        {...props}
      />
    );
  },
);

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /** Right-aligned tabular figures. */
  numeric?: boolean;
}

export const TableHead = React.forwardRef<HTMLTableCellElement, TableCellProps & React.ThHTMLAttributes<HTMLTableCellElement>>(
  function TableHead({ className, numeric, ...props }, ref) {
    return (
      <th
        ref={ref}
        scope="col"
        className={cn(
          "h-10 bg-bg-subtle px-4 text-left align-middle text-xs font-medium tracking-[0.06em] whitespace-nowrap text-fg-muted uppercase",
          numeric && "text-right",
          className,
        )}
        {...props}
      />
    );
  },
);

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  { className, numeric, ...props },
  ref,
) {
  return (
    <td
      ref={ref}
      className={cn("px-4 py-3 align-middle text-fg", numeric && "tabular text-right", className)}
      {...props}
    />
  );
});

export const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  function TableCaption({ className, ...props }, ref) {
    return <caption ref={ref} className={cn("mt-3 text-left text-[0.8125rem] text-fg-subtle", className)} {...props} />;
  },
);
