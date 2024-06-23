import { Injectable } from "@nestjs/common";

export interface IRepository<T,CreateDTO>{
  create(data: CreateDTO): Promise<T>;
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T>;
  update(id: string, data: Partial<CreateDTO>): Promise<T>;
  delete(id: string): Promise<void>;
}

export const IRepository = Symbol('IRepository')