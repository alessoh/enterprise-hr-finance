import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAgent } from "@/content/agents";
import { creditRates } from "@/content/pricing";
import { formatNumber } from "@/lib/utils";

/** The rate card: action, agent, credits, unit. The agent column collapses below md. */
export function CreditRatesTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Action</TableHead>
          <TableHead className="max-md:hidden">Agent</TableHead>
          <TableHead numeric>Credits</TableHead>
          <TableHead>Unit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {creditRates.map((rate) => {
          const agent = getAgent(rate.agentSlug);
          return (
            <TableRow key={`${rate.agentSlug}-${rate.action}`}>
              <TableCell className="font-medium">{rate.action}</TableCell>
              <TableCell className="max-md:hidden">
                {agent ? (
                  <Link
                    href={`/agents/${agent.slug}`}
                    className="rounded-sm text-accent underline-offset-4 transition-colors duration-150 ease-standard hover:text-accent-hover hover:underline"
                  >
                    {agent.name}
                  </Link>
                ) : (
                  rate.agentSlug
                )}
              </TableCell>
              <TableCell numeric className="font-medium">
                {formatNumber(rate.credits)}
              </TableCell>
              <TableCell className="whitespace-nowrap text-fg-muted">{rate.unit}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
