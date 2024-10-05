import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Satellite,
  Sprout,
  MessageSquare,
  BarChart,
  CloudSun,
  Brain,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center absolute top-0 left-0 right-0 z-10">
        <Link className="flex items-center justify-center" href="#">
          <Satellite className="h-6 w-6 mr-2 text-white" />
          <span className="font-bold text-white">CropSmart</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4 text-white"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4 text-white"
            href="#about"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4 text-white"
            href="#contact"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            aria-hidden="true"
          >
            <source src="/farm-video-background.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-1"></div>
          <div className="container px-4 md:px-6 relative z-2">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Revolutionize Your Farming with NASA Data
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                  Harness the power of space technology to optimize your crops,
                  predict yields, and make data-driven decisions.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Signup</TabsTrigger>
                  </TabsList>
                  <TabsContent value="login">
                    <Card>
                      <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>
                          Enter your email and password to access your account.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="space-y-1">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="password">Password</Label>
                          <Input id="password" type="password" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Login</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  <TabsContent value="signup">
                    <Card>
                      <CardHeader>
                        <CardTitle>Sign Up</CardTitle>
                        <CardDescription>
                          Create an account to start optimizing your farm today.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="space-y-1">
                          <Label htmlFor="new-email">Email</Label>
                          <Input
                            id="new-email"
                            type="email"
                            placeholder="m@example.com"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="new-password">Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Sign Up</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Our Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Sprout className="h-8 w-8 mb-2" />
                  <CardTitle>Crop Prediction</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Utilize NASA satellite data to predict crop yields and
                    optimize planting schedules.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <MessageSquare className="h-8 w-8 mb-2" />
                  <CardTitle>AI Chatbot</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Get instant answers to your farming questions with our
                    intelligent AI assistant.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <BarChart className="h-8 w-8 mb-2" />
                  <CardTitle>Data Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Analyze historical and real-time data to make informed
                    decisions about your crops.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CloudSun className="h-8 w-8 mb-2" />
                  <CardTitle>Weather Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Access accurate weather forecasts and climate data tailored
                    to your farm's location.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Brain className="h-8 w-8 mb-2" />
                  <CardTitle>Smart Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Receive personalized recommendations for crop management
                    based on AI-driven insights.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Satellite className="h-8 w-8 mb-2" />
                  <CardTitle>Satellite Imagery</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Monitor your fields with high-resolution satellite imagery
                    for early problem detection.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 CropSmart. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
