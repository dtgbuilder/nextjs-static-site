"use client";

import {
    createContext,
    PropsWithChildren,
    startTransition,
    useCallback,
    useEffect,
    useState,
    // useMemo,
} from "react";

import {MapData, defaultMapData} from "@/component/map/utilities/map-data";

const localStorageCartKey = "dtg.map";

const defaultMap: MapData = defaultMapData;

const readSavedMap = () => {
    if (typeof window === "undefined") {
        return defaultMap;
    }
    const serializedSavedMap = window.localStorage.getItem(localStorageCartKey);
    const savedMap = serializedSavedMap ? JSON.parse(serializedSavedMap) : defaultMap;
    console.log(savedMap);
    return savedMap;
};

const updateSavedMap = (map: MapData) => {
    if (typeof window === "undefined") {
        return;
    }
    window.localStorage.setItem(localStorageCartKey, JSON.stringify(map));
};

export interface MapContextValue {
    mapData?: MapData;
    setMapData: (mapData: MapData) => void;
    // states: string[];
    // updateBillingFrequency: (billingFrequency: SubscriptionPeriod) => void;
    // updateDuration: (duration: SubscriptionPeriod) => void;
    addEntity: (position: string, type: string) => void;
    removeEntity: (position: string) => void;
    // setStates: (states: string[]) => void;
    // getPrice: (state: string) => number;
    // invoiceAmount?: number;
}

export const MapContext = createContext<MapContextValue>({
    setMapData: () => {},
    // states: [],
    // updateBillingFrequency: () => {},
    // updateDuration: () => {},
    addEntity: () => {},
    removeEntity: () => {},
    // setStates: () => {},
    // getPrice: () => 0
});

export function MapContextProvider ({
    children
} : PropsWithChildren) {

    const [ mapData, setMapData ] = useState<MapData>();

    const updateMap = useCallback((mapUpdate: Partial<MapData>) => {
        const nextMap = {
            ...mapData,
            ...mapUpdate
        } as MapData;
        startTransition(async () => {
            updateSavedMap(nextMap);

            // // save map here
            // await saveMap(userId, nextMap);
        });
        setMapData(nextMap);
    }, [ mapData ]);

    useEffect(() => {
        setMapData(readSavedMap());
    }, [ ]);

    // const updateBillingFrequency = useCallback((billingFrequency: SubscriptionPeriod)=> {
    //     updateShoppingCart({
    //         ...shoppingCart,
    //         billingFrequencyMonths: billingFrequency
    //     });
    // }, [ shoppingCart, updateShoppingCart ]);
    //
    // const updateDuration = useCallback((duration: SubscriptionPeriod)=> {
    //     updateShoppingCart({
    //         ...shoppingCart,
    //         durationMonths: duration
    //     });
    // }, [ shoppingCart, updateShoppingCart ]);

    const addEntity = useCallback((position: string, type: string) => {
        if (!mapData?.entities) {
            return;
        }
        const entities = mapData.entities;
        entities[ position ] = { type: type };
        updateMap(mapData);
    }, [ mapData, updateMap ]);

    const removeEntity = useCallback((position: string) => {
        if (!mapData?.entities) {
            return;
        }
        const entities = mapData.entities;
        delete entities[ position ];
        updateMap(mapData);
    }, [ mapData, updateMap ]);

    // const setStates = useCallback((states: string[]) => {
    //     if (!shoppingCart?.items) {
    //         return;
    //     }
    //     const cartItem = shoppingCart.items[ 0 ];
    //     cartItem.states = states;
    //     updateShoppingCart(shoppingCart);
    // }, [ shoppingCart, updateShoppingCart ]);
    //
    // const states = useMemo(() => (!shoppingCart?.items) ? [] : shoppingCart.items.reduce((agg, curr) => agg.concat(...curr.states), [] as string[]), [ shoppingCart ]);
    //
    // const getPrice = useCallback((state: string) => {
    //     if (!shoppingCart?.durationMonths || !shoppingCart?.billingFrequencyMonths) {
    //         return 0;
    //     }
    //     const tier = allStates.find(s => s.code === state)!.tier;
    //     return prices.find(p => p.tier === tier && p.durationMonths === shoppingCart.durationMonths)!.amount;
    // }, [ shoppingCart?.durationMonths, shoppingCart?.billingFrequencyMonths ]);
    //
    // const invoiceAmount = useMemo(() => {
    //     if (!shoppingCart?.durationMonths || !shoppingCart?.billingFrequencyMonths) {
    //         return 0;
    //     }
    //     const subscriptionAmount = states.map(state => getPrice(state))
    //         .reduce((prev: number, curr: number) => prev + curr, 0);
    //     const durationDiscount = subscriptionDurationPercentDiscounts[ shoppingCart.durationMonths ];
    //     const invoiceDiscount = (shoppingCart.durationMonths > 1 && shoppingCart.billingFrequencyMonths > 1) ? singleInvoicePercentDiscount : 0;
    //     return currency(subscriptionAmount) // this is the full amount of the subscription before any discounts
    //         .multiply(1 - durationDiscount) // apply a multi-month discount
    //         .multiply(1 - invoiceDiscount) // apply a single invoice discount
    //         .divide(shoppingCart.billingFrequencyMonths === 1 ? shoppingCart.durationMonths : 1) // divide by the number of months if subscription is invoiced every month
    //         .value;
    // }, [ states, getPrice, shoppingCart?.durationMonths, shoppingCart?.billingFrequencyMonths ]);

    return (
        <MapContext.Provider value={ {
            mapData,
            setMapData,
            addEntity,
            removeEntity
        } }>
            { children }
        </MapContext.Provider>
    );
}