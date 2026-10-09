import { useState, useEffect, useCallback } from 'react';
import { SystemInfo } from '../types';
import { getSystemInfo } from '../api/system';
import { apiClient } from '../api/client';

export function useSystemInfo() {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMockMode, setIsMockMode] = useState<boolean>(apiClient.isMockMode());

  const fetchSystem = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const info = await getSystemInfo();
      setSystemInfo(info);
    } catch (err: any) {
      setError(err?.message || 'Failed to detect system hardware info');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSystem();
  }, [fetchSystem]);

  const toggleMockMode = (enable: boolean) => {
    apiClient.setMockMode(enable);
    setIsMockMode(enable);
    fetchSystem();
  };

  return {
    systemInfo,
    loading,
    error,
    isMockMode,
    toggleMockMode,
    refresh: fetchSystem,
  };
}
