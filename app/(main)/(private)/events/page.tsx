import EventCard from "@/components/cards/EventCard";
import { Button } from "@/components/ui/button";
import { getEvents } from "@/server/actions/events";
import { auth } from "@clerk/nextjs/server";
import { CalendarPlus, CalendarRange } from "lucide-react";
import Link from "next/link";

export default async function EventsPage() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const events = await getEvents(userId);

  return (
    <section className="flex flex-col items-center gap-2 animate-fade-in">
      {/* Page title and "New Event" button */}
      <div className="flex flex-col text-center items-center">
        <h1 className="text-2xl xl:text-3xl font-semibold mb-4">Events</h1>
      </div>

      {/* Show event cards if any exist, otherwise show empty state */}
      {events.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-10">
          {events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <CalendarRange className="size-16 mx-auto text-black" />
          You do not have any events yet. Create your first event to get
          started!
          <Button
            className="bg-blue-400 hover:bg-blue-500 text-white py-2 hover:scale-105 duration-200 border-b-2 border-blue-700 hover:border-blue-500 rounded-md shadow-accent-foreground text-lg font-semibold"
            asChild
          >
            {/* 
                        Without asChild, the Button would render as:
                        <button><a href="/dashboard">Go to Dashboard</a></button> <!-- Invalid HTML -->
                        With asChild, it renders as:
                        <a href="/dashboard" class="...button styles...">Go to Dashboard</a> <!-- Valid HTML -->
                        This is useful when you want to make another element (like a <Link>) look and behave like a button without breaking HTML semantics.
                        */}
            <Link href="/events/new">
              <CalendarPlus className="size-4" /> New Event
            </Link>
          </Button>
        </div>
      )}
    </section>
  );
}
