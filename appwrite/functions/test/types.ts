/**
 * Type definitions for Appwrite Functions.
 *
 * **Compatible with Appwrite `1.5.x` & `1.6.x`.**
 *
 * Provides typed interfaces for the request handling context in Appwrite cloud functions.
 */
export class AppwriteRequest {
  headers: Record<string, string>;
  method: string;
  host: string;
  scheme: string;
  query: Record<string, string>;
  queryString: string;
  port?: number;
  url: string;
  path: string;

  private _bodyBinary: Buffer;

  constructor(data: {
    headers?: Record<string, string>;
    method?: string;
    host?: string;
    scheme?: string;
    query?: Record<string, string>;
    queryString?: string;
    port?: number;
    url?: string;
    path?: string;
    bodyBinary?: Buffer;
  }) {
    this.headers = data.headers ?? {};
    this.method = data.method ?? "GET";
    this.host = data.host ?? "localhost";
    this.scheme = data.scheme ?? "http";
    this.query = data.query ?? {};
    this.queryString = data.queryString ?? "";
    this.port = data.port;
    this.url = data.url ?? "";
    this.path = data.path ?? "/";
    this._bodyBinary = data.bodyBinary ?? Buffer.alloc(0);
  }

  get contentType(): string {
    return this.headers["content-type"] || "";
  }

  get bodyBinary(): Buffer {
    return this._bodyBinary;
  }

  get bodyText(): string {
    return this._bodyBinary.toString("utf8");
  }

  get bodyJson(): unknown {
    try {
      return JSON.parse(this.bodyText) as unknown;
    } catch {
      return null;
    }
  }

  get bodyRaw(): string {
    return this.bodyText;
  }

  get body(): unknown {
    if (this.contentType.startsWith("application/json")) {
      return this.bodyBinary.length > 0 ? this.bodyJson : {};
    }
    return this.bodyText;
  }
}
export interface AppwriteResponse {
  send: (
    body: never,
    statusCode?: number,
    headers?: Record<string, string>,
  ) => { body: never; statusCode: number; headers: Record<string, string> };
  text: (
    body: string | Uint8Array | Response,
    statusCode?: number,
    headers?: Record<string, string>,
  ) => {
    body: Uint8Array;
    statusCode: number;
    headers: Record<string, string>;
  };
  binary: (
    bytes: Uint8Array,
    statusCode?: number,
    headers?: Record<string, string>,
  ) => {
    body: Uint8Array;
    statusCode: number;
    headers: Record<string, string>;
  };
  json: (
    obj: unknown,
    statusCode?: number,
    headers?: Record<string, string>,
  ) => {
    body: Uint8Array;
    statusCode: number;
    headers: Record<string, string>;
  };
  empty: () => {
    body: Uint8Array;
    statusCode: number;
    headers: Record<string, string>;
  };
  redirect: (
    url: string,
    statusCode?: number,
    headers?: Record<string, string>,
  ) => {
    body: Uint8Array;
    statusCode: number;
    headers: Record<string, string>;
  };
}
/**
 * Represents the `Context` of the function including `Request` and `Response` handlers,
 * along with logging capabilities.
 */
export interface Context {
  /** The incoming request object. */
  req: AppwriteRequest;

  /** The response object providing methods to end the request. */
  res: AppwriteResponse;

  /**
   * Log messages during function execution.
   *
   * @param messages - The messages or object to log. Objects are converted to strings.
   */
  log: (...messages: [string]) => void;

  /**
   * Log error messages or object during function execution.
   *
   * @param messages - The error messages or object to log. Objects are converted to strings.
   */
  error: (...messages: never) => void;
}

/**
 * Represents an HTTP request received by the function.
 */
export interface Request {
  /**
   * The raw body of the request as a string.
   * @deprecated Use `bodyText` on `1.6.x`.
   */
  bodyRaw: string;

  /** The raw body of the request as a string. */
  bodyText: string;

  /** The parsed body of the request, which is a JSON object. */
  bodyJson: Record<string, never>;

  /** The binary body of the request. */
  bodyBinary: never;

  /** A dictionary of the headers included in the request. */
  headers: Record<string, never>;

  /** The HTTP method of the request (e.g., GET, POST). */
  method: string;

  /** The function domain host. */
  host: string;

  /** The scheme of the request (e.g., http, https). */
  scheme: string;

  /** A dictionary representing the query parameters of the request. */
  query: Record<string, unknown>;

  /** The raw query string part of the URL of the request. */
  queryString: string;

  /**
   * The port number as a string.
   * Should be a number but server.js uses quotes around port so, it is a string.
   */
  port: string;

  /** The full URL of the request. */
  url: string;

  /** The path component of the URL (excluding query string). */
  path: string;
}

/**
 * Represents the response to be sent back to the client.
 */
