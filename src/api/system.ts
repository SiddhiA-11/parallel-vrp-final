import { apiClient } from './client';
import { SystemInfo } from '../types';
import { detectSystemInfo } from '../mock/systemMock';

export async function getSystemInfo(): Promise<SystemInfo> {
  return apiClient.get<SystemInfo>('/api/system-info', () => {
    return detectSystemInfo();
  });
}
