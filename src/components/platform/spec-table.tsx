import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { PlatformPillar } from "@/content/types";

import { pillarSpecs } from "./pillar-specs";

/** Specification table: standards, protocols, limits. Composes the content module's standards with local rows. */
export function SpecTable({ pillar }: { pillar: PlatformPillar }) {
  const rows = pillarSpecs[pillar.slug] ?? [];
  const standards = pillar.standards ?? [];
  return (
    <Table aria-label={`${pillar.name} specification`}>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[12rem]">Item</TableHead>
          <TableHead>Specification</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {standards.length > 0 ? (
          <TableRow>
            <TableCell className="align-top font-medium">Standards</TableCell>
            <TableCell className="align-top">
              <ul className="flex flex-wrap gap-x-2 gap-y-1.5">
                {standards.map((standard) => (
                  <li key={standard} className="rounded-sm border border-border px-2 py-0.5 font-mono text-xs text-fg-muted">
                    {standard}
                  </li>
                ))}
              </ul>
            </TableCell>
          </TableRow>
        ) : null}
        {rows.map((row) => (
          <TableRow key={row.item}>
            <TableCell className="align-top font-medium">{row.item}</TableCell>
            <TableCell className="align-top leading-relaxed text-fg-muted">{row.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
