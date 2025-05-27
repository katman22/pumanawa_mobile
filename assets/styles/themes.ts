import { DefaultTheme as NavigationDefaultTheme, Theme } from '@react-navigation/native';

export const createTheme = (base: Theme, overrides: Partial<Theme['colors']>): Theme => ({
    ...base,
    colors: {
        ...base.colors,
        ...overrides,
    },
});

export const DustyTheme = createTheme(NavigationDefaultTheme, {
    primary: '#b77c46',
    background: '#f4ecd8',
    card: '#e0cba8',
    text: '#c2b197',
    border: '#c2b197',
    notification: '#c47c4d',
});

export const OceanTheme = createTheme(NavigationDefaultTheme, {
    background: '#e6f2ff',
    primary: '#007bff',
    text: '#003366',         // Nearly black (less harsh than #000)
    border: '#abbdec',           // Muted olive edge
    notification: '#ada6ed',
    card: '#fdfdf6',
});

export const LightTheme = createTheme(NavigationDefaultTheme, {
    primary: '#000000',          // Text/buttons
    background: '#f3f3ec',       // Warm sand/light olive
    card: '#fdfdf6',             // Soft off-white for cards
    text: '#1a1a1a',             // Nearly black (less harsh than #000)
    border: '#a6a67a',           // Muted olive edge
    notification: '#e06c4b'
});

export const CloudyTheme = createTheme(NavigationDefaultTheme, {
    primary: '#000000',          // Text/buttons
    background: '#f1f2f3',       // Warm sand/light olive
    card: '#fdfdf6',             // Soft off-white for cards
    text: '#997950',             // Nearly black (less harsh than #000)
    border: '#997950',           // Muted olive edge
    notification: '#576587',
});

export const DarkTheme = createTheme(NavigationDefaultTheme, {
    primary: '#d8e4ef',          // Soft blue for buttons and accents
    background: '#121212',       // True black background (good for OLED)
    card: '#1e1e1e',             // Slight elevation for cards
    text: '#e0e0e0',             // Gentle off-white for readability
    border: '#959494',           // Clean subtle dividers
    notification: '#dfdf6a',
});

export const PoppyTheme = createTheme(NavigationDefaultTheme, {
    primary: '#d8e4ef',          // Soft blue for buttons and accents
    background: '#f18b36',       // True black background (good for OLED)
    card: '#ef8282',             // Slight elevation for cards
    text: '#000',             // Gentle off-white for readability
    border: '#959494',           // Clean subtle dividers
    notification: '#dfdf6a',
});

export const ClockTheme = createTheme(NavigationDefaultTheme, {
    primary: '#d8e4ef',          // Soft blue for buttons and accents
    background: '#302323',       // True black background (good for OLED)
    card: '#493f3f',             // Slight elevation for cards
    text: '#000',             // Gentle off-white for readability
    border: '#959494',           // Clean subtle dividers
    notification: '#dfdf6a',
});