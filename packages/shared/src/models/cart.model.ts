// Requests
export interface ValidateCart {
    token?: string;
}
export interface UpsertCartProduct {
    qty: number;
    token?: string;
}

// Responses
export interface Cart {
    token: string;
    summary: CartSummary;
}

export interface CartSummary {
    items: Record<string, CartSummaryItem>;
    subtotal: string;
    discounts: Discount[];
    fees: Fee[];
    total: string;
    currency: string;
}

export interface CartSummaryItem {
    title: string;
    qty: number;
    unitPrice: string;
    totalPrice: string;
}

export interface Discount {
    title: string;
    amount: string;
}

export interface Fee {
    title: string;
    amount: string;
}

