import { Button } from "@/components/ui/button";
import { API_ENDPOINTS } from "@/lib/apiConfig";
import { Trash } from "lucide-react";

interface DeleteSessionProps {
  session_id: number;
}

const DeleteSession = ({ session_id }: DeleteSessionProps) => {
  const deleteSession = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.DELETE_SESSION, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_id }),
      });
      if (response.ok) {
        console.log("Session deleted successfully");
        window.location.reload();
      } else {
        console.error("Failed to delete session");
      }
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  return (
    <Button
      className="text-destructive"
      size="icon"
      variant="outline"
      onClick={deleteSession}
    >
      <Trash className="h-4 w-4" />
      <span className="sr-only">Cancel</span>
    </Button>
  );
};

export default DeleteSession;
