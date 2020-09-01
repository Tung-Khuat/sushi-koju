import React, { useState, Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { themes, ThemeContext } from './theme/theme-context';
import CartButton from './components/buttons/cart-button';

const LandingSection = React.lazy(() => 
    import('./section-views/landing'),
);
const SushiPresetIndex = React.lazy(() => 
    import('./components/sushi_preset_list/sushi-preset-index'),
);

export default function RootRoute() {
    const [themeValue, setCurrentTheme] = useState({
        theme: themes.colorTheme1,
        switchTheme: (newTheme) => switchTheme(newTheme),
    });
    function switchTheme(newTheme) {
        setCurrentTheme((state)=>({
            ...state,
            theme: newTheme
        }));
    };

    return(
        <ThemeContext.Provider value={themeValue}>
            <ThemeProvider theme={themeValue.theme}>
                <Suspense fallback={<div>Loading...</div>}>
                    <LandingSection />
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                    <SushiPresetIndex />
                    <CartButton />
                </Suspense>
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}
