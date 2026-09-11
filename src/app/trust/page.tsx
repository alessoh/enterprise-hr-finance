import { redirect } from "next/navigation";

/** The Trust pillar lives at /security (BRIEF §5, research/seo-geo-plan.md §6). */
export default function TrustPage() {
  redirect("/security");
}
