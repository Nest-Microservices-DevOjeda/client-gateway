import { RpcError } from '@common/interfaces';

export function isRpcError(value: unknown): value is RpcError {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const error = value as Record<string, unknown>;

  return typeof error.message === 'string' && typeof error.status === 'number';
}
