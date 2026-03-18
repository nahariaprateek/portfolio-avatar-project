import { Inter } from 'next/font/google';
import './globals.css';
import AvatarWidgetEmbed from './components/AvatarWidgetEmbed';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Prateek Naharia | Airbnb-style Portfolio',
  description: 'Data Science and Analytics portfolio in Airbnb-inspired UI.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <AvatarWidgetEmbed />
      </body>
    </html>
  );
}
