import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { PrizeoutOffer } from './offers-slice';

export interface CheckoutSlice {
    isSide: boolean;
    loading: boolean;
    view: ViewEnum;
    checkoutOffer: PrizeoutOffer | null;
}

export type ViewEnum = 'checkout' | 'checkout-confirmation';

export const checkoutInitialState: CheckoutSlice = {
    checkoutOffer: null,
    isSide: true,
    loading: false,
    view: 'checkout',
};

export const checkoutSlice = createSlice({
    initialState: checkoutInitialState,
    name: 'checkout',
    reducers: {
        setCheckoutOffer(state, action: PayloadAction<PrizeoutOffer | null>) {
            state.checkoutOffer = action.payload;
        },
        setCheckoutView(state, action: PayloadAction<ViewEnum>) {
            state.view = action.payload;
        },
        toggleIsLoading(state) {
            state.loading = !state.loading;
        },
        toggleIsSide(state) {
            // TODO: Check screen size to determine if it's side or bottom
            state.isSide = !state.isSide;
        },
    },
});

export const { setCheckoutView, setCheckoutOffer, toggleIsLoading, toggleIsSide } = checkoutSlice.actions;

export const selectLoading = ({ checkout: { loading } }: RootState): boolean => loading;

export const selectCheckoutView = ({ checkout: { view } }: RootState): ViewEnum => view;

export const selectCheckoutIsSide = ({ checkout }: RootState): boolean => {
    return checkout.isSide;
};

export const selectCheckoutOffer = ({ checkout: { checkoutOffer } }: RootState): PrizeoutOffer => checkoutOffer;

export default checkoutSlice.reducer;
