type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'critical';
type ErrorCategory = 'NETWORK' | 'STORAGE' | 'PERMISSION' | 'VALIDATION' | 'UNEXPECTED' | 'EVENT' | 'AUTH';

interface ErrorContext {
  category: ErrorCategory;
  component?: string;
  action?: string;
  metadata?: Record<string, any>;
}

const isDevelopment = import.meta.env.MODE === 'development' || import.meta.env.DEV;

class ErrorHandler {
  private static instance: ErrorHandler;

  private constructor() {}

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  log(level: LogLevel, message: string, error?: unknown, context?: ErrorContext): void {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
    const categoryTag = context?.category ? `[${context.category}]` : '';
    const componentTag = context?.component ? `[${context.component}]` : '';

    const fullMessage = `${prefix}${categoryTag}${componentTag} ${message}`;

    if (isDevelopment) {
      switch (level) {
        case 'debug':
          console.debug(fullMessage, error, context?.metadata);
          break;
        case 'info':
          console.info(fullMessage, error, context?.metadata);
          break;
        case 'warn':
          console.warn(fullMessage, error, context?.metadata);
          break;
        case 'error':
        case 'critical':
          console.error(fullMessage, error, context?.metadata);
          if (error instanceof Error && error.stack) {
            console.error('Stack trace:', error.stack);
          }
          break;
      }
    } else {
      if (level === 'critical' || level === 'error') {
        console.error(fullMessage, error);
      }
    }
  }

  debug(message: string, error?: unknown, context?: ErrorContext): void {
    this.log('debug', message, error, context);
  }

  info(message: string, error?: unknown, context?: ErrorContext): void {
    this.log('info', message, error, context);
  }

  warn(message: string, error?: unknown, context?: ErrorContext): void {
    this.log('warn', message, error, context);
  }

  error(message: string, error?: unknown, context?: ErrorContext): void {
    this.log('error', message, error, context);
  }

  critical(message: string, error?: unknown, context?: ErrorContext): void {
    this.log('critical', message, error, context);
  }
}

export const errorHandler = ErrorHandler.getInstance();

export function safeJSONParse<T>(json: string, fallback: T, context?: ErrorContext): T {
  try {
    return JSON.parse(json) as T;
  } catch (e) {
    errorHandler.warn('JSON parse failed, using fallback', e, {
      category: 'VALIDATION',
      ...context,
    });
    return fallback;
  }
}

export function safeLocalStorageGet(key: string, context?: ErrorContext): string | null {
  try {
    if (typeof localStorage === 'undefined') {
      errorHandler.debug('localStorage is not available', undefined, {
        category: 'STORAGE',
        ...context,
      });
      return null;
    }
    return localStorage.getItem(key);
  } catch (e) {
    errorHandler.warn(`Failed to read from localStorage: ${key}`, e, {
      category: 'STORAGE',
      ...context,
    });
    return null;
  }
}

export function safeLocalStorageSet(key: string, value: string, context?: ErrorContext): boolean {
  try {
    if (typeof localStorage === 'undefined') {
      errorHandler.debug('localStorage is not available', undefined, {
        category: 'STORAGE',
        ...context,
      });
      return false;
    }
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    if (e instanceof Error && e.name === 'QuotaExceededError') {
      errorHandler.error(`localStorage quota exceeded for key: ${key}`, e, {
        category: 'STORAGE',
        ...context,
      });
    } else {
      errorHandler.warn(`Failed to write to localStorage: ${key}`, e, {
        category: 'STORAGE',
        ...context,
      });
    }
    return false;
  }
}

export function safeLocalStorageRemove(key: string, context?: ErrorContext): boolean {
  try {
    if (typeof localStorage === 'undefined') {
      return false;
    }
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    errorHandler.warn(`Failed to remove from localStorage: ${key}`, e, {
      category: 'STORAGE',
      ...context,
    });
    return false;
  }
}

export function safeDispatchEvent(event: Event | CustomEvent, context?: ErrorContext): boolean {
  try {
    if (typeof window === 'undefined') {
      return false;
    }
    window.dispatchEvent(event);
    return true;
  } catch (e) {
    errorHandler.debug('Failed to dispatch event', e, {
      category: 'EVENT',
      ...context,
    });
    return false;
  }
}

export function safeDocumentDispatchEvent(event: Event | CustomEvent, context?: ErrorContext): boolean {
  try {
    if (typeof document === 'undefined') {
      return false;
    }
    document.dispatchEvent(event);
    return true;
  } catch (e) {
    errorHandler.debug('Failed to dispatch document event', e, {
      category: 'EVENT',
      ...context,
    });
    return false;
  }
}

export function safeAddEventListener(
  target: Window | Document,
  event: string,
  handler: EventListener,
  context?: ErrorContext
): boolean {
  try {
    target.addEventListener(event, handler);
    return true;
  } catch (e) {
    errorHandler.debug(`Failed to add event listener: ${event}`, e, {
      category: 'EVENT',
      ...context,
    });
    return false;
  }
}

export function safeRemoveEventListener(
  target: Window | Document,
  event: string,
  handler: EventListener,
  context?: ErrorContext
): boolean {
  try {
    target.removeEventListener(event, handler);
    return true;
  } catch (e) {
    errorHandler.debug(`Failed to remove event listener: ${event}`, e, {
      category: 'EVENT',
      ...context,
    });
    return false;
  }
}
