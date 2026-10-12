/** Cleanup releases only components initialized by the corresponding call. */
export type Cleanup = () => void;
export type Scope = Document | Element | DocumentFragment | null;
export function initOJ(root?: Scope): Cleanup;
export function initTabs(root?: Scope): Cleanup;
export function initDropdowns(root?: Scope): Cleanup;
export function initTooltips(root?: Scope): Cleanup;
export function initDialogs(root?: Scope): Cleanup;
export interface DialogOptions {
  root?: Scope;
  trigger?: HTMLElement;
}
export function openDialog(
  dialog: HTMLDialogElement | string,
  options?: DialogOptions,
): HTMLDialogElement;
export function closeDialog(
  dialog: HTMLDialogElement | string,
  returnValue?: string,
  options?: Pick<DialogOptions, 'root'>,
): HTMLDialogElement;
export interface ConfirmOptions {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'primary' | 'danger';
  root?: Scope;
}
export function confirmDialog(options: ConfirmOptions): Promise<boolean>;
export interface ToastOptions {
  type?: 'info' | 'success' | 'warning' | 'danger' | 'error';
  /** Milliseconds; 0 keeps the notification until dismissed. */
  duration?: number;
  root?: Scope;
  dismissLabel?: string;
}
export interface ToastHandle {
  element: HTMLElement;
  dismiss(): void;
}
export function toast(message: string, options?: ToastOptions): ToastHandle;
export interface TabChangeDetail {
  tab: HTMLElement;
  panel: HTMLElement | null;
  index: number;
}
export interface DropdownDetail {
  trigger: HTMLElement;
  menu: HTMLElement;
}
export interface MenuSelectDetail {
  item: HTMLElement;
  value: string;
}
export interface DialogDetail {
  dialog: HTMLDialogElement;
  returnValue: string;
}
