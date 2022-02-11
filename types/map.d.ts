declare module "googlemaps -D"

declare global {
    interface Window {
        google: any;
        initMap: () => void;
    }
}