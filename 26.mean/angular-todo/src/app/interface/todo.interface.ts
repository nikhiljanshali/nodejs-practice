export interface Todo {
  selected: boolean;
  _id?: string;
  title: string;
  description: string;
  status: string;
  priority?: string;
  date?: string;
  tags?: string;
  completed?: boolean;
  created?: string;
  __v?: number;
}

// ✅ Generic API Response
export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}


export interface TodoCounter {
  message: string
  status: boolean
  data: TodoCounterList
}

export interface TodoCounterList {
  total: number
  pending: number
  inProgress: number
  completed: number
  cancelled: number
}




export interface TodoCounter {
  message: string
  status: boolean
  data: TodoCounterList
}

export interface TodoCounterList {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  cancelled: number;
}
