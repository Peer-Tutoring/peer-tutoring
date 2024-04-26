import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";

import Sessions from "@/components/dashboard/parts/Sessions";
import Settings from "@/components/dashboard/parts/Settings";

export default function Component() {
  return (
    <Tabs defaultValue="booked-sessions">
      <TabsList className="mx-auto mt-8 grid w-fit grid-cols-2">
        <TabsTrigger value="booked-sessions">Booked Sessions</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="booked-sessions">
        <Sessions />
      </TabsContent>
      <TabsContent value="settings">
        <Settings />
      </TabsContent>
    </Tabs>
  );
}
