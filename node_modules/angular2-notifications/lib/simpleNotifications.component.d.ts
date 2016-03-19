import { Notification } from "./notification";
import { NotificationsService } from "./notifications.service";
export declare class SimpleNotificationsComponent {
    private _service;
    constructor(_service: NotificationsService);
    private listener;
    notifications: Notification[];
    private lastOnBottom;
    private maxStack;
    private preventLastDuplicates;
    private preventDuplicates;
    options: any;
    private timeOut;
    private maxLength;
    private clickToClose;
    private showProgressBar;
    private pauseOnHover;
    private theClass;
    private onCreate;
    private onDestroy;
    ngOnInit(): void;
    add(item: any): void;
    block(item: any): boolean;
    attachChanges(): void;
    buildEmit(notification: Notification, to: boolean): {
        createdOn: Date;
        type: string;
        id: string;
    };
    ngOnDestroy(): void;
}
