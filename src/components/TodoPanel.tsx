import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoPanelProps {
  className?: string;
}

export function TodoPanel({ className }: TodoPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
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
    <div className={className}>
      {/* Toggle button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="sm"
        className="zen-transition rounded-full font-zen mb-4"
      >
        <Plus className="w-4 h-4 mr-2" />
        Tasks
      </Button>

      {/* Todo panel */}
      <div
        className={cn(
          "zen-transition overflow-hidden",
          isOpen 
            ? "max-h-96 opacity-100" 
            : "max-h-0 opacity-0"
        )}
      >
        <div className="bg-card rounded-2xl p-6 zen-shadow border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium font-zen text-card-foreground">Tasks</h3>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="rounded-full h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Add new todo */}
          <div className="flex gap-2 mb-4">
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a new task..."
              className="zen-transition rounded-xl font-zen"
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
          <div className="space-y-3 max-h-48 overflow-y-auto">
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
      </div>
    </div>
  );
}