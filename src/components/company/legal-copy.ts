/**
 * Bodies for the four legal pages. Authored in-repo and rendered through the
 * Markdown component, so the sticky table of contents can be built from the
 * same source with buildToc(). Template copy for evaluation, not legal advice.
 */

export interface LegalDocument {
  /** Route path under /legal. */
  path: string;
  /** H1 and metadata title. */
  title: string;
  /** Breadcrumb label. */
  label: string;
  /** 140-160 characters. */
  description: string;
  lede: string;
  body: string;
}

/** Shown on every legal page. ISO form is used for dateModified. */
export const legalUpdated = "September 10, 2026";
export const legalUpdatedIso = "2026-09-10";

const privacyBody = `## Who we are

Meridian Systems, Inc. ("Meridian", "we", "us") is a Delaware corporation with offices in New York, London, and Dublin. We build narrow, governed AI agents for HR and finance operations.

This policy explains what personal data we handle, why we handle it, how long we keep it, and the choices you have. It covers this website, the Meridian product, and the events and correspondence we run alongside them.

Questions about this policy go to privacy@meridian.example. Our Data Protection Officer can be reached at the same address.

## The two roles we play

Data protection law distinguishes between a **controller**, who decides why and how personal data is processed, and a **processor**, who processes it on a controller's documented instructions.

**We are a controller** for the data of website visitors, prospective customers, event attendees, job applicants, and the individual administrators who hold Meridian accounts. We decide what to collect and why, and this policy governs that data.

**We are a processor** for the HR and finance data a customer loads into or connects to their Meridian workspace. Employee records, payroll files, invoices, contracts, and support cases belong to the customer. They decide the purpose; we act on their instructions under the [Data Processing Addendum](/legal/dpa). If you are an employee of a Meridian customer and want to exercise a right over that data, contact your employer. We will forward any request we receive directly to them.

## Data we process as a controller

| Category | Examples | Source |
| --- | --- | --- |
| Contact data | Name, work email, company, job title, country | You, through forms on this site |
| Account data | User ID, workspace membership, role, authentication events | Created when an account is provisioned |
| Correspondence | Demo requests, support tickets, sales and partner threads | You |
| Applicant data | Role applied for, résumé or portfolio link, interview notes | You, through the contact form |
| Usage data | Pages viewed, referrer, aggregate session duration, coarse region | Product analytics on this site |
| Technical data | IP address, user agent, request timestamps, security event logs | Automatically, when you use the site or product |
| Billing data | Company billing contact, plan, invoices, tax identifiers | You and our payment processor |

We do not buy contact lists, we do not use tracking pixels from advertising networks, and we do not run behavioural advertising.

## Lawful bases

| Purpose | Data used | Lawful basis |
| --- | --- | --- |
| Answering a demo, sales, or support request | Contact data, correspondence | Steps at your request before a contract (Art. 6(1)(b)) |
| Providing and securing the product | Account data, technical data | Performance of a contract (Art. 6(1)(b)) |
| Billing, tax, and statutory records | Billing data | Legal obligation (Art. 6(1)(c)) |
| Product improvement and aggregate analytics | Usage data | Legitimate interests (Art. 6(1)(f)) |
| Recruiting | Applicant data | Steps at your request before a contract (Art. 6(1)(b)) |
| Newsletter and product announcements | Contact data | Consent (Art. 6(1)(a)), withdrawable at any time |
| Detecting abuse, fraud, and security incidents | Technical data, account data | Legitimate interests (Art. 6(1)(f)) |

Where we rely on legitimate interests, we have assessed that interest against your rights and recorded the outcome. You can ask us for a summary of that assessment.

## Cookies and analytics

The site sets one strictly necessary cookie to keep your session and one to remember whether you dismissed the announcement bar. Neither is used for advertising.

Product analytics are first-party and aggregate. We record page paths, referrers, and coarse region derived from the IP address, then discard the IP address. We do not build cross-site profiles and we honour the Global Privacy Control signal.

## Retention

| Data | Retention |
| --- | --- |
| Contact and correspondence | 24 months after the last interaction |
| Account data | For the life of the account, then 30 days |
| Applicant data | 12 months after a decision, unless you ask us to delete it sooner |
| Usage data | 14 months, in aggregate form |
| Security and audit logs | 12 months, then deleted |
| Billing records | 7 years, to meet tax and accounting obligations |

Customer data processed under the DPA follows the retention period the customer configures in their workspace, which can be set to zero-day retention for agent inputs and outputs.

## Subprocessors

We use a small number of vendors to run the service. Each is bound by a written contract with confidentiality, security, and audit terms at least as protective as our own commitments. The current list, by category and region, is on the [subprocessors page](/legal/subprocessors). Customers can subscribe there to receive 30 days' notice before a new subprocessor is added.

## Your rights

Subject to local law, you can ask us to:

- confirm whether we process personal data about you, and give you a copy;
- correct data that is inaccurate or incomplete;
- delete data we no longer have a basis to keep;
- restrict or object to processing based on legitimate interests;
- port data you gave us to another provider in a structured, machine-readable format;
- withdraw consent, which does not affect processing that already happened.

Write to privacy@meridian.example. We verify the request, respond within 30 days, and tell you if we need a further 60 days for a complex request. We do not charge for the first request in any 12-month period.

Residents of California may exercise the equivalent rights under the CCPA as amended. We do not sell or share personal information as those terms are defined there, and we have not done so in the preceding 12 months. Residents of the EEA, the UK, and Switzerland may lodge a complaint with their supervisory authority; our lead authority in the EU is the Data Protection Commission in Ireland.

## International transfers

Meridian operates production regions in the United States (US-East) and the European Union (EU-West). Customers choose their region at provisioning, and customer data stays in it.

Corporate data we hold as a controller may be transferred to the United States for support and administration. Those transfers rely on the European Commission's Standard Contractual Clauses (Module Two and, where relevant, Module Three), the UK International Data Transfer Addendum, and the Swiss addendum recognised by the Federal Data Protection and Information Commissioner. We complete a transfer impact assessment for each recipient, and we publish a summary of the supplementary measures on request.

## Security

We hold SOC 2 Type II and ISO 27001 certifications. Data is encrypted in transit with TLS 1.3 and at rest with AES-256. Access to production follows least privilege, requires hardware-backed multi-factor authentication, and is logged. Agent actions are written to an immutable audit trail that customers can export.

Customer data is never used to train models, ours or a provider's. A full description of the controls is on the [security page](/security), and the technical and organisational measures are set out in Annex II of the [DPA](/legal/dpa).

If you believe you have found a vulnerability, write to security@meridian.example. We acknowledge reports within one business day.

## Changes to this policy

We update this policy when our processing changes. Material changes are announced by email to account administrators at least 30 days before they take effect, and the date at the top of this page always reflects the current version. Superseded versions are available on request.

## Contact

Meridian Systems, Inc.
Attn: Privacy
privacy@meridian.example

For product questions, use the [contact form](/contact). For a signed copy of the DPA or the SOC 2 report, ask your account team.`;

const termsBody = `## 1. Agreement

These Terms of Service ("Terms") are a contract between Meridian Systems, Inc., a Delaware corporation ("Meridian"), and the entity that creates an account or signs an order form ("Customer"). They govern access to the Meridian platform, the agents published in it, and the documentation and support that come with it (together, the "Service").

By creating an account, signing an order form, or using the Service, Customer accepts these Terms. If you are accepting on behalf of an organisation, you confirm you have authority to bind it. Where Customer and Meridian sign a separate master agreement, that agreement controls to the extent it conflicts with these Terms.

## 2. The Service

Meridian provides narrow, governed AI agents for HR and finance operations, together with the Registry, Gateway, Data Fabric, Studio, and Assist components described in the documentation. Agents read the data Customer connects, propose or perform scoped actions, and route consequential actions to a human approver Customer designates.

Meridian may improve the Service continuously. We will not materially reduce the core functionality of a paid plan during a term. We give 90 days' notice before deprecating a documented API, and 30 days' notice before a change that requires action by Customer.

Availability commitments, support response times, and service credits are set out in the order form. Enterprise plans carry a 99.95% monthly uptime commitment.

## 3. Accounts

Customer is responsible for its workspaces, for the accuracy of the account information it provides, and for all activity under its credentials. Customer will enforce multi-factor authentication or single sign-on for every administrator, keep approver assignments current, and notify Meridian promptly at security@meridian.example if it suspects unauthorised access.

Customer may create as many user accounts as its plan permits. Accounts are for named individuals and may not be shared. Customer is responsible for the acts and omissions of its users and of any third party it authorises to access the Service, including contractors and affiliates.

## 4. Credits and billing

**Consumption model.** The Service is priced in credits. A credit is consumed when an agent completes a unit of work, as defined in the rate table published on the pricing page and restated in the order form. Idle users, dormant workspaces, and failed runs that produce no output do not consume credits.

**Included credits.** Each plan includes a monthly credit allowance. Unused monthly allowance does not roll over. Credit pools purchased in advance under an annual commitment roll over within the annual term and expire at its end.

**Overage.** Consumption above the allowance is billed monthly in arrears at the overage rate in the order form. Customer can set a hard spending cap in the workspace, at which point agents stop and notify administrators rather than continuing to consume. Meridian sends an alert at 80% and 100% of any configured cap.

**Annual prepay.** Annual plans are invoiced in advance and are discounted against the monthly rate. Prepaid amounts are non-refundable except as stated in Section 10.

**Payment.** Invoices are due 30 days from the invoice date unless the order form says otherwise. Amounts are exclusive of taxes; Customer is responsible for taxes other than those on Meridian's income. Undisputed amounts more than 15 days overdue may accrue interest at 1% per month or the maximum permitted by law, whichever is lower. Meridian will not suspend the Service for non-payment without 10 days' written notice.

**Price changes.** Rates are fixed for the duration of a term. Meridian may change rates for a renewal term with at least 60 days' notice before the renewal date.

## 5. Acceptable use

Customer will not, and will not permit anyone else to:

- use the Service to make a decision producing a legal or similarly significant effect on an individual without meaningful human review by a person Customer designates;
- upload data it has no right to process, or process special category data without the safeguards its own law requires;
- reverse engineer, decompile, or attempt to derive the weights, prompts, or source of the Service, except to the extent that restriction is unenforceable by law;
- probe, scan, or load-test the Service without written permission, or circumvent rate limits, quotas, or the approval controls;
- resell, sublicense, or provide the Service to a third party as a standalone offering, other than to affiliates named in the order form;
- use the Service to build a competing product, or to benchmark it for publication without Meridian's prior written consent;
- use the Service to generate unlawful, deceptive, harassing, or infringing content, or to impersonate a person.

Meridian may suspend a workspace immediately where continued use presents a material security risk, a risk of harm to a person, or a violation of law. We will narrow any suspension to the affected workspace and restore access as soon as the cause is resolved.

## 6. Intellectual property

**Meridian owns the Service.** Meridian and its licensors retain all right, title, and interest in the Service, including the platform, the agents Meridian publishes, the models it tunes, and the documentation. No rights are granted except the limited, non-exclusive, non-transferable right to use the Service during the term.

**Customer owns its data.** Customer retains all right, title, and interest in the data it connects or uploads ("Customer Data") and in the outputs agents produce from it. Meridian's rights in Customer Data are limited to what is necessary to provide the Service under these Terms and the DPA.

**No training.** Meridian does not use Customer Data to train, fine-tune, or evaluate models for the benefit of any other customer, and contractually requires the same of its model providers.

**Feedback.** If Customer sends suggestions, Meridian may use them without obligation. Feedback is not Customer Confidential Information unless Customer marks it as such.

**Customer content in Studio.** Agents Customer builds in Studio, and the prompts, evaluation sets, and policies it authors, belong to Customer.

## 7. Confidentiality

Each party may receive non-public information of the other that is marked confidential or that a reasonable person would understand to be confidential ("Confidential Information"). The receiving party will use it only to perform under these Terms, protect it with at least reasonable care, and disclose it only to personnel and advisors with a need to know who are bound by comparable obligations.

These obligations do not apply to information that is public through no fault of the receiving party, was known to it without duty of confidence, is independently developed, or is lawfully received from a third party. A party may disclose Confidential Information where legally compelled, after giving notice where it is permitted to do so.

Obligations continue for three years after disclosure, and indefinitely for Customer Data and trade secrets.

## 8. Warranties and disclaimers

Each party warrants that it has the authority to enter into these Terms. Meridian warrants that the Service will perform materially as described in the documentation, that it will maintain the security measures in Annex II of the DPA, and that it will not materially decrease them during a term.

Agent outputs are probabilistic. Meridian does not warrant that an output will be accurate, complete, or fit for a particular purpose, and the Service is not legal, tax, accounting, or medical advice. Customer is responsible for the human approval step on every consequential action and for its own compliance obligations.

Except as stated in this section, the Service is provided "as is" and Meridian disclaims all other warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement, to the maximum extent permitted by law.

## 9. Limitation of liability

Neither party is liable for indirect, incidental, special, consequential, or punitive damages, or for lost profits, revenue, or goodwill, even if advised of the possibility.

Each party's total liability arising out of or related to these Terms is capped at the fees Customer paid or owed in the 12 months before the event giving rise to the claim.

That cap is raised to three times those fees for Meridian's breach of its confidentiality obligations or of the DPA. The cap does not apply to Customer's payment obligations, to either party's indemnification obligations, or to liability that cannot be limited by law, including fraud, wilful misconduct, and death or personal injury caused by negligence.

**Indemnities.** Meridian will defend Customer against a third-party claim that the Service infringes an intellectual property right, and pay damages finally awarded. Customer will defend Meridian against a third-party claim arising from Customer Data or from use of the Service in breach of Section 5. Each indemnity is conditioned on prompt notice, sole control of the defence, and reasonable cooperation.

## 10. Term and termination

These Terms run for the subscription term in the order form and renew for successive terms of the same length unless either party gives notice at least 30 days before the renewal date.

Either party may terminate for material breach that is not cured within 30 days of written notice, or immediately if the other becomes insolvent. If Customer terminates for Meridian's uncured material breach, Meridian refunds prepaid fees for the remainder of the term.

On termination, access ends, and Customer may export its data through the product or the API for 30 days. After that period Meridian deletes Customer Data in line with the DPA. Sections 6, 7, 8, 9, and 11 survive termination.

## 11. Governing law and disputes

These Terms are governed by the laws of the State of Delaware, without regard to conflict of laws rules, and the United Nations Convention on Contracts for the International Sale of Goods does not apply.

The parties will attempt in good faith to resolve a dispute through their respective executives for 30 days. Failing that, the state and federal courts located in Wilmington, Delaware have exclusive jurisdiction, and each party consents to that venue. Either party may seek injunctive relief in any court of competent jurisdiction to protect its intellectual property or Confidential Information.

## 12. General

Neither party may assign these Terms without consent, except to a successor in a merger or sale of substantially all assets, on notice. Notices go to the addresses in the order form and to legal@meridian.example, and are effective on receipt.

Meridian may name Customer in a customer list only with prior written consent. Neither party is liable for delay caused by events beyond its reasonable control. If a provision is unenforceable, it is modified to the minimum extent necessary and the rest stands. These Terms, the order form, and the DPA are the entire agreement and supersede prior discussions. A purchase order's pre-printed terms have no effect.

Meridian may update these Terms for a renewal term with 60 days' notice. Continued use after the renewal date is acceptance.

Questions: legal@meridian.example.`;

const dpaBody = `## 1. Scope

This Data Processing Addendum ("DPA") forms part of the agreement between Meridian Systems, Inc. ("Processor") and the customer named in the order form ("Controller") for the Meridian platform. It applies wherever Processor handles personal data on Controller's behalf.

Where Controller is itself acting as a processor for a third party, this DPA applies on a back-to-back basis and Processor acts as a subprocessor. In case of conflict, this DPA prevails over the Terms of Service in respect of the processing of personal data.

## 2. Definitions

**Applicable Data Protection Law** means the EU General Data Protection Regulation 2016/679 ("GDPR"), the UK GDPR and Data Protection Act 2018, the Swiss Federal Act on Data Protection, and the California Consumer Privacy Act as amended, each to the extent it applies.

**Customer Personal Data** means personal data contained in Customer Data that Processor processes under the Agreement.

**Data Subject**, **Personal Data**, **Processing**, **Controller**, **Processor**, and **Supervisory Authority** have the meanings given in the GDPR.

**Personal Data Breach** means a breach of security leading to the accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to Customer Personal Data.

**SCCs** means the Standard Contractual Clauses annexed to Commission Implementing Decision (EU) 2021/914.

**Subprocessor** means a third party engaged by Processor to process Customer Personal Data.

## 3. Roles and instructions

Controller is the controller and Processor is the processor of Customer Personal Data. Controller is responsible for the lawfulness of the data it provides and of the instructions it gives.

Processor will process Customer Personal Data only on Controller's documented instructions, which comprise the Agreement, this DPA, the configuration Controller sets in the workspace, and any further written instruction the parties agree. Processor will tell Controller if, in its opinion, an instruction infringes Applicable Data Protection Law, and may suspend the affected processing until the instruction is withdrawn or amended.

Where Processor is required by law to process beyond those instructions, it will inform Controller before processing, unless that law prohibits the notice on important grounds of public interest.

Processor will not sell or share Customer Personal Data, will not retain, use, or disclose it for any purpose other than performing the Agreement, and will not combine it with personal data from another source except as instructed. **Processor does not use Customer Personal Data to train, fine-tune, or evaluate models**, and imposes the same restriction on every model provider it engages.

## 4. Confidentiality of personnel

Processor grants access to Customer Personal Data only to personnel who need it to deliver the Service. Those personnel are bound by written confidentiality obligations that survive their engagement, receive data protection and security training on joining and annually, and are subject to background checks where local law permits.

## 5. Security measures

Processor will implement and maintain the technical and organisational measures set out in **Annex II**, taking account of the state of the art, the cost of implementation, and the risks to data subjects. Processor may update those measures, provided the level of protection is not reduced.

## 6. Subprocessors

Controller gives general authorisation for Processor to engage Subprocessors. The current list, by category and region, is published at [meridian.example/legal/subprocessors](/legal/subprocessors).

Processor will give **at least 30 days' notice** before adding or replacing a Subprocessor, by email to the addresses Controller has subscribed and by updating that page. Controller may object on reasonable data protection grounds within the notice period. The parties will work in good faith to find an alternative; if none is available within 30 days, Controller may terminate the affected part of the Service and receive a pro-rata refund of prepaid fees.

Processor imposes on each Subprocessor, by written contract, data protection obligations at least as protective as those in this DPA, and remains fully liable to Controller for the Subprocessor's performance.

## 7. Data subject requests

Processor will not respond to a request from a data subject relating to Customer Personal Data except on Controller's instruction or as required by law. If Processor receives such a request directly, it will inform Controller without undue delay and forward the request.

Taking account of the nature of the processing, Processor will assist Controller with appropriate technical and organisational measures, insofar as possible, in meeting its obligations to respond to requests for access, rectification, erasure, restriction, portability, and objection. The product provides self-service export and deletion for records in a workspace; assistance beyond that is provided at no additional charge for requests within normal volumes.

## 8. Personal data breach

Processor will notify Controller **without undue delay and in any case within 48 hours** of becoming aware of a Personal Data Breach affecting Customer Personal Data. The notice will describe the nature of the breach, the categories and approximate number of data subjects and records concerned, the likely consequences, the measures taken or proposed, and a contact point for further information. Where the full picture is not yet available, Processor will provide information in phases.

Processor will assist Controller with its obligations under Articles 32 to 36 GDPR, including notifications to supervisory authorities and data subjects, and will not make a public statement identifying Controller without Controller's consent, unless legally required.

## 9. Audit rights

Processor will make available to Controller all information reasonably necessary to demonstrate compliance with this DPA. Controller's audit right is satisfied in the first instance by Processor's current SOC 2 Type II report and ISO 27001 certificate, and by its completed standard security questionnaire, each provided under confidentiality within 10 business days of a request.

Where those materials are not sufficient to demonstrate compliance, Controller or an independent auditor it appoints, who is not a competitor of Processor, may audit Processor's processing. Audits take place on at least 30 days' written notice, during business hours, no more than once in any 12-month period unless a Personal Data Breach or a supervisory authority requires otherwise, and subject to confidentiality. Each party bears its own costs; Controller reimburses Processor's reasonable costs for audits beyond the annual allowance.

## 10. International transfers

Controller selects a production region, US-East or EU-West, and Customer Personal Data is stored and processed in that region.

Where Processor transfers Customer Personal Data out of the EEA, the UK, or Switzerland to a country without an adequacy decision, the SCCs are incorporated into this DPA and apply: Module Two where Controller is a controller, and Module Three where Controller is itself a processor. Clause 7 (docking) applies; Clause 9 uses option 2 with the notice period in Section 6; Clause 11 does not use the optional independent dispute body; Clause 17 selects the law of Ireland; Clause 18(b) selects the courts of Ireland. Annex I and Annex II of this DPA populate the corresponding SCC annexes. The UK International Data Transfer Addendum and the Swiss amendments apply where relevant, with the UK Information Commissioner and the Swiss Federal Data Protection and Information Commissioner as the competent authorities.

Processor will notify Controller if it becomes subject to a legally binding request for disclosure by a public authority, unless prohibited, and will challenge requests that appear unlawful or overbroad.

## 11. Deletion and return

Controller may export Customer Personal Data at any time during the term through the product or the API.

On termination or expiry, Processor will, at Controller's election, return or delete Customer Personal Data. Absent an election, Processor deletes it. Deletion of production data completes within **30 days** of the end of the term; encrypted backups age out and are deleted within a further **35 days**. Processor certifies deletion in writing on request.

Processor may retain Customer Personal Data to the extent required by law, in which case it continues to protect it under this DPA and processes it only for the purpose that requires retention.

## Annex I — Description of the processing

| Item | Detail |
| --- | --- |
| Data exporter | The customer named in the order form, acting as controller |
| Data importer | Meridian Systems, Inc., acting as processor |
| Subject matter | Provision of governed AI agents for HR and finance operations |
| Duration | The subscription term, plus the deletion periods in Section 11 |
| Nature and purpose | Storage, retrieval, analysis, generation of drafts and recommendations, routing for human approval, and logging |
| Categories of data subject | Controller's employees, contractors, candidates, customers, suppliers, and their representatives |
| Categories of personal data | Identification and contact data, employment and payroll data, compensation and benefits data, case and correspondence content, financial transaction and invoice data, contract terms, system identifiers and logs |
| Special category data | Only where Controller chooses to load it; Processor applies the measures in Annex II and does not process it for any other purpose |
| Frequency | Continuous, for the duration of the term |
| Competent supervisory authority | The Data Protection Commission, Ireland |

## Annex II — Technical and organisational measures

| Control area | Measures |
| --- | --- |
| Encryption | TLS 1.3 in transit; AES-256 at rest; customer-managed keys available on Enterprise |
| Access control | Least privilege, role-based access, hardware-backed MFA for all production access, quarterly access reviews, automated deprovisioning within 24 hours of a leaver event |
| Tenant isolation | Logical separation per workspace, enforced at the Gateway; region pinning for storage and compute |
| Human approval | Consequential agent actions require an approval from a named person before they take effect; the approver is recorded |
| Logging and audit | Immutable audit trail of inputs, model version, tool calls, approver, and outcome; export to the customer's SIEM; 12-month retention by default |
| Model governance | No training on customer data; model providers contractually bound to zero retention; model versions pinned and recorded per run |
| Network security | Segmented VPCs, no public database endpoints, WAF and rate limiting, DDoS protection at the edge |
| Vulnerability management | Continuous dependency scanning, critical patches within 7 days, annual third-party penetration test with a summary available to customers |
| Secure development | Peer review on every change, static analysis and secret scanning in CI, evaluation gates before an agent release, staged rollout with rollback |
| Business continuity | Point-in-time recovery for 35 days, RPO 15 minutes, RTO 4 hours, restore tested twice a year |
| Physical security | Processing in accredited data centres operated by the cloud infrastructure subprocessors listed on the subprocessors page; no Meridian-operated data centres |
| Incident response | 24/7 on-call, documented runbooks, breach notification within 48 hours, post-incident review published to affected customers |
| Personnel | Background checks where lawful, confidentiality agreements, annual security and privacy training |
| Certifications | SOC 2 Type II, ISO 27001; reports available under NDA |

## Annex III — Subprocessors

The authorised Subprocessors, by category, purpose, and location, are listed at [meridian.example/legal/subprocessors](/legal/subprocessors), which forms part of this DPA and is updated in line with Section 6.`;

const subprocessorsBody = `## How we use subprocessors

Meridian runs on a deliberately small set of vendors. Each one is engaged under a written contract with confidentiality, security, and audit terms at least as protective as the commitments in our [Data Processing Addendum](/legal/dpa), and we remain fully responsible to customers for their performance.

Before a vendor is added, it goes through a security review covering its certifications, its own subprocessors, where it processes data, its breach history, and its deletion commitments. The review is repeated annually and whenever the scope of processing changes.

## Current subprocessors

Categories are listed rather than vendor names because the specific entity differs by region and by the model a customer selects. Customers under contract receive the named list, with entity, registered address, and transfer mechanism, on request from their account team or at privacy@meridian.example.

| Category | Purpose | Processing location |
| --- | --- | --- |
| Cloud infrastructure (US) | Compute, storage, and networking for the US-East production region | United States |
| Cloud infrastructure (EU) | Compute, storage, and networking for the EU-West production region | Ireland and Germany |
| Model providers | Inference for agent reasoning and drafting. Customer-selected: each workspace chooses which providers are enabled, and can restrict inference to models hosted inside its own region | Customer-selected, within the workspace region |
| Email delivery | Transactional email: approval requests, alerts, digests, and account notifications | United States and European Union |
| Product analytics | Aggregate usage measurement for the website and the product console | European Union |

Model providers are engaged on zero-retention terms and are contractually prohibited from training on customer data. A workspace can be configured to allow no external providers at all, in which case inference runs only on models Meridian hosts inside the selected region.

## What subprocessors do not receive

Analytics and email delivery subprocessors receive account metadata, not HR or finance records. No subprocessor receives the contents of a workspace except the cloud infrastructure provider for the selected region and the model providers the customer has enabled.

## Change notice

We give **at least 30 days' notice** before adding or replacing a subprocessor. Notice is published on this page and sent by email to the addresses each customer has subscribed. To subscribe, or to change the addresses, write to privacy@meridian.example with your workspace name.

Customers may object on reasonable data protection grounds within the notice period. We will work with you to find an alternative; if none is available within 30 days, you may terminate the affected part of the Service and receive a pro-rata refund of prepaid fees, as set out in Section 6 of the DPA.

## Affiliates

Meridian Systems, Inc. processes data with the support of its wholly owned subsidiaries in the United Kingdom and Ireland. Those entities are bound by an intragroup agreement incorporating the Standard Contractual Clauses and the measures in Annex II of the DPA. They are not listed as third-party subprocessors.

## Questions

Write to privacy@meridian.example for the named list, a signed DPA, or a copy of the current SOC 2 Type II report. Details of the controls behind these arrangements are on the [security page](/security).`;

export const privacyDoc: LegalDocument = {
  path: "/legal/privacy",
  title: "Privacy Policy",
  label: "Privacy",
  description:
    "How Meridian handles personal data: controller and processor roles, lawful bases, retention periods, subprocessors, your rights, transfers, and security.",
  lede: "What personal data Meridian handles, why we handle it, how long we keep it, and the choices you have. Written for the data protection officer who has to review it.",
  body: privacyBody,
};

export const termsDoc: LegalDocument = {
  path: "/legal/terms",
  title: "Terms of Service",
  label: "Terms",
  description:
    "The contract for using Meridian: the service, accounts, credits and billing, acceptable use, intellectual property, warranties, liability caps, and termination.",
  lede: "The agreement between Meridian Systems, Inc. and the organisation using the platform. Consumption pricing, human approval, and Delaware governing law.",
  body: termsBody,
};

export const dpaDoc: LegalDocument = {
  path: "/legal/dpa",
  title: "Data Processing Addendum",
  label: "DPA",
  description:
    "Meridian's DPA: processing instructions, security measures, subprocessor notice, audit rights, breach notification, transfers under the SCCs, and deletion.",
  lede: "The processing terms that sit alongside the Terms of Service, with the security annex and the Standard Contractual Clauses that cover transfers out of the EEA.",
  body: dpaBody,
};

export const subprocessorsDoc: LegalDocument = {
  path: "/legal/subprocessors",
  title: "Subprocessors",
  label: "Subprocessors",
  description:
    "The vendor categories Meridian uses to run the service, with purpose and processing location, plus the 30-day notice process before a subprocessor changes.",
  lede: "The categories of vendor behind the service, what each one is used for, and where it processes data. Thirty days' notice before anything on this list changes.",
  body: subprocessorsBody,
};
