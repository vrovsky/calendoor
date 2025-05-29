import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatEventDescription } from "@/lib/formatters";
import { Button } from "../ui/button";
import Link from "next/link";
import { CopyEventButton } from "../CopyEventButton";

type EventCardProps = {
  id: string;
  isActive: boolean;
  name: string;
  description: string | null;
  duration_in_minutes: number;
  clerkUserId: string;
};

export default function EventCard({
  id,
  isActive,
  name,
  description,
  duration_in_minutes,
  clerkUserId,
}: EventCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col border-2 border-blue-300/10 shadow-sm transition delay-50 ease-in-out hover:-translate-y-1 hover:scale-105",
        !isActive && "bg-accent border-accent"
      )}
    >
      <CardHeader className={cn(!isActive && "opacity-50")}>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {formatEventDescription(duration_in_minutes)}
        </CardDescription>
      </CardHeader>
      {description !== null && (
        <CardContent className={cn(!isActive && "opacity-50")}>
          {description}
        </CardContent>
      )}

      <CardFooter className="flex justify-end gap-2 mt-auto">
        {!isActive && (
          <CopyEventButton
            variant="outline"
            eventId={id}
            clerkUserId={clerkUserId}
          />
        )}
        <Button
          className="cursor-pointer hover:scale-105 bg-blue-300 hover:bg-blue-400"
          asChild
        >
          <Link href={`/events/${id}/edit`}>Edit</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
