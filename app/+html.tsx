import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';
import { Platform } from 'react-native';

/**
 * This file is web-only and used to configure the root HTML for every web page during static rendering.
 * The contents of this function only run in Node.js environments and do not have access to the DOM or browser APIs.
 */

// TODO: Попробовать сократить кол-во компонентов и вариантность
// TODO: Исправить импорты во всем проекте, возможно добавлением FSD архитектуры
// TODO: Добавить компонент типографики
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/*
          Disable body scrolling on web. This makes ScrollView components work closer to how they do on native.
          However, body scrolling is often nice to have for mobile web. If you want to enable it, remove this line.
        */}
        <ScrollViewStyleReset />
        <title>Esoft agency</title>
        {/* Add any additional <head> elements that you want globally available on web... */}
      </head>
      <body
        style={{
          fontFamily: Platform.select({
            android: 'Roboto',
            default: 'Roboto',
          }),
        }}
      >
        {children}
      </body>
    </html>
  );
}
