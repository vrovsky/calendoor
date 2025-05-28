import { EventForm } from "@/components/forms/EventForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewEventPage() {
  return (
    <Card className="max-w-md mx-auto border-2 border-blue-300 shadow-sm shadow-accent-foreground">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">New Event</CardTitle>
      </CardHeader>
      <CardContent>
        <EventForm />
      </CardContent>
    </Card>
  );
}
