import React, { useState } from 'react';
import axios from 'axios';
import { FiBarChart2, FiTrendingUp, FiDollarSign, FiShield } from 'react-icons/fi';

interface AnalysisResult {
  product: any;
  socialProof: any;
  socialProofScore: number;
  timingScore: string;
  profitAnalysis: any;
  recommendation: string;
  isCurrentlySelling: boolean;
}

export default function AnalyzePage() {
  const [productId, setProductId] = useState('');
  const [keyword, setKeyword] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId || !keyword) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}/analyze`,
        { keyword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      setAnalysis(response.data.data);
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-400';
    if (score >= 50) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">📊 Product Analysis</h1>
          <p className="text-slate-400">Deep dive into product viability with social proof</p>
        </div>

        {/* Input Form */}
        <div className="bg-slate-700 rounded-lg p-8 border border-slate-600 mb-8">
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Product ID (e.g., 1234567890)"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="px-4 py-3 rounded-lg bg-slate-600 text-white placeholder-slate-400 border border-slate-500 focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Product Keyword (e.g., yoga mat)"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="px-4 py-3 rounded-lg bg-slate-600 text-white placeholder-slate-400 border border-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold disabled:opacity-50 transition"
            >
              {loading ? 'Analyzing...' : 'Analyze Product'}
            </button>
          </form>
        </div>

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-6">
            {/* Social Proof Score */}
            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
              <div className="flex items-center gap-4 mb-6">
                <FiShield className="text-4xl text-blue-400" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Social Proof Score</h2>
                  <p className="text-slate-400">How many people are currently buying this</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-600 rounded p-4">
                  <p className="text-slate-400 text-sm mb-2">Overall Score</p>
                  <p className={`text-3xl font-bold ${getScoreColor(analysis.socialProofScore)}`}>
                    {analysis.socialProofScore}%
                  </p>
                </div>

                <div className="bg-slate-600 rounded p-4">
                  <p className="text-slate-400 text-sm mb-2">Facebook Ads</p>
                  <p className="text-white text-lg">
                    {analysis.socialProof.facebook?.isBeingAdvertised ? '✅ Active' : '❌ None'}
                  </p>
                </div>

                <div className="bg-slate-600 rounded p-4">
                  <p className="text-slate-400 text-sm mb-2">TikTok Trending</p>
                  <p className="text-white text-lg">
                    {analysis.socialProof.tiktok?.isTrending ? '✅ Yes' : '❌ No'}
                  </p>
                </div>

                <div className="bg-slate-600 rounded p-4">
                  <p className="text-slate-400 text-sm mb-2">Amazon Best Seller</p>
                  <p className="text-white text-lg">
                    {analysis.socialProof.amazon?.isAmazonBestSeller ? '✅ Yes' : '❌ No'}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-slate-300">{analysis.recommendation}</p>
            </div>

            {/* Timing Score */}
            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
              <div className="flex items-center gap-4 mb-4">
                <FiTrendingUp className="text-4xl text-purple-400" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Timing Score</h2>
                  <p className="text-slate-400">Is this product rising, flat, or declining?</p>
                </div>
              </div>

              <div className="bg-slate-600 rounded p-4">
                <p className="text-slate-300 text-lg">{analysis.timingScore}</p>
              </div>
            </div>

            {/* Profit Analysis */}
            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
              <div className="flex items-center gap-4 mb-6">
                <FiDollarSign className="text-4xl text-green-400" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Profit Analysis</h2>
                  <p className="text-slate-400">Expected margins and ROI</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-600 rounded p-4">
                  <p className="text-slate-400 text-sm mb-2">Buy Price</p>
                  <p className="text-2xl font-bold text-white">
                    ${analysis.profitAnalysis?.buyPrice || 'N/A'}
                  </p>
                </div>

                <div className="bg-slate-600 rounded p-4">
                  <p className="text-slate-400 text-sm mb-2">Sell Price</p>
                  <p className="text-2xl font-bold text-green-400">
                    ${analysis.profitAnalysis?.sellPrice || 'N/A'}
                  </p>
                </div>

                <div className="bg-slate-600 rounded p-4">
                  <p className="text-slate-400 text-sm mb-2">Profit Margin</p>
                  <p className="text-2xl font-bold text-blue-400">
                    {analysis.profitAnalysis?.margin || 'N/A'}%
                  </p>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
              <div className="flex items-center gap-4 mb-6">
                <FiBarChart2 className="text-4xl text-amber-400" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Product Details</h2>
                  <p className="text-slate-400">Key metrics and specifications</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-600 rounded p-4">
                  <p className="text-slate-400 text-sm mb-1">Title</p>
                  <p className="text-white">{analysis.product?.title}</p>
                </div>

                <div className="bg-slate-600 rounded p-4">
                  <p className="text-slate-400 text-sm mb-1">Reviews</p>
                  <p className="text-white font-semibold">
                    {analysis.product?.reviews?.toLocaleString() || 'N/A'}
                  </p>
                </div>

                <div className="bg-slate-600 rounded p-4">
                  <p className="text-slate-400 text-sm mb-1">Rating</p>
                  <p className="text-white font-semibold">
                    {analysis.product?.rating || 'N/A'} / 5
                  </p>
                </div>

                <div className="bg-slate-600 rounded p-4">
                  <p className="text-slate-400 text-sm mb-1">Currently Selling</p>
                  <p className="text-white font-semibold">
                    {analysis.isCurrentlySelling ? '✅ Yes' : '❌ No'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !analysis && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">Enter a product ID and keyword to analyze</p>
          </div>
        )}
      </div>
    </div>
  );
}
