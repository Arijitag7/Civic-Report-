import './globals.css'
import Navbar from '../components/Navbar'

export const metadata = {
  title: 'Civic Reporting (Standalone)',
  description: 'Report civic issues and track them (localStorage demo)',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
