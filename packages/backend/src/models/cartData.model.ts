export interface CartData {
    id: string;
    ver: number;
    items: Record<string, CartDataItem>;
}

export interface CartDataItem {
    title: string;
    unitPrice: string;
    qty: number;
}



