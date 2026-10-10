import { Injectable } from '@angular/core';

export type ToastType = 'success' | 'error';

export interface ToastMessage {
  message: string;
  type: ToastType;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: ToastMessage[] = [];

  private show(message: string, type: ToastType, duration: number): void {
    const toast = { message, type };
    this.toasts = [...this.toasts, toast];
    if (duration > 0) {
      setTimeout(() => this.dismiss(toast), duration);
    }
  }

  success(message: string, duration = 3000): void {
    this.show(message, 'success', duration);
  }

  error(message: string, duration = 3000): void {
    this.show(message, 'error', duration);
  }

  dismiss(toast: ToastMessage): void {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}
