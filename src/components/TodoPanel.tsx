import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, X, ListTodo } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export function TodoPanel() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: newTodo.trim(),
          completed: false,
        },
      ]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="zen"
          size="icon"
          className="rounded-full h-12 w-12 zen-shadow hover:scale-105 group relative"
        >
          <ListTodo className="w-5 h-5" />
          <span className="absolute right-full mr-3 px-2 py-1 bg-popover text-popover-foreground text-xs font-zen rounded-md opacity-0 group-hover:opacity-100 zen-transition whitespace-nowrap pointer-events-none">
            Tasks
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border border-border zen-shadow max-w-md">
        <DialogHeader>
          <DialogTitle className="font-zen text-lg">Tasks</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Add new todo */}
          <div className="flex gap-2">
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a new task..."
              className="zen-transition rounded-xl font-zen border-0 bg-secondary/30 focus:bg-secondary/50"
            />
            <Button
              onClick={addTodo}
              size="sm"
              className="zen-transition rounded-xl px-4"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Todo list */}
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {todos.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-4 font-zen">
                No tasks yet. Add one above!
              </p>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 zen-transition hover:bg-secondary/80"
                >
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                    className="zen-transition"
                  />
                  <span
                    className={cn(
                      "flex-1 font-zen text-sm zen-transition",
                      todo.completed 
                        ? "line-through text-muted-foreground" 
                        : "text-card-foreground"
                    )}
                  >
                    {todo.text}
                  </span>
                  <Button
                    onClick={() => deleteTodo(todo.id)}
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 rounded-full opacity-60 hover:opacity-100 zen-transition"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}