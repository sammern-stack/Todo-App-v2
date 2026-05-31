export type TStage = "complete" | "incomplete";

export interface ITodo {
  title: string;
  stage: TStage;
}
