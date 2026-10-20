/** Cleanup releases only components initialized by the corresponding call. */
export type Cleanup = () => void;
export type Scope = Document | Element | DocumentFragment | null;
export function initOJ(root?: Scope): Cleanup;
export function initTabs(root?: Scope): Cleanup;
export function initDropdowns(root?: Scope): Cleanup;
export interface MultiselectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
export interface MultiselectLabels {
  placeholder?: string;
  search?: string;
  searchPlaceholder?: string;
  reset?: string;
  empty?: string;
  noResults?: string;
}
export interface MultiselectConfig {
  label: string;
  options?: readonly MultiselectOption[];
  value?: readonly string[];
  description?: string;
  labels?: MultiselectLabels;
  formatSelection?: (options: MultiselectOption[]) => string;
  disabled?: boolean;
  /** Optional name for native checkbox form entries. */
  name?: string;
  /** Owner document; defaults to globalThis.document. Does not mount the node. */
  document?: Document;
}
export interface MultiselectChangeDetail {
  value: string[];
  options: MultiselectOption[];
  source: 'input' | 'reset' | 'api' | 'options';
}
export interface MultiselectUpdateOptions {
  /** Default false. Emit oj:change only if the selected values change. */
  emit?: boolean;
}
export interface MultiselectHandle {
  node: HTMLDivElement;
  value(): string[];
  setValue(value: readonly string[], options?: MultiselectUpdateOptions): void;
  setOptions(
    options: readonly MultiselectOption[],
    update?: MultiselectUpdateOptions,
  ): void;
  /** Mount node before opening. */
  open(): void;
  close(): void;
  /** Close and release owned listeners. Call before removing node. Idempotent. */
  dispose(): void;
}
export function createMultiselect(config: MultiselectConfig): MultiselectHandle;
export function initTooltips(root?: Scope): Cleanup;
export function initCountUps(root?: Scope): Cleanup;
export function initVideoPreviews(root?: Scope): Cleanup;
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
