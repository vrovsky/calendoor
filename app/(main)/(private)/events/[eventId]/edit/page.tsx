import { EventForm } from "@/components/forms/EventForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getEvent } from "@/server/actions/events";
import { auth } from "@clerk/nextjs/server";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { userId, redirectToSignIn } = await auth();

  if (userId == null) return redirectToSignIn();

  const { eventId } = await params;

  const event = await getEvent(userId, eventId);
  if (!event) return <h1>Event not found</h1>;

  return (
    <Card className="max-w-md mx-auto border-2 border-blue-300 shadow-sm shadow-accent-foreground">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Edit Event</CardTitle>
      </CardHeader>
      <CardContent>
        <EventForm
          event={{ ...event, description: event.description || undefined }}
        />
      </CardContent>
    </Card>
  );
}
