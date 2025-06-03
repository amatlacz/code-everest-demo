'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { supabase, Bug } from '@/lib/supabase';

export default function DashboardPage() {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBugs();
  }, []);

  const fetchBugs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bugs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching bugs:', error);
      } else {
        setBugs(data || []);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStats = () => {
    const total = bugs.length;
    const critical = bugs.filter(bug => bug.priority === 'Critical').length;
    const high = bugs.filter(bug => bug.priority === 'High').length;
    const medium = bugs.filter(bug => bug.priority === 'Medium').length;
    const low = bugs.filter(bug => bug.priority === 'Low').length;
    
    const open = bugs.filter(bug => bug.status === 'Open').length;
    const inProgress = bugs.filter(bug => bug.status === 'In Progress').length;
    const testing = bugs.filter(bug => bug.status === 'Testing').length;
    const resolved = bugs.filter(bug => bug.status === 'Resolved').length;
    const closed = bugs.filter(bug => bug.status === 'Closed').length;
    
    return { 
      total, 
      critical, 
      high, 
      medium, 
      low, 
      open, 
      inProgress, 
      testing, 
      resolved, 
      closed 
    };
  };

  const getRecentBugs = () => {
    return bugs.slice(0, 5);
  };

  const getBugsByTags = () => {
    const tagCounts: { [key: string]: number } = {};
    
    bugs.forEach(bug => {
      if (bug.tags) {
        bug.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });
    
    return Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stats = getStats();
  const recentBugs = getRecentBugs();
  const topTags = getBugsByTags();

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="text-white text-xl">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Dashboard</h1>
          <p className="text-gray-400 text-lg">
            Analytics and insights for your bug tracking system
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-white">{stats.total}</div>
                <div className="text-gray-400 text-sm">Total Bugs</div>
              </div>
              <div className="text-4xl">🐛</div>
            </div>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-red-400">{stats.critical}</div>
                <div className="text-gray-400 text-sm">Critical Priority</div>
              </div>
              <div className="text-4xl">🚨</div>
            </div>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-blue-400">{stats.open}</div>
                <div className="text-gray-400 text-sm">Open Issues</div>
              </div>
              <div className="text-4xl">📝</div>
            </div>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-green-400">{stats.resolved}</div>
                <div className="text-gray-400 text-sm">Resolved</div>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Priority Distribution */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Priority Distribution</h2>
            <div className="space-y-4">
              {[
                { label: 'Critical', count: stats.critical, color: 'bg-red-500', total: stats.total },
                { label: 'High', count: stats.high, color: 'bg-orange-500', total: stats.total },
                { label: 'Medium', count: stats.medium, color: 'bg-yellow-500', total: stats.total },
                { label: 'Low', count: stats.low, color: 'bg-green-500', total: stats.total }
              ].map((priority) => (
                <div key={priority.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded ${priority.color}`}></div>
                    <span className="text-gray-300">{priority.label}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${priority.color}`}
                        style={{ 
                          width: priority.total > 0 ? `${(priority.count / priority.total) * 100}%` : '0%' 
                        }}
                      ></div>
                    </div>
                    <span className="text-white font-medium w-8 text-right">{priority.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status Distribution */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Status Distribution</h2>
            <div className="space-y-4">
              {[
                { label: 'Open', count: stats.open, color: 'bg-blue-500', total: stats.total },
                { label: 'In Progress', count: stats.inProgress, color: 'bg-purple-500', total: stats.total },
                { label: 'Testing', count: stats.testing, color: 'bg-indigo-500', total: stats.total },
                { label: 'Resolved', count: stats.resolved, color: 'bg-green-500', total: stats.total },
                { label: 'Closed', count: stats.closed, color: 'bg-gray-500', total: stats.total }
              ].map((status) => (
                <div key={status.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded ${status.color}`}></div>
                    <span className="text-gray-300">{status.label}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${status.color}`}
                        style={{ 
                          width: status.total > 0 ? `${(status.count / status.total) * 100}%` : '0%' 
                        }}
                      ></div>
                    </div>
                    <span className="text-white font-medium w-8 text-right">{status.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Bugs */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Recent Bugs</h2>
            {recentBugs.length > 0 ? (
              <div className="space-y-4">
                {recentBugs.map((bug) => (
                  <div key={bug.id} className="flex items-start justify-between p-4 bg-gray-800 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          bug.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                          bug.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                          bug.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {bug.priority}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          bug.status === 'Open' ? 'bg-blue-100 text-blue-800' :
                          bug.status === 'In Progress' ? 'bg-purple-100 text-purple-800' :
                          bug.status === 'Testing' ? 'bg-indigo-100 text-indigo-800' :
                          bug.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {bug.status}
                        </span>
                      </div>
                      <h3 className="text-white font-medium text-sm mb-1">{bug.title}</h3>
                      <p className="text-gray-400 text-xs">By {bug.reporter_name}</p>
                    </div>
                    <div className="text-gray-400 text-xs">
                      {formatDate(bug.created_at)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">📝</div>
                <p className="text-gray-400">No bugs reported yet</p>
              </div>
            )}
          </div>

          {/* Top Tags */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Most Common Tags</h2>
            {topTags.length > 0 ? (
              <div className="space-y-4">
                {topTags.map(([tag, count], index) => (
                  <div key={tag} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                        {index + 1}
                      </div>
                      <span className="text-gray-300">{tag}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-blue-500"
                          style={{ 
                            width: topTags.length > 0 ? `${(count / topTags[0][1]) * 100}%` : '0%' 
                          }}
                        ></div>
                      </div>
                      <span className="text-white font-medium w-6 text-right">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">🏷️</div>
                <p className="text-gray-400">No tags found</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Quick Actions</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/log-bug"
                className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Log New Bug
              </a>
              <a
                href="/bugs"
                className="border border-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                View All Bugs
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 