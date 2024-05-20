import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  static setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  static getValue(key: string): string | null {
    return localStorage.getItem(key);
  }

  static clear(): void {
    localStorage.clear();
  }
}
