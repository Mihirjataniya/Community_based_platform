import Navbar from "../components/Navbar";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  
    return (
        <html lang="en">
            <body>
                <div className="h-screen w-full bg-gray-900 ">
                    <Navbar />
                    {children}
                </div>
            </body>
        </html>
    );
}
