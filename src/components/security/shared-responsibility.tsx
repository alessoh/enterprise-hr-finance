import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { responsibilityRows } from "./data";
import { SectionIntro } from "./section-intro";

function Cell({ value }: { value: string }) {
  if (value === "—") {
    return (
      <>
        <span className="sr-only">Not applicable</span>
        <span aria-hidden className="text-fg-subtle">
          —
        </span>
      </>
    );
  }
  const owns = value === "Owns";
  return <span className={cn(owns ? "font-medium text-fg" : "text-fg-muted")}>{value}</span>;
}

export function SharedResponsibility() {
  return (
    <Section id="shared-responsibility" aria-labelledby="shared-responsibility-heading">
      <Container>
        <SectionIntro
          id="shared-responsibility-heading"
          eyebrow="Shared responsibility"
          title="Who is responsible for what."
          lede="Meridian runs the platform. You own identity, policy, and the data agents may read. This is the same matrix that appears in the security annex of the DPA."
          actions={<ArrowLink href="/legal/dpa">Security annex in the DPA</ArrowLink>}
        />
        <Table className="min-w-[40rem]">
          <TableHeader>
            <TableRow>
              <TableHead>Area</TableHead>
              <TableHead className="w-[16rem] lg:w-[20rem]">Meridian</TableHead>
              <TableHead className="w-[14rem] lg:w-[18rem]">Customer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {responsibilityRows.map((row) => (
              <TableRow key={row.area}>
                <TableCell className="align-top font-medium text-fg">{row.area}</TableCell>
                <TableCell className="align-top text-[0.8125rem] leading-relaxed">
                  <Cell value={row.meridian} />
                </TableCell>
                <TableCell className="align-top text-[0.8125rem] leading-relaxed">
                  <Cell value={row.customer} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </Section>
  );
}
