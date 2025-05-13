import { browser, building } from '$app/environment';

export enum PlatformEnv {
    Production = 'production',
    Staging = 'staging',
    Development = 'development',
    Preview = 'preview',
    Local = 'local',
    Build = 'build'
}
export let platformEnv: PlatformEnv;
console.log('is building', building);
console.log('is browser', browser);

if (building) {
    platformEnv = PlatformEnv.Build;
} else if (browser && window.IS_STORYBOOK) {
    platformEnv = PlatformEnv.Local;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
} else if (!browser && process?.env?.TEST) {
    platformEnv = PlatformEnv.Local;
} else if (browser) {
    if (window.location.hostname === 'platform.acme.com') {
        platformEnv = PlatformEnv.Production;
    } else if (window.location.hostname === 'platform.staging.acme.com') {
        platformEnv = PlatformEnv.Staging;
    } else if (window.location.hostname === 'platform.acme-dev.com') {
        platformEnv = PlatformEnv.Development;
    } else if (window.location.hostname.endsWith('.acme-dev.com')) {
        platformEnv = PlatformEnv.Preview;
    } else if (
        window.location.hostname === 'localhost' ||
        window.location.hostname === 'platform.test'
    ) {
        platformEnv = PlatformEnv.Local;
    } else {
        throw new Error(`Unable to detect environment based on URL: ${window.location.hostname}`);
    }
} else {
    const { env } = await import('$env/dynamic/public');
    switch (env.PUBLIC_PLATFORM_ENV as PlatformEnv) {
        case PlatformEnv.Production: {
            platformEnv = PlatformEnv.Production;
            break;
        }
        case PlatformEnv.Staging: {
            platformEnv = PlatformEnv.Staging;
            break;
        }
        case PlatformEnv.Development: {
            platformEnv = PlatformEnv.Development;
            break;
        }
        case PlatformEnv.Preview: {
            platformEnv = PlatformEnv.Preview;
            break;
        }
        case PlatformEnv.Local: {
            platformEnv = PlatformEnv.Local;
            break;
        }
        default: {
            throw new Error(`Invalid PUBLIC_PLATFORM_ENV: ${env.PUBLIC_PLATFORM_ENV}`);
        }
    }
}

export const isProduction = () => platformEnv === PlatformEnv.Production;
export const isStaging = () => platformEnv === PlatformEnv.Staging;
export const isDevelopment = () => platformEnv === PlatformEnv.Development;
export const isPreview = () => platformEnv === PlatformEnv.Preview;
export const isLocal = () => platformEnv === PlatformEnv.Local;
export const isBuild = () => platformEnv === PlatformEnv.Build;
