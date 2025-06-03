'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { supabase, Bug } from '@/lib/supabase';

export default function BugsPage() {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-purple-100 text-purple-800';
      case 'Testing': return 'bg-indigo-100 text-indigo-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBugs = bugs.filter(bug => {
    const matchesSearch = bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (bug.description && bug.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || bug.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || bug.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStats = () => {
    const total = bugs.length;
    const critical = bugs.filter(bug => bug.priority === 'Critical').length;
    const high = bugs.filter(bug => bug.priority === 'High').length;
    const medium = bugs.filter(bug => bug.priority === 'Medium').length;
    const low = bugs.filter(bug => bug.priority === 'Low').length;
    const open = bugs.filter(bug => bug.status === 'Open').length;
    
    return { total, critical, high, medium, low, open };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="text-white text-xl">Loading bugs...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Bug Tracker</h1>
          <p className="text-gray-400 text-lg">
            Monitor and manage project defects
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-gray-400 text-sm">Total</div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
            <div className="text-2xl font-bold text-red-400">{stats.critical}</div>
            <div className="text-gray-400 text-sm">Critical</div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
            <div className="text-2xl font-bold text-orange-400">{stats.high}</div>
            <div className="text-gray-400 text-sm">High</div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
            <div className="text-2xl font-bold text-yellow-400">{stats.medium}</div>
            <div className="text-gray-400 text-sm">Medium</div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
            <div className="text-2xl font-bold text-green-400">{stats.low}</div>
            <div className="text-gray-400 text-sm">Low</div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
            <div className="text-2xl font-bold text-blue-400">{stats.open}</div>
            <div className="text-gray-400 text-sm">Open</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search bugs..."
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-white focus:border-transparent"
              >
                <option value="All">All Status</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Testing">Testing</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-white focus:border-transparent"
              >
                <option value="All">All Priority</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bugs List */}
        <div className="bg-gray-900 rounded-lg border border-gray-800">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold text-white">
              Bugs ({filteredBugs.length})
            </h2>
          </div>
          
          {filteredBugs.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">🐛</div>
              <h3 className="text-xl font-semibold text-white mb-2">No bugs found</h3>
              <p className="text-gray-400 mb-6">
                {bugs.length === 0 
                  ? "No bugs have been reported yet." 
                  : "Try adjusting your search or filter criteria."
                }
              </p>
              <a
                href="/log-bug"
                className="inline-block bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Log First Bug
              </a>
            </div>
          ) : (
            <div className="divide-y divide-gray-800">
              {filteredBugs.map((bug) => (
                <div key={bug.id} className="p-6 hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(bug.priority)}`}>
                        {bug.priority}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(bug.status)}`}>
                        {bug.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">
                      {formatDate(bug.created_at)}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {bug.title}
                  </h3>
                  
                  {bug.description && (
                    <p className="text-gray-300 mb-3 text-sm">
                      {bug.description}
                    </p>
                  )}
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <div>Reporter: {bug.reporter_name}</div>
                    {bug.assignee_name && (
                      <div>Assignee: {bug.assignee_name}</div>
                    )}
                    {bug.tags && bug.tags.length > 0 && (
                      <div className="flex items-center gap-1">
                        <span>Tags:</span>
                        {bug.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="bg-gray-700 px-2 py-0.5 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 