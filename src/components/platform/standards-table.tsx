import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { standards } from "./platform-copy";

export function StandardsTable() {
  return (
    <Table aria-label="Open standards the Meridian platform uses" className="min-w-[44rem]">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[15rem]">Standard</TableHead>
          <TableHead>What it is</TableHead>
          <TableHead>What it means for you</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {standards.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="align-top">
              <span className="block font-medium text-fg">{row.name}</span>
              <span className="mt-0.5 block font-mono text-xs text-fg-subtle">{row.id}</span>
            </TableCell>
            <TableCell className="align-top leading-relaxed text-fg-muted">{row.whatItIs}</TableCell>
            <TableCell className="align-top leading-relaxed text-fg">{row.whatItMeans}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
