import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, MapPin, DollarSign, GraduationCap, BookmarkPlus, Bookmark,
  ExternalLink, Globe, Phone, Mail, Filter, X, Building2, ChevronRight
} from 'lucide-react';
import { getAllInstitutions, getInstitution } from '../InstitutionDatabase';

// Extract unique locations and fee ranges
const institutions = getAllInstitutions();
const locations = [...new Set(institutions.map(i => i.location.split(',')[0].trim()))].sort();
const types = [
  { value: 'all', label: 'All Types' },
  { value: 'public', label: 'Public University' },
  { value: 'private', label: 'Private University' },
  { value: 'tvet', label: 'TVET/Polytechnic' }
];
const feeRanges = [
  { value: 'all', label: 'All Fees' },
  { value: 'low', label: 'Under KES 60K/yr' },
  { value: 'medium', label: 'KES 60K - 150K/yr' },
  { value: 'high', label: 'Over KES 150K/yr' }
];

export default function InstitutionFinder({ 
  isOpen, 
  onClose, 
  savedInstitutions = [], 
  onSaveInstitution,
  onViewDetails 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedFeeRange, setSelectedFeeRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const getFeeCategory = (institution) => {
    const feeText = institution.fees?.range || '';
    const match = feeText.match(/(\d+),?(\d*)/);
    if (match) {
      const amount = parseInt(match[1] + (match[2] || ''), 10);
      if (amount < 60000) return 'low';
      if (amount < 150000) return 'medium';
      return 'high';
    }
    return 'medium';
  };

  const filteredInstitutions = useMemo(() => {
    return institutions.filter(inst => {
      const matchesSearch = 
        inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = selectedType === 'all' || inst.type === selectedType;
      const matchesLocation = selectedLocation === 'all' || 
        inst.location.toLowerCase().includes(selectedLocation.toLowerCase());
      const matchesFee = selectedFeeRange === 'all' || getFeeCategory(inst) === selectedFeeRange;
      
      return matchesSearch && matchesType && matchesLocation && matchesFee;
    });
  }, [searchQuery, selectedType, selectedLocation, selectedFeeRange]);

  const isInstitutionSaved = (instId) => {
    return savedInstitutions.some(s => s.institution_id === instId);
  };

  const activeFiltersCount = [selectedType, selectedLocation, selectedFeeRange]
    .filter(v => v !== 'all').length;

  const clearFilters = () => {
    setSelectedType('all');
    setSelectedLocation('all');
    setSelectedFeeRange('all');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden bg-slate-900 border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-[#d4a853]" />
            Institution Finder
            <Badge className="ml-2 bg-slate-800">{filteredInstitutions.length} results</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search and Filter Toggle */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search institutions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>
            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? "bg-[#d4a853] text-slate-900 hover:bg-[#c49843]" : "border-slate-700 text-slate-300"}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge className="ml-2 bg-emerald-500 text-white text-xs">{activeFiltersCount}</Badge>
              )}
            </Button>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 bg-slate-800 rounded-xl space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Type Filter */}
                    <div>
                      <label className="text-xs text-slate-400 mb-1 block">Institution Type</label>
                      <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          {types.map(t => (
                            <SelectItem key={t.value} value={t.value} className="text-white hover:bg-slate-700">
                              {t.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Location Filter */}
                    <div>
                      <label className="text-xs text-slate-400 mb-1 block">Location</label>
                      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700 max-h-48">
                          <SelectItem value="all" className="text-white hover:bg-slate-700">All Locations</SelectItem>
                          {locations.map(loc => (
                            <SelectItem key={loc} value={loc} className="text-white hover:bg-slate-700">
                              {loc}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Fee Range Filter */}
                    <div>
                      <label className="text-xs text-slate-400 mb-1 block">Fee Range</label>
                      <Select value={selectedFeeRange} onValueChange={setSelectedFeeRange}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          {feeRanges.map(f => (
                            <SelectItem key={f.value} value={f.value} className="text-white hover:bg-slate-700">
                              {f.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {activeFiltersCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Clear all filters
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Grid */}
          <div className="overflow-y-auto max-h-[55vh] pr-2 space-y-3">
            {filteredInstitutions.map((inst, idx) => {
              const isSaved = isInstitutionSaved(inst.id);
              
              return (
                <motion.div
                  key={inst.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.02 }}
                >
                  <Card className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {/* Logo */}
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                          inst.type === 'public' ? 'bg-blue-500/20' :
                          inst.type === 'private' ? 'bg-purple-500/20' : 'bg-green-500/20'
                        }`}>
                          {inst.logo}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-semibold text-white">{inst.name}</h3>
                              <p className="text-sm text-slate-400">{inst.shortName}</p>
                            </div>
                            <Badge className={
                              inst.type === 'public' ? 'bg-blue-500/20 text-blue-300' :
                              inst.type === 'private' ? 'bg-purple-500/20 text-purple-300' : 
                              'bg-green-500/20 text-green-300'
                            }>
                              {inst.type === 'tvet' ? 'TVET' : inst.type}
                            </Badge>
                          </div>

                          {/* Quick Info */}
                          <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-400">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {inst.location.split(',')[0]}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              {inst.fees?.range?.split(' ')[0]} {inst.fees?.range?.split(' ')[1]}
                            </span>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-wrap gap-2 mt-3">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 text-xs border-slate-600 text-slate-300 hover:bg-slate-700"
                              onClick={() => onViewDetails && onViewDetails(inst.id)}
                            >
                              <ChevronRight className="w-3 h-3 mr-1" />
                              View Details
                            </Button>
                            
                            <a 
                              href={inst.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 text-xs border-slate-600 text-slate-300 hover:bg-slate-700"
                              >
                                <Globe className="w-3 h-3 mr-1" />
                                Website
                              </Button>
                            </a>

                            <a 
                              href={inst.applicationPortal || inst.admissionsUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Button
                                size="sm"
                                className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                              >
                                <ExternalLink className="w-3 h-3 mr-1" />
                                Apply Now
                              </Button>
                            </a>

                            <Button
                              size="sm"
                              variant={isSaved ? "default" : "outline"}
                              className={`h-8 text-xs ${
                                isSaved 
                                  ? 'bg-[#d4a853] hover:bg-[#c49843] text-slate-900' 
                                  : 'border-slate-600 text-slate-300 hover:bg-slate-700'
                              }`}
                              onClick={() => onSaveInstitution(inst.id, inst.name, '', '')}
                            >
                              {isSaved ? (
                                <>
                                  <Bookmark className="w-3 h-3 mr-1 fill-current" />
                                  Saved
                                </>
                              ) : (
                                <>
                                  <BookmarkPlus className="w-3 h-3 mr-1" />
                                  Save
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}

            {filteredInstitutions.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                <Building2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No institutions match your filters.</p>
                <Button
                  variant="link"
                  onClick={clearFilters}
                  className="text-[#d4a853] mt-2"
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
