import React from 'react';
import { useRouter } from 'next/router';
import { ArrowRight, CheckCircle, Zap, TrendingUp, Users, Mail, Sparkles } from 'lucide-react';

export default function SalesPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [showOptinModal, setShowOptinModal] = React.useState(false);

  const handleGetStarted = () => {
    setShowOptinModal(true);
  };

  const handleOptinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store email in localStorage for now
    localStorage.setItem('userEmail', email);
    setShowOptinModal(false);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="text-blue-400" size={28} />
            DropForge AI
          </div>
          <button 
            onClick={handleGetStarted}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
            <span className="text-blue-300 text-sm font-semibold">🚀 AI-Powered Dropshipping</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6 leading-tight">
            Find Winning Products  

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Automate Your Store
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            DropForge AI uses advanced AI and real-time market data to help you find profitable products, build professional stores, and connect with reliable suppliers. All in one platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleGetStarted}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition text-lg"
            >
              Start Free Trial <ArrowRight size={20} />
            </button>
            <button className="border-2 border-slate-400 hover:border-white text-white px-8 py-4 rounded-lg font-semibold transition text-lg">
              Watch Demo
            </button>
          </div>
          <p className="text-slate-400 mt-6">No credit card required. 14-day free trial.</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">Powerful Features</h2>
          <p className="text-center text-slate-400 mb-16 text-lg">Everything you need to succeed in dropshipping</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-700/30 p-8 rounded-xl border border-slate-600 hover:border-blue-500 transition hover:bg-slate-700/50">
              <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="text-blue-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Product Research</h3>
              <p className="text-slate-300 leading-relaxed">
                Discover winning products with AI-powered analysis. Real-time market data, competitor analysis, and traffic light validation system.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-700/30 p-8 rounded-xl border border-slate-600 hover:border-blue-500 transition hover:bg-slate-700/50">
              <div className="bg-yellow-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-yellow-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Store Builder</h3>
              <p className="text-slate-300 leading-relaxed">
                Create professional dropshipping stores in minutes. No coding required. Fully customizable templates and one-click deployment.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-700/30 p-8 rounded-xl border border-slate-600 hover:border-blue-500 transition hover:bg-slate-700/50">
              <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-green-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Supplier Network</h3>
              <p className="text-slate-300 leading-relaxed">
                Connect with verified AliExpress suppliers. Automated order fulfillment, tracking, and supplier recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Why Choose DropForge AI?</h2>
          
          <div className="space-y-4">
            {[
              'AI-powered product validation with 95% accuracy rate',
              'Real-time market trends and competitor analysis',
              'Automated store creation and optimization',
              'Integrated supplier management system',
              '24/7 customer support and training resources',
              'Lifetime updates and new features included'
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-slate-700/20 rounded-lg border border-slate-600 hover:border-blue-500 transition">
                <CheckCircle className="text-green-400 flex-shrink-0" size={24} />
                <span className="text-lg text-slate-200">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">Simple, Transparent Pricing</h2>
          <p className="text-center text-slate-400 mb-16 text-lg">Choose the plan that fits your needs</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Plan 1 */}
            <div className="bg-slate-700/30 p-8 rounded-xl border border-slate-600 hover:border-blue-500 transition">
              <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
              <p className="text-slate-300 mb-6">Perfect for beginners</p>
              <div className="text-4xl font-bold text-white mb-1">$29</div>
              <p className="text-slate-400 mb-6">/month</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle size={18} className="text-green-400 flex-shrink-0" /> 5 stores
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle size={18} className="text-green-400 flex-shrink-0" /> Product research
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle size={18} className="text-green-400 flex-shrink-0" /> Email support
                </li>
              </ul>
              <button 
                onClick={handleGetStarted}
                className="w-full bg-slate-600 hover:bg-slate-500 text-white py-3 rounded-lg font-semibold transition"
              >
                Get Started
              </button>
            </div>

            {/* Plan 2 - Featured */}
            <div className="bg-gradient-to-b from-blue-600/20 to-blue-600/10 p-8 rounded-xl border-2 border-blue-500 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Professional</h3>
              <p className="text-slate-300 mb-6">For growing businesses</p>
              <div className="text-4xl font-bold text-white mb-1">$79</div>
              <p className="text-slate-400 mb-6">/month</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle size={18} className="text-green-400 flex-shrink-0" /> Unlimited stores
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle size={18} className="text-green-400 flex-shrink-0" /> Advanced analytics
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle size={18} className="text-green-400 flex-shrink-0" /> Priority support
                </li>
              </ul>
              <button 
                onClick={handleGetStarted}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Get Started
              </button>
            </div>

            {/* Plan 3 */}
            <div className="bg-slate-700/30 p-8 rounded-xl border border-slate-600 hover:border-blue-500 transition">
              <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
              <p className="text-slate-300 mb-6">For large teams</p>
              <div className="text-4xl font-bold text-white mb-1">Custom</div>
              <p className="text-slate-400 mb-6">Contact us</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle size={18} className="text-green-400 flex-shrink-0" /> Everything in Pro
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle size={18} className="text-green-400 flex-shrink-0" /> Dedicated manager
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle size={18} className="text-green-400 flex-shrink-0" /> Custom integrations
                </li>
              </ul>
              <button className="w-full border-2 border-slate-400 hover:border-white text-white py-3 rounded-lg font-semibold transition">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-blue-700 p-12 rounded-xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Dropshipping Journey?</h2>
          <p className="text-xl text-blue-100 mb-8">Join thousands of successful entrepreneurs using DropForge AI</p>
          <button 
            onClick={handleGetStarted}
            className="bg-white hover:bg-slate-100 text-blue-600 px-8 py-4 rounded-lg font-semibold transition text-lg"
          >
            Start Free Trial Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition">Features</a></li>
              <li><a href="#" className="hover:text-white transition">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition">Security</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition">About</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Follow Us</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-8 text-center text-slate-400">
          <p>&copy; 2025 DropForge AI. All rights reserved.</p>
        </div>
      </footer>

      {/* Optin Modal */}
      {showOptinModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-white mb-2">Join DropForge AI</h3>
            <p className="text-slate-300 mb-6">Start your free 14-day trial today</p>
            <form onSubmit={handleOptinSubmit}>
              <div className="mb-4">
                <label className="block text-white font-semibold mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition mb-3"
              >
                Start Free Trial
              </button>
              <button
                type="button"
                onClick={() => setShowOptinModal(false)}
                className="w-full border border-slate-600 text-slate-300 hover:text-white py-3 rounded-lg font-semibold transition"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
