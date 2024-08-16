import { STATUS_ERROR } from '@/constant/status-error'

export type EntityErrorPayload = {
  message: string
  errors: {
    field: string
    message: string
  }[]
}

export class HttpError extends Error {
  status: number
  payload: {
    message: string
    [key: string]: any
  }
  constructor({ status, payload, message }: { status: number; payload: any, message? : string }) {
    super(message)
    this.status = status
    this.payload = payload
  }
}

export class EntityError extends HttpError {
  status: typeof STATUS_ERROR.ENTITY_ERROR_STATUS
  payload: EntityErrorPayload
  constructor({
    status,
    payload
  }: {
    status: typeof STATUS_ERROR.ENTITY_ERROR_STATUS
    payload: EntityErrorPayload
  }) {
    super({ status, payload, message: 'error instance' })
    this.status = status
    this.payload = payload
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string = 'Unauthorized') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}
