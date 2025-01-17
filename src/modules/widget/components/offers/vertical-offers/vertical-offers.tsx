import React from 'react';
import Classnames from 'classnames';
import { PrizeoutOffer, PrizeoutOfferSettings } from '../../../../../slices/offers-slice';
import { OfferGiftCard } from '../offer-gift-card/offer-gift-card';

import './vertical-offers.less';

interface OfferView {
    offers: PrizeoutOffer[];
    viewSettings?: PrizeoutOfferSettings;
    activeOfferId?: string;
    setCheckoutOffer: (checkoutOffer: PrizeoutOffer) => void;
}

const VerticalOffers: React.FC<OfferView> = ({
    offers,
    viewSettings,
    activeOfferId,
    setCheckoutOffer,
}): React.ReactElement => {
    const heading = viewSettings.title || 'Recommended';
    const subtitle = viewSettings.subtitle || null;
    const classes: string = Classnames('vertical-offers', { '--has-subtitle': subtitle });

    const offerClickHandler = (offer: PrizeoutOffer) => {
        const checkoutOffer = offer.giftcard_list[0].checkout_value_id === activeOfferId ? null : offer;
        setCheckoutOffer(checkoutOffer);
    };

    const returnOffers = () => {
        return offers.map((offer) => (
            <OfferGiftCard
                key={`${heading}-${offer.name}`}
                offer={offer}
                activeOfferId={activeOfferId}
                onClickHandler={() => offerClickHandler(offer)}
            />
        ));
    };

    return (
        <div className={classes}>
            <h2>{heading}</h2>
            {subtitle && <h3>{subtitle}</h3>}
            {offers && <div className="vertical-offers__gift-cards">{returnOffers()}</div>}
        </div>
    );
};

export default VerticalOffers;
