import { useNavigation } from "react-router";

import { cn } from "@/lib/styles";

export function GlobalPendingIndicator() {
  const navigation = useNavigation();
  const pending = navigation.state !== "idle";

  return (
    <div className={cn("fixed top-0 left-0 right-0", { hidden: !pending })}>
      <div className="bg-muted h-0.5 w-full overflow-hidden">
        <div className="animate-progress bg-muted-foreground origin-left-right size-full" />
      </div>
    </div>
  );
}
