export type Env = 'dev' | 'prod';
export type LogLevel = 'ERROR' | 'WARN' | 'INFO';
export type ErrorType = 'RUNTIME_ERROR' | 'HTTP_ERROR';

export type LogError = { message?: string; stack?: string };

type BaseErrorPayload = {
  app: string;
  env: Env;
  level: LogLevel;
  timestamp: string;
  message: string;
  stack: string | null;
  url: string;
  userAgent: string;
};

export type RuntimeErrorPayload = BaseErrorPayload & {
  type: 'RUNTIME_ERROR';
};

export type HttpErrorPayload = BaseErrorPayload & {
  type: 'HTTP_ERROR';
  status: number;
  statusText: string;
};

export type ErrorPayload = RuntimeErrorPayload | HttpErrorPayload;

export type LogResponse = {
  success: boolean;
};
