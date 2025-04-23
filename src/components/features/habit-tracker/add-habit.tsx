
import { useState } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface NewHabitForm {
  name: string;
  description: string;
  category: string;
}

interface AddHabitProps {
  onHabitAdded?: (habit: any) => void;
}

export function AddHabit({ onHabitAdded }: AddHabitProps) {
  const [open, setOpen] = useState(false);
  
  const form = useForm<NewHabitForm>({
    defaultValues: {
      name: "",
      description: "",
      category: "health"
    }
  });

  const handleSubmit = (values: NewHabitForm) => {
    // Generate a random ID for the habit
    const newHabit = {
      id: crypto.randomUUID(),
      name: values.name,
      description: values.description,
      streak: 0,
      frequencyType: "daily",
      frequencyCount: 1,
      completedToday: false,
      category: values.category,
    };

    // Call the callback to add the habit
    if (onHabitAdded) {
      onHabitAdded(newHabit);
    }
    
    toast.success("Habit added successfully!");
    setOpen(false);
    form.reset();
  };

  return (
    <>
      <button 
        onClick={() => setOpen(true)} 
        className="flex items-center justify-center gap-2 w-full p-3 rounded-xl border border-dashed border-primary/50 text-primary hover:bg-primary/5 transition-colors"
      >
        <Plus size={18} className="text-primary" />
        <span className="font-medium">Add New Habit</span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Habit</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Habit Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Daily meditation" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="10 minutes of mindfulness each day" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        {...field}
                      >
                        <option value="health">Health</option>
                        <option value="fitness">Fitness</option>
                        <option value="learning">Learning</option>
                        <option value="mindfulness">Mindfulness</option>
                        <option value="productivity">Productivity</option>
                      </select>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit">Add Habit</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
