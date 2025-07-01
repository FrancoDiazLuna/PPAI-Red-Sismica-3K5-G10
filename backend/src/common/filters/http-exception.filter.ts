import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { CustomLoggerService } from "../services/logger.service";

/**
 * Filtro para manejar excepciones HTTP y registrarlas con el logger personalizado
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new CustomLoggerService(HttpExceptionFilter.name);

  /**
   * Método que se ejecuta cuando se captura una excepción
   * @param exception La excepción capturada
   * @param host Argumentos del host
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    // Crear una respuesta de error estructurada
    const errorMessage =
      typeof errorResponse === "string"
        ? errorResponse
        : typeof errorResponse === "object" && "message" in errorResponse
          ? Array.isArray(errorResponse.message)
            ? errorResponse.message.join(", ")
            : String(errorResponse.message)
          : "Error interno del servidor";

    const error = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: errorMessage,
    };

    // Registrar el error con diferentes niveles según la gravedad
    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `Error ${status} en ${request.method} ${request.url}: ${errorMessage}`,
        exception.stack,
      );
    } else if (status >= HttpStatus.BAD_REQUEST) {
      this.logger.warn(`Error ${status} en ${request.method} ${request.url}: ${errorMessage}`);
    } else {
      this.logger.log(`Error ${status} en ${request.method} ${request.url}: ${errorMessage}`);
    }

    // Enviar respuesta al cliente
    response.status(status).json(error);
  }
}

/**
 * Filtro para manejar excepciones no controladas y registrarlas con el logger personalizado
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new CustomLoggerService(AllExceptionsFilter.name);

  /**
   * Método que se ejecuta cuando se captura una excepción
   * @param exception La excepción capturada
   * @param host Argumentos del host
   */
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Determinar el estado HTTP y el mensaje
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = "Error interno del servidor";

    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse();
      message =
        typeof errorResponse === "string"
          ? errorResponse
          : typeof errorResponse === "object" && "message" in errorResponse
            ? String(errorResponse.message)
            : "Error interno del servidor";
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    // Crear una respuesta de error estructurada
    const error = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
    };

    // Registrar el error
    this.logger.error(
      `Error no controlado en ${request.method} ${request.url}: ${message}`,
      exception instanceof Error ? exception.stack : undefined,
    );

    // Enviar respuesta al cliente
    response.status(status).json(error);
  }
}
