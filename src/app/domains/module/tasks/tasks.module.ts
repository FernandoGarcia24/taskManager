export interface Task {
  id: number;
  title: string;
  deadline: Date;
  completed: boolean;
  people: Person[];
}

export interface Person {
  name: string;
  age: number;
  skills: { ability: string }[];
}
