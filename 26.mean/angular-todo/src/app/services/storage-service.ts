import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  // =========================
  // 🔹 LOCAL STORAGE METHODS
  // =========================

  setLocal(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getLocal<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  removeLocal(key: string): void {
    localStorage.removeItem(key);
  }

  clearLocal(): void {
    localStorage.clear();
  }

  // =========================
  // 🔹 SESSION STORAGE METHODS
  // =========================

  setSession(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getSession<T>(key: string): T | null {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  removeSession(key: string): void {
    sessionStorage.removeItem(key);
  }

  clearSession(): void {
    sessionStorage.clear();
  }

  // =========================
  // 🔹 COMMON UTILITIES
  // =========================

  existsInLocal(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  existsInSession(key: string): boolean {
    return sessionStorage.getItem(key) !== null;
  }
}
