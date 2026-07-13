import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronRight, Lightbulb, Users, Wrench, X } from 'lucide-react';
import { careerClusters, riasecTypes } from '../data/CareerClusters';

export default function ClusterExplorer({ isOpen, onClose, userRiasec = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [filterByMatch, setFilterByMatch] = useState(false);

  const filteredClusters = careerClusters.filter(cluster => {
    const matchesSearch = cluster.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cluster.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cluster.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (filterByMatch && userRiasec.length > 0) {
      const hasMatch = cluster.riasec.some(type => userRiasec.includes(type));
      return matchesSearch && hasMatch;
    }
    
    return matchesSearch;
  });

  const getMatchLevel = (cluster) => {
    if (userRiasec.length === 0) return 0;
    return cluster.riasec.filter(type => userRiasec.includes(type)).length;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden bg-slate-900 border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-400" />
            Kenya Career Clusters (20)
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search and Filter */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search clusters, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>
            {userRiasec.length > 0 && (
              <Button
                variant={filterByMatch ? "default" : "outline"}
                onClick={() => setFilterByMatch(!filterByMatch)}
                className={filterByMatch ? "bg-emerald-600 hover:bg-emerald-700" : "border-slate-700 text-slate-300"}
              >
                Your Matches
              </Button>
            )}
          </div>

          {/* RIASEC Legend */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(riasecTypes).map(([code, type]) => (
              <Badge 
                key={code} 
                variant="outline" 
                className={`text-xs ${userRiasec.includes(code) ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'border-slate-700 text-slate-400'}`}
              >
                {code}: {type.name}
              </Badge>
            ))}
          </div>

          {/* Cluster Grid */}
          <div className="overflow-y-auto max-h-[55vh] pr-2 space-y-2">
            <AnimatePresence>
              {filteredClusters.map((cluster, idx) => (
                <motion.div
                  key={cluster.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: idx * 0.02 }}
                >
                  <Card 
                    className={`bg-slate-800 border-slate-700 hover:border-slate-600 cursor-pointer transition-all ${
                      selectedCluster?.id === cluster.id ? 'ring-2 ring-emerald-500' : ''
                    }`}
                    onClick={() => setSelectedCluster(selectedCluster?.id === cluster.id ? null : cluster)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className={`w-10 h-10 rounded-lg ${cluster.color} flex items-center justify-center text-xl`}>
                            {cluster.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-white">{cluster.name}</h3>
                              {getMatchLevel(cluster) > 0 && (
                                <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">
                                  {getMatchLevel(cluster)} match{getMatchLevel(cluster) > 1 ? 'es' : ''}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-slate-400 line-clamp-1">{cluster.overview}</p>
                            <div className="flex gap-1 mt-2">
                              {cluster.riasec.map(code => (
                                <Badge 
                                  key={code} 
                                  variant="outline" 
                                  className={`text-xs ${userRiasec.includes(code) ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'border-slate-600 text-slate-400'}`}
                                >
                                  {code}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <ChevronRight className={`w-5 h-5 text-slate-500 transition-transform ${selectedCluster?.id === cluster.id ? 'rotate-90' : ''}`} />
                      </div>

                      {/* Expanded Details */}
                      <AnimatePresence>
                        {selectedCluster?.id === cluster.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 pt-4 border-t border-slate-700 space-y-4">
                              {/* Personalities */}
                              <div>
                                <div className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                                  <Users className="w-4 h-4" />
                                  Matching Personalities
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {cluster.personalities.map(p => (
                                    <Badge key={p} className="bg-purple-500/20 text-purple-300">
                                      {p}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              {/* Skills */}
                              <div>
                                <div className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                                  <Wrench className="w-4 h-4" />
                                  Key Skills
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {cluster.skills.map(skill => (
                                    <Badge key={skill} variant="outline" className="border-slate-600 text-slate-300 text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              {/* Overview */}
                              <p className="text-sm text-slate-400">{cluster.overview}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredClusters.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                <p>No clusters found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
