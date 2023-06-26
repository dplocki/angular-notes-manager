import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
    public log(...params: any[]) {
        console.log.apply(this, params);
    }
}
