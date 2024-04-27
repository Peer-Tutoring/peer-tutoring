import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Settings = () => {
  return (
    <div className="min-h-screen p-6 md:p-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your profile information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              defaultValue={`${localStorage.getItem("firstName")} ${localStorage.getItem("lastName")}`}
              id="name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              defaultValue={`${localStorage.getItem("email")}`}
              id="email"
              type="email"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto">Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Settings;
