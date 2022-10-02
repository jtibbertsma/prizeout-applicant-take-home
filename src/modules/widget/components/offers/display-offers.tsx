import React from 'react';
import { uuid } from 'uuidv4';
import { useAppSelector } from '../../../../hooks';
import { selectCheckoutOffer, setCheckoutOffer } from '../../../../slices/checkout-slice';
import { PrizeoutOffer, PrizeoutOfferViews, selectOffers } from '../../../../slices/offers-slice';
import VerticalOffers from './vertical-offers/vertical-offers';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store';

const DisplayOffers: React.FC = (): React.ReactElement => {
    const offers = useAppSelector(selectOffers);
    const checkoutOffer = useAppSelector(selectCheckoutOffer);
    const activeOfferId = checkoutOffer && checkoutOffer.giftcard_list[0].checkout_value_id;
    const dispatch = useDispatch<AppDispatch>();

    const setOffer = (offer: PrizeoutOffer) => {
        dispatch(setCheckoutOffer(offer));
    };

    const offerFactory = ({ data, settings, type }: PrizeoutOfferViews) => {
        switch (type) {
            case 'vertical-offers':
                return (
                    <VerticalOffers
                        offers={data}
                        viewSettings={settings}
                        activeOfferId={activeOfferId}
                        setCheckoutOffer={setOffer}
                    />
                );
            default:
                return (
                    <VerticalOffers
                        offers={data}
                        viewSettings={settings}
                        activeOfferId={activeOfferId}
                        setCheckoutOffer={setOffer}
                    />
                );
        }
    };

    return <div>{offers && offers.map((offer) => <div key={uuid()}>{offerFactory(offer)}</div>)}</div>;
};

export default DisplayOffers;
