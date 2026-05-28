export type TTodoStage = "completed" | "incomplete";

// MongoDB model
export interface ITodo {
  title: string;
  stage: TTodoStage;
}
