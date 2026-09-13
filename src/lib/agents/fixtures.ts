/**
 * Sample ledger and policy corpus.
 *
 * In a deployment these rows come from the customer's ERP through the Data Fabric. Here
 * they are a fixed fixture so a run is reproducible and so the repository contains no
 * real company's data. The shapes match what an AP extract actually looks like,
 * including the fields an agent must NOT see, so the scoping in scope.ts has something
 * real to withhold.
 */

export interface InvoiceRow {
  id: string;
  vendor: string;
  vendorId: string;
  amount: number;
  currency: string;
  invoiceNumber: string;
  invoiceDate: string;
  postedDate: string;
  poNumber: string | null;
  receiptNumber: string | null;
  receiptQty: number | null;
  poQty: number | null;
  description: string;
  // Deliberately outside every agent scope below. Present to prove projection works.
  approverEmail: string;
  bankAccountLast4: string;
  preparerNationalId: string;
}

/**
 * Twenty invoices containing: one exact duplicate pair, two fuzzy near-duplicates that
 * only judgment can settle, a three-way-match quantity break, a split purchase under a
 * threshold, and thirteen clean rows.
 */
export const INVOICES: InvoiceRow[] = [
  {
    id: "INV-2274", vendor: "Kestrel Industrial Supply", vendorId: "V-1042", amount: 12480.0,
    currency: "USD", invoiceNumber: "KIS-88214", invoiceDate: "2026-08-03", postedDate: "2026-08-06",
    poNumber: "PO-7311", receiptNumber: "GR-5521", receiptQty: 40, poQty: 40,
    description: "Bearing assemblies, lot 40", approverEmail: "d.okafor@example.com",
    bankAccountLast4: "4417", preparerNationalId: "***-**-1188",
  },
  {
    id: "INV-2291", vendor: "Kestrel Industrial Supply", vendorId: "V-1042", amount: 12480.0,
    currency: "USD", invoiceNumber: "KIS-88214", invoiceDate: "2026-08-03", postedDate: "2026-08-19",
    poNumber: "PO-7311", receiptNumber: "GR-5521", receiptQty: 40, poQty: 40,
    description: "Bearing assemblies, lot 40", approverEmail: "d.okafor@example.com",
    bankAccountLast4: "4417", preparerNationalId: "***-**-1188",
  },
  {
    id: "INV-2302", vendor: "Halden Freight", vendorId: "V-2210", amount: 4812.4,
    currency: "USD", invoiceNumber: "HF-30291", invoiceDate: "2026-08-11", postedDate: "2026-08-14",
    poNumber: "PO-7402", receiptNumber: "GR-5610", receiptQty: 1, poQty: 1,
    description: "Freight, August week 2", approverEmail: "s.adeyemi@example.com",
    bankAccountLast4: "9920", preparerNationalId: "***-**-4471",
  },
  {
    id: "INV-2318", vendor: "Halden Freight Ltd", vendorId: "V-2210", amount: 4812.4,
    currency: "USD", invoiceNumber: "HF30291", invoiceDate: "2026-08-11", postedDate: "2026-08-25",
    poNumber: null, receiptNumber: null, receiptQty: null, poQty: null,
    description: "Freight services August wk2", approverEmail: "s.adeyemi@example.com",
    bankAccountLast4: "9920", preparerNationalId: "***-**-4471",
  },
  {
    id: "INV-2325", vendor: "Pinehurst Chemicals", vendorId: "V-3301", amount: 28410.55,
    currency: "USD", invoiceNumber: "PC-6621", invoiceDate: "2026-08-15", postedDate: "2026-08-18",
    poNumber: "PO-7455", receiptNumber: "GR-5688", receiptQty: 180, poQty: 200,
    description: "Solvent, 200 drums ordered", approverEmail: "m.reyes@example.com",
    bankAccountLast4: "1120", preparerNationalId: "***-**-7702",
  },
  {
    id: "INV-2331", vendor: "Orrin Tooling", vendorId: "V-4102", amount: 9950.0,
    currency: "USD", invoiceNumber: "OT-1180", invoiceDate: "2026-08-17", postedDate: "2026-08-20",
    poNumber: "PO-7480", receiptNumber: "GR-5701", receiptQty: 1, poQty: 1,
    description: "CNC fixture, phase 1 of 2", approverEmail: "m.reyes@example.com",
    bankAccountLast4: "3345", preparerNationalId: "***-**-9013",
  },
  {
    id: "INV-2332", vendor: "Orrin Tooling", vendorId: "V-4102", amount: 9950.0,
    currency: "USD", invoiceNumber: "OT-1181", invoiceDate: "2026-08-17", postedDate: "2026-08-20",
    poNumber: "PO-7481", receiptNumber: "GR-5702", receiptQty: 1, poQty: 1,
    description: "CNC fixture, phase 2 of 2", approverEmail: "m.reyes@example.com",
    bankAccountLast4: "3345", preparerNationalId: "***-**-9013",
  },
  {
    id: "INV-2340", vendor: "Brightline Utilities", vendorId: "V-5500", amount: 18240.12,
    currency: "USD", invoiceNumber: "BU-77120", invoiceDate: "2026-08-20", postedDate: "2026-08-22",
    poNumber: "PO-7501", receiptNumber: "GR-5720", receiptQty: 1, poQty: 1,
    description: "Electricity, August", approverEmail: "d.okafor@example.com",
    bankAccountLast4: "6612", preparerNationalId: "***-**-2240",
  },
  {
    id: "INV-2344", vendor: "Vance Logistics", vendorId: "V-6710", amount: 2210.75,
    currency: "USD", invoiceNumber: "VL-4410", invoiceDate: "2026-08-21", postedDate: "2026-08-24",
    poNumber: "PO-7510", receiptNumber: "GR-5731", receiptQty: 12, poQty: 12,
    description: "Pallet haulage", approverEmail: "s.adeyemi@example.com",
    bankAccountLast4: "8801", preparerNationalId: "***-**-5567",
  },
  {
    id: "INV-2351", vendor: "Kestrel Industrial Supply", vendorId: "V-1042", amount: 6140.0,
    currency: "USD", invoiceNumber: "KIS-88907", invoiceDate: "2026-08-24", postedDate: "2026-08-27",
    poNumber: "PO-7533", receiptNumber: "GR-5749", receiptQty: 20, poQty: 20,
    description: "Bearing assemblies, lot 20", approverEmail: "d.okafor@example.com",
    bankAccountLast4: "4417", preparerNationalId: "***-**-1188",
  },
  {
    id: "INV-2355", vendor: "Sable Packaging", vendorId: "V-7120", amount: 3380.9,
    currency: "USD", invoiceNumber: "SP-2201", invoiceDate: "2026-08-25", postedDate: "2026-08-28",
    poNumber: "PO-7540", receiptNumber: "GR-5755", receiptQty: 500, poQty: 500,
    description: "Corrugate, 500 units", approverEmail: "m.reyes@example.com",
    bankAccountLast4: "2214", preparerNationalId: "***-**-3319",
  },
  {
    id: "INV-2360", vendor: "Pinehurst Chemicals", vendorId: "V-3301", amount: 14205.0,
    currency: "USD", invoiceNumber: "PC-6702", invoiceDate: "2026-08-27", postedDate: "2026-08-30",
    poNumber: "PO-7552", receiptNumber: "GR-5766", receiptQty: 100, poQty: 100,
    description: "Solvent, 100 drums", approverEmail: "m.reyes@example.com",
    bankAccountLast4: "1120", preparerNationalId: "***-**-7702",
  },
  {
    id: "INV-2366", vendor: "Brightline Utilities", vendorId: "V-5500", amount: 640.22,
    currency: "USD", invoiceNumber: "BU-77450", invoiceDate: "2026-08-28", postedDate: "2026-08-31",
    poNumber: "PO-7560", receiptNumber: "GR-5771", receiptQty: 1, poQty: 1,
    description: "Water, August", approverEmail: "d.okafor@example.com",
    bankAccountLast4: "6612", preparerNationalId: "***-**-2240",
  },
  {
    id: "INV-2370", vendor: "Vance Logistics", vendorId: "V-6710", amount: 5120.0,
    currency: "USD", invoiceNumber: "VL-4488", invoiceDate: "2026-08-29", postedDate: "2026-09-01",
    poNumber: "PO-7566", receiptNumber: "GR-5780", receiptQty: 25, poQty: 25,
    description: "Pallet haulage, September pre-buy", approverEmail: "s.adeyemi@example.com",
    bankAccountLast4: "8801", preparerNationalId: "***-**-5567",
  },
  {
    id: "INV-2377", vendor: "Sable Packaging", vendorId: "V-7120", amount: 1180.4,
    currency: "USD", invoiceNumber: "SP-2260", invoiceDate: "2026-08-31", postedDate: "2026-09-02",
    poNumber: "PO-7571", receiptNumber: "GR-5788", receiptQty: 160, poQty: 160,
    description: "Corrugate, 160 units", approverEmail: "m.reyes@example.com",
    bankAccountLast4: "2214", preparerNationalId: "***-**-3319",
  },
  {
    id: "INV-2381", vendor: "Orrin Tooling", vendorId: "V-4102", amount: 760.0,
    currency: "USD", invoiceNumber: "OT-1244", invoiceDate: "2026-09-01", postedDate: "2026-09-03",
    poNumber: "PO-7578", receiptNumber: "GR-5793", receiptQty: 4, poQty: 4,
    description: "Tool sharpening", approverEmail: "m.reyes@example.com",
    bankAccountLast4: "3345", preparerNationalId: "***-**-9013",
  },
  {
    id: "INV-2388", vendor: "Halden Freight", vendorId: "V-2210", amount: 3990.15,
    currency: "USD", invoiceNumber: "HF-30655", invoiceDate: "2026-09-02", postedDate: "2026-09-04",
    poNumber: "PO-7584", receiptNumber: "GR-5801", receiptQty: 1, poQty: 1,
    description: "Freight, September week 1", approverEmail: "s.adeyemi@example.com",
    bankAccountLast4: "9920", preparerNationalId: "***-**-4471",
  },
  {
    id: "INV-2392", vendor: "Kestrel Industrial Supply", vendorId: "V-1042", amount: 880.0,
    currency: "USD", invoiceNumber: "KIS-89110", invoiceDate: "2026-09-03", postedDate: "2026-09-05",
    poNumber: "PO-7590", receiptNumber: "GR-5808", receiptQty: 6, poQty: 6,
    description: "Gaskets", approverEmail: "d.okafor@example.com",
    bankAccountLast4: "4417", preparerNationalId: "***-**-1188",
  },
  {
    id: "INV-2396", vendor: "Brightline Utilities", vendorId: "V-5500", amount: 21055.8,
    currency: "USD", invoiceNumber: "BU-77980", invoiceDate: "2026-09-04", postedDate: "2026-09-07",
    poNumber: "PO-7596", receiptNumber: "GR-5814", receiptQty: 1, poQty: 1,
    description: "Electricity, September", approverEmail: "d.okafor@example.com",
    bankAccountLast4: "6612", preparerNationalId: "***-**-2240",
  },
  {
    id: "INV-2401", vendor: "Pinehurst Chemicals", vendorId: "V-3301", amount: 7420.6,
    currency: "USD", invoiceNumber: "PC-6810", invoiceDate: "2026-09-05", postedDate: "2026-09-08",
    poNumber: "PO-7601", receiptNumber: "GR-5820", receiptQty: 50, poQty: 50,
    description: "Solvent, 50 drums", approverEmail: "m.reyes@example.com",
    bankAccountLast4: "1120", preparerNationalId: "***-**-7702",
  },
];

export interface PolicyDoc {
  id: string;
  title: string;
  section: string;
  text: string;
  effective: string;
}

/** Policy corpus for the Help Desk Agent. Short, citable passages. */
export const POLICIES: PolicyDoc[] = [
  {
    id: "HR-214-3",
    title: "Paid time off",
    section: "3. Carryover",
    effective: "2026-01-01",
    text: "Employees may carry over up to 40 hours of unused PTO into the following calendar year. Carried hours expire on 31 March. Part-time employees accrue pro rata and carry over on the same basis. Carryover above 40 hours requires written approval from the employee's director before 15 December.",
  },
  {
    id: "HR-214-5",
    title: "Paid time off",
    section: "5. Payout on exit",
    effective: "2026-01-01",
    text: "On termination, accrued and unused PTO is paid at the employee's base rate in the final cheque, except where state law requires otherwise. Carried-over hours from the prior year are included in the payout.",
  },
  {
    id: "HR-330-2",
    title: "Parental leave",
    section: "2. Eligibility",
    effective: "2026-03-01",
    text: "Employees with 12 months of continuous service are eligible for 14 weeks of paid parental leave. Leave must begin within 12 months of the birth or placement. Both parents are eligible independently.",
  },
  {
    id: "FIN-120-4",
    title: "Expense reimbursement",
    section: "4. Receipts",
    effective: "2026-02-01",
    text: "Receipts are required for any single expense of $75 or more. Expenses submitted more than 60 days after they were incurred are not reimbursable without an exception approved by the controller.",
  },
  {
    id: "HR-410-1",
    title: "Tuition assistance",
    section: "1. Annual cap",
    effective: "2026-01-01",
    text: "The company reimburses up to $5,250 per calendar year for approved coursework. Reimbursement requires a passing grade and continued employment for 12 months after the course ends.",
  },
];

export const ALL_RECORD_IDS = new Set<string>([
  ...INVOICES.map((i) => i.id),
  ...POLICIES.map((p) => p.id),
]);
