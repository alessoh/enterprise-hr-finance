import Link from "next/link";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface CreditsRow {
  action: string;
  credits: number;
  /** e.g. "per case". */
  unit?: string;
  agent?: { name: string; href: string };
}

export interface CreditsTableProps {
  rows: CreditsRow[];
  caption?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

/** Credit rate card. Columns appear only when the rows carry that field. */
export function CreditsTable({ rows, caption, className, ariaLabel = "Credit rates" }: CreditsTableProps) {
  const hasAgent = rows.some((row) => row.agent);
  const hasUnit = rows.some((row) => row.unit);
  return (
    <Table aria-label={ariaLabel} wrapperClassName={cn("bg-bg-elevated", className)}>
      <TableHeader>
        <TableRow>
          <TableHead>Action</TableHead>
          {hasAgent ? <TableHead>Agent</TableHead> : null}
          <TableHead numeric>Credits</TableHead>
          {hasUnit ? <TableHead className="max-sm:hidden">Unit</TableHead> : null}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={`${row.action}-${row.agent?.name ?? ""}`}>
            <TableCell className="min-w-[12rem]">{row.action}</TableCell>
            {hasAgent ? (
              <TableCell className="whitespace-nowrap text-fg-muted">
                {row.agent ? (
                  <Link
                    href={row.agent.href}
                    className="rounded-sm text-accent underline-offset-4 transition-colors duration-150 ease-standard hover:text-accent-hover hover:underline"
                  >
                    {row.agent.name}
                  </Link>
                ) : (
                  "—"
                )}
              </TableCell>
            ) : null}
            <TableCell numeric className="font-medium">
              {row.credits}
            </TableCell>
            {hasUnit ? <TableCell className="whitespace-nowrap text-fg-muted max-sm:hidden">{row.unit ?? ""}</TableCell> : null}
          </TableRow>
        ))}
      </TableBody>
      {caption ? <TableCaption>{caption}</TableCaption> : null}
    </Table>
  );
}
