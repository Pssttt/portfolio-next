import { ContactMessagesViewer } from "@/components/ContactMessagesViewer";

export default function ContactMessagesPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Contact Messages</h1>
        <ContactMessagesViewer />
      </div>
    </div>
  );
}
