export interface OrderEvent {
    order_event_id: number;
    order_id: number;
    status: number;
    created_on: Date;
    created_by: number;
}
