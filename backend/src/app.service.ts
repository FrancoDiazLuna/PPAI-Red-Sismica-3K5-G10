import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "API REST con NestJS funcionando correctamente!";
  }
}
