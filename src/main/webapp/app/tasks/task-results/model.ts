export interface Log {
  id?: string;
  created?: Date;
  thread?: string;
  level?: string;
  loggerName?: string;
  message?: string;
  endOfBatch?: boolean;
  loggerFqcn?: string;
  threadId?: number;
  threadPriority?: number;
}

export interface Pageable {
  size?: number;
  totalSize?: number;
  content?: Array<Log>;
}
