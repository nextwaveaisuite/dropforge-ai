import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { FiSearch, FiTrendingUp, FiDollarSign, FiShoppingCart } from 'react-icons/fi';

interface Product {
  id: string;
  title: string;
  price: number;
  reviews: number;
  rating: number;
  trafficLight: string;
  socialProofScore: number;
}

export default function Dashboard() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [stats, setStats] = useState({
    productsResearched: 0,
    storesCreated: 0,
    totalRevenue: 0,
    conversionRate: 0
  });

  useEffect(() => {
    // Load dashboard stats
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      // Simulated stats - replace with real API call
      setStats({
        productsResearched: 127,
        storesCreated: 8,
        totalRevenue: 45230,
        conversionRate: 3.2
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchKeyword.trim()) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/search`,
        {
          params: {
            keyword: searchKeyword,
            page: 1,
            pageSize: 20
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      setProducts(response.data.data || []);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrafficLightColor = (status: string) => {
    switch (status) {
      case 'green':
        return 'bg-green-100 text-green-800';
      case 'amber':
        return 'bg-amber-100 text-amber-800';
      case 'red':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 p-6">
        <h1 className="text-3xl font-bold text-white mb-2">🔥 DropForge AI Dashboard</h1>
        <p className="text-slate-400">The smartest dropshipping platform on the market</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
        <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Products Researched</p>
              <p className="text-3xl font-bold text-white">{stats.productsResearched}</p>
            </div>
            <FiSearch className="text-blue-400 text-4xl" />
          </div>
        </div>

        <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Stores Created</p>
              <p className="text-3xl font-bold text-white">{stats.storesCreated}</p>
            </div>
            <FiShoppingCart className="text-green-400 text-4xl" />
          </div>
        </div>

        <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Revenue</p>
              <p className="text-3xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</p>
            </div>
            <FiDollarSign className="text-yellow-400 text-4xl" />
          </div>
        </div>

        <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Conversion Rate</p>
              <p className="text-3xl font-bold text-white">{stats.conversionRate}%</p>
            </div>
            <FiTrendingUp className="text-purple-400 text-4xl" />
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="p-6">
        <div className="bg-slate-700 rounded-lg p-8 border border-slate-600">
          <h2 className="text-2xl font-bold text-white mb-6">🔍 Product Research</h2>
          
          <form onSubmit={handleSearch} className="flex gap-4">
            <input
              type="text"
              placeholder="Search for products (e.g., yoga mat, phone case)..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg bg-slate-600 text-white placeholder-slate-400 border border-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold disabled:opacity-50 transition"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>
      </div>

      {/* Products Results */}
      {products.length > 0 && (
        <div className="p-6">
          <div className="bg-slate-700 rounded-lg border border-slate-600 overflow-hidden">
            <div className="p-6 border-b border-slate-600">
              <h3 className="text-xl font-bold text-white">
                Found {products.length} Products
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-600 border-b border-slate-500">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-white">Product</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-white">Price</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-white">Reviews</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-white">Rating</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-white">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-white">Proof</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-white">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-slate-600 hover:bg-slate-600 transition">
                      <td className="px-6 py-4 text-white">{product.title.substring(0, 50)}...</td>
                      <td className="px-6 py-4 text-white font-semibold">${product.price}</td>
                      <td className="px-6 py-4 text-slate-300">{product.reviews.toLocaleString()}</td>
                      <td className="px-6 py-4 text-slate-300">{product.rating}/5</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getTrafficLightColor(product.trafficLight)}`}>
                          {product.trafficLight.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white">{product.socialProofScore}%</td>
                      <td className="px-6 py-4">
                        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-semibold transition">
                          Analyze
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && products.length === 0 && searchKeyword && (
        <div className="p-6 text-center">
          <p className="text-slate-400 text-lg">No products found. Try a different search.</p>
        </div>
      )}
    </div>
  );
}
