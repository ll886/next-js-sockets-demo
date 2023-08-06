export const metadata = {
  title: 'Chat App',
  description: 'Chat app with sockets',
}
 
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
