import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

export class SerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // Run some code before request is handled by request handler
        console.log('Before request is handled by request handler', context);


        return next.handle().pipe(
            map((data: any) => {
                // Run some code before response is sent out
                console.log('Before response is sent out', data); 
                return data;
            }) 
        );
    }
}