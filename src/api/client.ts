/**
 * Centralized API client for PRL
 * Reads backend URL from VITE_API_URL or defaults to http://localhost:8000
 */

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000';

export interface ApiResponse<T> {
  data: T | null;
  error?: string;
  isFallback?: boolean;
}

export class ApiClient {
  private baseUrl: string;
  private isLiveBackendAvailable: boolean | null = null;
  private forceMockMode: boolean = false;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
    // Check local storage setting if previously toggled
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('PRL_FORCE_MOCK');
      if (stored !== null) {
        this.forceMockMode = stored === 'true';
      }
    }
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public isMockMode(): boolean {
    return this.forceMockMode;
  }

  public setMockMode(value: boolean) {
    this.forceMockMode = value;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('PRL_FORCE_MOCK', String(value));
    }
  }

  public isConnected(): boolean {
    return !this.forceMockMode && this.isLiveBackendAvailable === true;
  }

  public async get<T>(endpoint: string, fallbackData?: () => T | Promise<T>): Promise<T> {
    if (this.forceMockMode && fallbackData) {
      return await fallbackData();
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
      const res = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      this.isLiveBackendAvailable = true;
      return await res.json();
    } catch (err) {
      this.isLiveBackendAvailable = false;
      if (fallbackData) {
        return await fallbackData();
      }
      throw err;
    }
  }

  public async post<T, B = any>(endpoint: string, body: B, fallbackData?: () => T | Promise<T>): Promise<T> {
    if (this.forceMockMode && fallbackData) {
      return await fallbackData();
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); // 2min for heavy HPC runs

      const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorText = await res.text().catch(() => '');
        throw new Error(`Backend execution failed (${res.status}): ${errorText || res.statusText}`);
      }

      this.isLiveBackendAvailable = true;
      return await res.json();
    } catch (err) {
      this.isLiveBackendAvailable = false;
      if (fallbackData) {
        return await fallbackData();
      }
      throw err;
    }
  }
}

export const apiClient = new ApiClient();
