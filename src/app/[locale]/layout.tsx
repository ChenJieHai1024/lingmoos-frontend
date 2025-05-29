import '@mantine/core/styles.css';
import "./global.css";
import React from 'react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/next';
import { theme } from '@/theme';
import RootLayoutInner from '@/src/app/[locale]/component/RootLayoutInner';
import NextTopLoader from 'nextjs-toploader';

export default async function RootLayout(
    props:
        { children: any, params: Promise<{ locale: string }> }
) {
    const params = await props.params;

    const {
        locale
    } = params;

    const {
        children
    } = props;

    const messages = await getMessages();

    return (
        <html lang={locale}>
            <head>
                <ColorSchemeScript />
                <link rel="shortcut icon" href="/icon/Icon.svg" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
                <title>Lingmo OS</title>
            </head>
            <body>
                <NextTopLoader />
                <NextIntlClientProvider messages={messages}>
                    <MantineProvider theme={theme}>
                        <RootLayoutInner>
                            <Analytics />
                            {children}
                        </RootLayoutInner>
                    </MantineProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
