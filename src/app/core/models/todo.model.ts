/**
 * Todo model interface
 * Represents a single todo item with metadata
 */
export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string; // ISO 8601 format
  updatedAt?: string; // ISO 8601 format
}

/**
 * Enum for filter states
 */
export enum TodoFilter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

/**
 * Enum for sort options
 */
export enum TodoSort {
  CREATED = 'created',
  TITLE = 'title',
  STATUS = 'status',
}
