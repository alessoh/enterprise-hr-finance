# Source briefing: How a market leader uses AI agents in HR and finance (Sept 2026)

> Internal research input. Do not quote vendor names from this document on the public site (see BRIEF.md section 2).

Workday and AI Agents

How Workday Uses Agents Today, Where It Is Heading, and Which Models It Uses

Workday AI Research, Agent Factory

</w:pBdr><w:spacing w:after="120"/><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Calibri" w:eastAsia="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr><w:t>Prepared for Peter Alesso

Background briefing, September 2026


## The Short Answer

Workday uses AI agents in two ways. It embeds agents inside its own HR, finance, IT, and legal products to carry out specific pieces of work such as screening candidates, answering employee questions, collecting audit evidence, checking payroll configurations, and redlining contracts. And it sells a platform layer, built around Sana, the Agent System of Record, and the Agent Gateway, that lets customers govern agents from Workday, from partners, and from their own developers in one place. The future direction is to make Sana the single conversational front door to work, to expand the catalog of agents across every business function, to open the platform to third party agents through standards such as the Model Context Protocol, and to charge for all of it through a consumption based pricing model called Flex Credits.

On models, Workday does not specialize in one foundation model. Its Sana platform is model agnostic and lets customers choose among leading commercial models, including those from OpenAI and Anthropic, and Workday has historically combined partner models with its own purpose built models trained on the enormous volume of HR and financial transactions that flow through its platform. The job description you applied to confirms that proprietary pre training and post training for HR and finance workflows is a live research priority. The sections below give the detail and note where public information runs out.


## How Workday Uses Agents Today


### Agents in Human Resources

The Sana Self Service Agent is the most visible HR agent. It answers employee questions by drawing on Workday data and the organization's knowledge sources such as policies and handbooks, and Workday models it as deflecting up to three quarters of HR case volume and cutting resolution time by about thirty percent. The Recruiting Agent screens and shortlists candidates, with Workday citing a forty six percent reduction in screening time and a seventy percent reduction in manual recruiter reviews. The Paradox conversational applicant tracking system, acquired in 2025, handles high volume frontline hiring through chat, from first contact through interview scheduling. The Payroll Agent orchestrates work across the payroll process by identifying missing data and configuration problems and managing minimum wage updates, with Workday reporting payroll compliance achieved several times faster. The Frontline Agent finds shift replacements conversationally, cutting the time to fill a gap by about ninety percent in Workday's figures. In early access are a Job Architecture Agent that benchmarks roles against market data and a Performance Agent that drafts evidence based performance reviews.


### Agents in Finance

The Financial Audit Agent automates the collection of audit evidence, which Workday estimates saves on the order of nine hundred hours a year for a typical customer. The Planning Agent delivers variance insights and lets finance teams explore planning data conversationally, which is directly adjacent to the grounded variance explanation project proposed earlier in this session. The Financial Test Suite identifies anomalies and compliance problems such as duplicate payments, with one cited customer avoiding roughly 283 thousand dollars a year in duplicates. In early access is a Revenue Contract Agent that identifies risks in customer contracts and automates the related accounting.


### Agents in IT and Legal

For the teams that run Workday itself, the BP Optimize Agent analyzes business processes, finds bottlenecks, and recommends fixes, with Workday citing a twenty two percent reduction in the hours needed to complete onboarding per employee. A Deployment Agent guides system changes and an Adoption Agent in early access automates release management. On the legal side, the Contract Intelligence Agent, built on the Evisort acquisition, gives visibility into contract terms, and the Contract Negotiation Agent performs full document review and redlining against an organization's playbook, with pre signature processing about sixty five percent faster.


### The Common Pattern

Across all of these, the pattern is consistent and it is worth noticing as a researcher. Each agent is scoped to a specific workflow, operates on Workday's structured data and security model, produces a measurable time or cost saving that Workday can quote, and keeps a human accountable for consequential outcomes. These are not open ended assistants. They are narrow, governed workers, and the challenge Workday faces is making them more capable and more autonomous without losing the trust that narrowness provides.


## The Platform Layer


### Sana as the Front Door

Since the acquisition of Sana closed in late 2025, Workday has been rebuilding its AI experience around it. Sana provides a conversational interface that searches across Workday and external sources such as Google Drive, SharePoint, and Microsoft 365, generates documents, presentations, and learning content, and runs agents that automate workflows end to end. Sana Core and Sana Enterprise are generally available, with Sana Enterprise sold as an upgraded license. Agents that were previously branded Illuminate are being brought inside the Sana infrastructure, so that Sana becomes both the user facing front door and the runtime for Workday's agents.


### Agent System of Record

The Agent System of Record, now generally available, treats agents the way Workday's HCM treats employees. It gives customers a single registry of every agent in the enterprise, whether built by Workday, a partner, or the customer, with ownership, role, permissions, and compliance status recorded for each. It tracks what data agents touch and enforces access through Workday's existing security model. It provides blended workforce analytics so that leaders can see agent usage, process efficiency, and return on investment alongside human workforce metrics. This is Workday's bid to be the governance layer for all enterprise agents, not merely a supplier of its own.


### Agent Gateway and the Partner Network

The Agent Gateway connects third party agents to the Agent System of Record using open standards, including the Model Context Protocol for tool access, agent to agent interaction protocols, and OpenTelemetry for observability. The Agent Partner Network, announced in June 2025, now includes more than sixty five partners, among them Adobe and nearly twenty Workday Ventures portfolio companies, whose agents are offered through the Workday Marketplace. An integration with Microsoft Entra Agent ID lets agents built in Azure AI Foundry and Copilot Studio register in the Agent System of Record with verified identities.


### Data Cloud and Developer Tools

Agents are only as good as the data they can reach, so Workday has built out the Workday Data Cloud with zero copy sharing partnerships with Databricks, Snowflake, and Salesforce, SQL access through Live Data Query, and a data lake in early access built on Apache Iceberg standards. The acquisition of Pipedream added an integration platform with roughly three thousand prebuilt connectors to other applications. For customers who want to build their own agents, Workday Build with the Flowise Agent Builder provides a low code environment on top of Workday data, available to Workday Extend Professional customers.


### Flex Credits

Workday has moved to a consumption based pricing model called Flex Credits, included in all new contracts. Credits are consumed as customers use agents and AI features, and organizations buy more as usage grows. This matters for research because it ties Workday's revenue directly to how much work agents do, which in turn makes accuracy, cost to serve, and customer trust the variables that determine the business outcome. Analysts have noted that Workday has not yet fully defined long term packaging for Sana, so this model may continue to evolve.


## Where Workday Is Heading

Several directions are clear from public statements. The first is breadth: Workday announced a wave of new agents for HR, finance, and industry workflows launching through 2026, and the pattern of early access agents graduating to general availability will continue. The second is autonomy: current agents mostly draft, recommend, and orchestrate with a human approving, and the strategic goal, reflected in the job description's emphasis on long horizon planning and agentic reasoning, is agents that can carry whole processes to completion within governed limits. The third is unification: Sana becomes the single interface across Workday and non Workday systems, positioning Workday as the primary AI layer for work rather than one application among many. The fourth is openness: through the Agent Gateway, standard protocols, and the partner network, Workday wants every agent in the enterprise, including competitors' agents, to be registered and governed in its system. The fifth is data: the Data Cloud and lake investments aim to make Workday the place where HR and finance data meet the rest of the enterprise's data for both analytics and agents.

The founding of an AI Research team inside Agent Factory is itself a signal about the future. Workday's agents to date have been built largely by applying commercial models to Workday's data and workflows. Standing up a research group focused on pre training, post training, alignment, and agentic reasoning indicates that the company intends to own more of the intelligence layer itself, so that its agents' capabilities on HR and finance tasks are not simply what any competitor can obtain from the same model vendors.


## Which Models Workday Uses

Workday does not specialize in a single model family, and this is deliberate. Sana was built as a model agnostic platform that sits above the foundation model layer and lets customers select which model to use, with support for OpenAI models and Anthropic's Claude noted publicly. Workday's Microsoft integrations, including Entra Agent ID and support for agents built in Azure AI Foundry and Copilot Studio, and its data partnerships with Databricks, Snowflake, and Salesforce, reinforce a multi vendor posture.

Alongside partner models, Workday has long described using its own purpose built models trained on the very large volume of HR and financial transactions processed on its platform, applied to tasks such as anomaly detection, document extraction, forecasting, and recommendations where structured enterprise data gives it an advantage that a general model lacks. I was not able to confirm from current public sources exactly which proprietary models exist today or how they are combined with partner models inside the new Sana architecture, so treat this as the established pattern rather than a verified current inventory. What is unambiguous is the job description itself, which lists advancing Workday's proprietary capabilities in pre training, post training with RLHF and DPO, and domain specific alignment for HR and finance as a core responsibility. That tells you the direction: a layered approach in which commercial frontier models handle general language capability, Workday's own trained and aligned models handle the domain specific reasoning and the tasks where its data is decisive, and the Sana platform routes between them.

For your interviews, the useful framing is that Workday's advantage is not in owning the biggest model but in owning the most trusted enterprise data, the workflows that data flows through, and the governance layer that decides what an agent may do. The research team's job is to build the intelligence that turns those advantages into agents that customers will allow to act, and the model strategy, mixing partner models with proprietary post trained ones, follows from that.
