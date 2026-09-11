import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { controlDomains } from "./data";
import { SectionIntro } from "./section-intro";

const evidenceLink =
  "text-accent underline-offset-4 transition-colors duration-150 ease-standard hover:text-accent-hover hover:underline";

export function ControlsTable() {
  const rowCount = controlDomains.reduce((sum, d) => sum + d.rows.length, 0);
  return (
    <Section id="controls" aria-labelledby="controls-heading">
      <Container>
        <SectionIntro
          id="controls-heading"
          eyebrow="Controls"
          title="Controls and the evidence behind them."
          lede={`${rowCount} controls across six domains. Each row names the control, what it means in operation, and the evidence in the security packet that shows it working.`}
        />
        <Table className="min-w-[46rem]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[11rem] lg:w-[13rem]">Domain</TableHead>
              <TableHead>Control</TableHead>
              <TableHead className="w-[15rem] lg:w-[18rem]">Evidence</TableHead>
            </TableRow>
          </TableHeader>
          {controlDomains.map((domain) => (
            <TableBody key={domain.domain} className="border-b border-border last:border-b-0">
              {domain.rows.map((row, index) => (
                <TableRow key={row.control} className="hover:bg-transparent">
                  {index === 0 ? (
                    <TableCell
                      rowSpan={domain.rows.length}
                      className="border-r border-border align-top font-medium text-fg"
                    >
                      {domain.domain}
                    </TableCell>
                  ) : null}
                  <TableCell className="align-top">
                    <p className="font-medium text-fg">{row.control}</p>
                    <p className="mt-1 max-w-[60ch] text-[0.8125rem] leading-relaxed text-fg-muted">{row.detail}</p>
                  </TableCell>
                  <TableCell className="align-top text-[0.8125rem] leading-relaxed text-fg-muted">
                    {row.href ? (
                      <Link href={row.href} className={evidenceLink}>
                        {row.evidence}
                      </Link>
                    ) : (
                      row.evidence
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ))}
        </Table>
        <p className="mt-4 text-[0.8125rem] text-fg-subtle">
          Reports, letters, and configuration exports are shared under NDA.{" "}
          <Link href="/contact?intent=sales" className={evidenceLink}>
            Request the security packet
          </Link>
          .
        </p>
      </Container>
    </Section>
  );
}
