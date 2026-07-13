import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { todoApi } from "../services/todoApi";
import type { TodoFilters, TodoUpdateBody } from "@/shared/types/todo.types";

type CreateTodoParams = Parameters<typeof todoApi.create>[0];
type UpdateTodoParams = {
  todoId: string;
  updates: TodoUpdateBody;
};
type DeleteTodoParams = Parameters<typeof todoApi.delete>[0];

const TODOS_KEY = "todos";
const TODO_KEY = "todo"

export const useTodos = (filter?: TodoFilters) => {
  return useQuery({
    queryKey: [TODOS_KEY, filter],
    queryFn: () => todoApi.getAll(filter),
  });
};

export const useTodo = (todoId: string) => {
  return useQuery({
    queryKey: [TODO_KEY, todoId],
    queryFn: () => todoApi.getOne(todoId),
    enabled: Boolean(todoId),
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todo: CreateTodoParams) => todoApi.create(todo),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [TODOS_KEY] }),
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ todoId, updates }: UpdateTodoParams) => {
      return todoApi.update(todoId, updates);
    },
    onSuccess: (_, { todoId }) => {
      queryClient.invalidateQueries({ queryKey: [TODOS_KEY] });
      queryClient.invalidateQueries({ queryKey: [TODO_KEY, todoId] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoId: DeleteTodoParams) => todoApi.delete(todoId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [TODOS_KEY] }),
  });
};

export const useClearTodos = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => todoApi.clear(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [TODOS_KEY] }),
  });
};
