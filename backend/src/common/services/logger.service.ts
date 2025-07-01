import { Injectable, LoggerService, Scope, Optional, Inject } from "@nestjs/common";

/**
 * Servicio de logger personalizado para la aplicación
 * Extiende la funcionalidad del LoggerService de NestJS
 */
@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggerService implements LoggerService {
  private context?: string;

  /**
   * Constructor del servicio de logger
   * @param context Contexto del logger (normalmente el nombre de la clase)
   */
  constructor(@Optional() @Inject("LOGGER_CONTEXT") context?: string) {
    this.context = context;
  }

  /**
   * Establece el contexto del logger
   * @param context Contexto del logger
   */
  setContext(context: string) {
    this.context = context;
  }

  /**
   * Registra un mensaje de log
   * @param message Mensaje a registrar
   * @param context Contexto opcional
   */
  log(message: any, context?: string) {
    this.printMessage("log", message, context);
  }

  /**
   * Registra un mensaje de error
   * @param message Mensaje de error
   * @param trace Stack trace opcional
   * @param context Contexto opcional
   */
  error(message: any, trace?: string, context?: string) {
    this.printMessage("error", message, context);
    if (trace) {
      console.error(trace);
    }
  }

  /**
   * Registra un mensaje de advertencia
   * @param message Mensaje de advertencia
   * @param context Contexto opcional
   */
  warn(message: any, context?: string) {
    this.printMessage("warn", message, context);
  }

  /**
   * Registra un mensaje de depuración
   * @param message Mensaje de depuración
   * @param context Contexto opcional
   */
  debug(message: any, context?: string) {
    this.printMessage("debug", message, context);
  }

  /**
   * Registra un mensaje detallado
   * @param message Mensaje detallado
   * @param context Contexto opcional
   */
  verbose(message: any, context?: string) {
    this.printMessage("verbose", message, context);
  }

  /**
   * Imprime un mensaje de log con formato
   * @param level Nivel de log
   * @param message Mensaje a imprimir
   * @param contextOverride Contexto opcional que sobreescribe el contexto del servicio
   */
  private printMessage(level: string, message: any, contextOverride?: string) {
    const finalContext = contextOverride || this.context;
    const timestamp = new Date().toISOString();
    const formattedMessage: string =
      typeof message === "object" ? JSON.stringify(message, null, 2) : String(message);

    // Color según el nivel de log
    let color = "\x1b[0m"; // Reset
    switch (level) {
      case "error":
        color = "\x1b[31m"; // Rojo
        break;
      case "warn":
        color = "\x1b[33m"; // Amarillo
        break;
      case "log":
        color = "\x1b[32m"; // Verde
        break;
      case "debug":
        color = "\x1b[36m"; // Cyan
        break;
      case "verbose":
        color = "\x1b[35m"; // Magenta
        break;
    }

    // Formato: [Timestamp] [Nivel] [Contexto] Mensaje
    console.log(
      `${color}[${timestamp}] [${level.toUpperCase()}]${
        finalContext ? ` [${finalContext}]` : ""
      } ${formattedMessage}\x1b[0m`,
    );
  }
}
