import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import {
  Video,
  Lock,
  Zap,
  Calendar,
  Film,
  Users,
  ArrowRight,
  Check,
  LayoutDashboard,
} from "lucide-react";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-dark-2 text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-dark-2/80 backdrop-blur-lg border-b border-dark-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Image
                src="/icons/logo.svg"
                alt="CallStack"
                width={40}
                height={40}
                priority
              />
              <span className="text-2xl font-bold">CallStack</span>
            </div>

            {/* Conditional Navigation based on auth status */}
            <div className="flex items-center gap-4">
              {/* Show when user is NOT logged in */}
              <SignedOut>
                <Link
                  href="/sign-in"
                  className="text-gray-300 hover:text-white transition-colors px-4 py-2"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-blue-1 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg transition-all"
                >
                  Get Started
                </Link>
              </SignedOut>

              {/* Show when user IS logged in */}
              <SignedIn>
                <Link
                  href="/home"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors px-4 py-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10",
                    },
                  }}
                />
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-block">
            <span className="bg-blue-1/10 text-blue-1 px-4 py-2 rounded-full text-sm font-medium border border-blue-1/20">
              Professional Video Conferencing
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            Video Meetings <br />
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Built for Teams
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Connect instantly with crystal-clear video, powerful collaboration
            tools, and enterprise-grade security. Everything you need for
            productive meetings.
          </p>

          {/* Conditional CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <SignedOut>
              <Link
                href="/sign-up"
                className="group flex items-center gap-2 bg-blue-1 hover:bg-blue-600 text-white font-semibold py-4 px-10 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-1/50 w-full sm:w-auto justify-center"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/sign-in"
                className="flex items-center gap-2 bg-dark-3 hover:bg-dark-4 text-white font-semibold py-4 px-10 rounded-xl border border-dark-4 hover:border-blue-1 transition-all w-full sm:w-auto justify-center"
              >
                Sign In
              </Link>
            </SignedOut>

            <SignedIn>
              <Link
                href="/home"
                className="group flex items-center gap-2 bg-blue-1 hover:bg-blue-600 text-white font-semibold py-4 px-10 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-1/50 w-full sm:w-auto justify-center"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/personal-room"
                className="flex items-center gap-2 bg-dark-3 hover:bg-dark-4 text-white font-semibold py-4 px-10 rounded-xl border border-dark-4 hover:border-blue-1 transition-all w-full sm:w-auto justify-center"
              >
                <Users className="w-5 h-5" />
                My Personal Room
              </Link>
            </SignedIn>
          </div>

          <SignedOut>
            <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-1" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-1" />
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-1" />
                <span>Enterprise-grade security</span>
              </div>
            </div>
          </SignedOut>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-dark-1">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Powerful features designed for modern teams and seamless
              collaboration
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Video className="w-8 h-8" />}
              title="HD Video & Audio"
              description="Crystal-clear video quality with intelligent bandwidth optimization for smooth, lag-free calls"
            />
            <FeatureCard
              icon={<Lock className="w-8 h-8" />}
              title="Enterprise Security"
              description="End-to-end encryption and SOC 2 compliance keep your meetings secure and private"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Instant Connect"
              description="One-click meeting creation and joining. No downloads, no hassle, just connect"
            />
            <FeatureCard
              icon={<Calendar className="w-8 h-8" />}
              title="Smart Scheduling"
              description="Schedule meetings in advance with calendar integration and automated reminders"
            />
            <FeatureCard
              icon={<Film className="w-8 h-8" />}
              title="Cloud Recording"
              description="Record meetings automatically to the cloud and share with your team instantly"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Personal Rooms"
              description="Your own permanent meeting space with a custom branded link for instant access"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-dark-1">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Get Started in Minutes
            </h2>
            <p className="text-xl text-gray-400">
              Simple setup, powerful results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-1/0 via-blue-1/50 to-blue-1/0" />

            <StepCard
              number="01"
              title="Create Account"
              description="Sign up with your email in seconds. Verify your account and you're ready to go."
            />
            <StepCard
              number="02"
              title="Set Up Profile"
              description="Customize your profile and meeting preferences. Add your team members."
            />
            <StepCard
              number="03"
              title="Start Meeting"
              description="Create instant meetings or schedule for later. Invite participants with a simple link."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Ready to Transform Your Meetings?
          </h2>
          <p className="text-xl text-gray-400">
            Join thousands of teams already using CallStack for better
            collaboration
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <SignedOut>
              <Link
                href="/sign-up"
                className="group flex items-center gap-2 bg-blue-1 hover:bg-blue-600 text-white font-semibold py-5 px-12 rounded-xl transition-all transform hover:scale-105 shadow-2xl hover:shadow-blue-1/50 text-lg w-full sm:w-auto justify-center"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/sign-in"
                className="bg-dark-3 hover:bg-dark-4 text-white font-semibold py-5 px-12 rounded-xl border border-dark-4 hover:border-blue-1 transition-all text-lg w-full sm:w-auto text-center"
              >
                Sign In
              </Link>
            </SignedOut>

            <SignedIn>
              <Link
                href="/home"
                className="group flex items-center gap-2 bg-blue-1 hover:bg-blue-600 text-white font-semibold py-5 px-12 rounded-xl transition-all transform hover:scale-105 shadow-2xl hover:shadow-blue-1/50 text-lg w-full sm:w-auto justify-center"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </SignedIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-3 py-12 px-4 bg-dark-1">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/icons/logo.svg"
                alt="CallStack"
                width={32}
                height={32}
              />
              <span className="text-xl font-bold">CallStack</span>
            </div>
            <div className="text-gray-500 text-sm">
              © 2026 CallStack. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="group relative bg-dark-2 p-8 rounded-2xl border border-dark-3 hover:border-blue-1/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-1/10">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-1/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
      <div className="relative space-y-4">
        <div className="w-14 h-14 rounded-xl bg-blue-1/10 flex items-center justify-center text-blue-1 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

// Step Card Component
const StepCard = ({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="relative flex flex-col items-center text-center space-y-4">
      <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-1 to-blue-600 flex items-center justify-center text-2xl font-bold shadow-lg shadow-blue-1/50 z-10">
        {number}
      </div>
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="text-gray-400 leading-relaxed max-w-xs">{description}</p>
    </div>
  );
};

export default Home;
