import { ScheduleForm } from "@/components/forms/ScheduleForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSchedule } from "@/server/actions/schedule";
import { auth } from "@clerk/nextjs/server";

export default async function SchedulePage() {
  const { userId, redirectToSignIn } = await auth();
  if (userId == null) return redirectToSignIn();

  const schedule = await getSchedule(userId);
  return (
    <Card className="max-w-md mx-auto border-2 border-blue-300 shadow-sm shadow-accent-foreground">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <ScheduleForm schedule={schedule} />
      </CardContent>
    </Card>
  );
}
