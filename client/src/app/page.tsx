import { LandingNav } from "@/components/landing-nav";
import { Button } from "@/components/ui/button";
import { Sun, LineChart, Leaf } from "lucide-react"; // Icons for feature cards

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <LandingNav />
            <main className="flex-1">
                {/* Phase 1: Main Banner Section */}
                <section className="w-full py-20 md:py-32 lg:py-40 bg-gray-100">
                    <div className="container mx-auto px-4 md:px-6 text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">
                            Empowering Farmers with AI-Powered Insights
                        </h1>
                        <p className="max-w-[700px] mx-auto text-gray-600 md:text-xl mb-8">
                            Your personal crop companion for smarter, more profitable farming. Get real-time advice on weather, market prices, and pest control.
                        </p>
                        <Button size="lg">Get Started</Button>
                    </div>
                </section>

                {/* Phase 1: Feature Cards Section */}
                <section className="w-full py-12 md:py-24">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid gap-8 md:grid-cols-3">
                            {/* Card 1: Weather */}
                            <div className="flex flex-col items-center text-center p-6 border rounded-lg">
                                <Sun className="h-12 w-12 text-yellow-500 mb-4" />
                                <h3 className="text-2xl font-bold mb-2">Weather Alerts</h3>
                                <p className="text-gray-600">
                                    Receive timely weather forecasts to plan your irrigation and spraying schedules perfectly.
                                </p>
                            </div>
                            {/* Card 2: Market Prices */}
                            <div className="flex flex-col items-center text-center p-6 border rounded-lg">
                                <LineChart className="h-12 w-12 text-green-500 mb-4" />
                                <h3 className="text-2xl font-bold mb-2">Market Trends</h3>
                                <p className="text-gray-600">
                                    Track real-time market prices for your crops to make informed selling decisions.
                                </p>
                            </div>
                            {/* Card 3: Pest Advisory */}
                            <div className="flex flex-col items-center text-center p-6 border rounded-lg">
                                <Leaf className="h-12 w-12 text-red-500 mb-4" />
                                <h3 className="text-2xl font-bold mb-2">Pest & Disease Advisory</h3>
                                <p className="text-gray-600">
                                    Get AI-powered advice on identifying and managing common pests and diseases.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* TODO: Add a footer component */}
            <footer className="py-6 border-t">
                <p className="text-center text-gray-500">© 2025 Krishi Mitra. All rights reserved.</p>
            </footer>
        </div>
    );
}