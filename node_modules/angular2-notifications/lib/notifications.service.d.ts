import { EventEmitter } from "angular2/core";
export declare class NotificationsService {
    emiter: EventEmitter<any>;
    set(notification: any, to: boolean): void;
    getChangeEmitter(): EventEmitter<any>;
    success(title: string, content: string, override?: any): void;
    error(title: string, content: string, override?: any): void;
    alert(title: string, content: string, override?: any): void;
    info(title: string, content: string, override?: any): void;
    create(title: string, content: string, type: string, override?: any): void;
    html(html: any, type: string, override?: any): void;
    removeAll(): void;
}
