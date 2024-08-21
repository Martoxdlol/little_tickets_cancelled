import { GeistSans } from 'geist/font/sans'
import '~/styles/globals.css'
import { TRPCReactProvider } from '~/trpc/react'

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
            lang="en"
            className={`${GeistSans.variable}`}
            suppressHydrationWarning
        >
            <head>
                <title>Little Tickets</title>
            </head>
            <body>
                <TRPCReactProvider>{children}</TRPCReactProvider>
            </body>
        </html>
    )
}
