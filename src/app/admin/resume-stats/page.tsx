import { ResumeStatsViewer } from "@/components/ResumeStatsViewer";

export default function ResumeStatsPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Resume Downloads</h1>
        <ResumeStatsViewer />
      </div>
    </div>
  );
}
