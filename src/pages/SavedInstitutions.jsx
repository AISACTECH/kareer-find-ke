import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Bookmark, ExternalLink, Trash2, ArrowLeft, Search,
  MapPin, GraduationCap, Building2, Calendar, Edit2,
  BookmarkX, Filter, RefreshCw, Wifi, WifiOff, Cloud
} from 'lucide-react';
import { createPageUrl } from "@/utils";
import { base44 } from '@/api/base44Client';
import { getInstitution } from '../components/InstitutionDatabase';
import InstitutionModal from '../components/results/InstitutionModal';
import { useSyncManager } from '../components/SyncManager';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SavedInstitutions() {
  const { isOnline, addToSyncQueue, performSync, pendingChanges } = useSyncManager();
  const [savedInstitutions, setSavedInstitutions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    loadSavedInstitutions();
  }, []);

  const handleManualSync = async () => {
    if (!isOnline) return;
    setIsSyncing(true);
    await performSync();
    await loadSavedInstitutions();
    setIsSyncing(false);
  };

  const loadSavedInstitutions = async () => {
    setIsLoading(true);
    
    // Try local storage first
    const localSaved = localStorage.getItem('pathfinder_saved_institutions');
    if (localSaved) {
      setSavedInstitutions(JSON.parse(localSaved));
    }
    
    // Try to sync with database
    try {
      const dbSaved = await base44.entities.SavedInstitution.list();
      if (dbSaved && dbSaved.length > 0) {
        setSavedInstitutions(dbSaved);
        localStorage.setItem('pathfinder_saved_institutions', JSON.stringify(dbSaved));
      }
    } catch (error) {
      console.log('Offline mode - using local data');
    }
    
    setIsLoading(false);
  };

  const handleRemove = async (institutionId) => {
    const toDelete = savedInstitutions.find(s => s.institution_id === institutionId);
    const updated = savedInstitutions.filter(s => s.institution_id !== institutionId);
    setSavedInstitutions(updated);
    localStorage.setItem('pathfinder_saved_institutions', JSON.stringify(updated));
    
    if (isOnline) {
      try {
        if (toDelete?.id) {
          await base44.entities.SavedInstitution.delete(toDelete.id);
        }
      } catch (error) {
        console.log('Failed to delete from server, adding to sync queue');
        addToSyncQueue('saved_institution', 'delete', toDelete);
      }
    } else {
      // Add to sync queue for later
      addToSyncQueue('saved_institution', 'delete', toDelete);
    }
    
    setDeleteConfirm(null);
  };

  const filteredInstitutions = savedInstitutions.filter(saved => {
    const institution = getInstitution(saved.institution_id);
    if (!institution) return false;
    
    const matchesSearch = 
      institution.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      institution.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      saved.program?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      saved.career?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterType === 'all' || institution.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const typeColors = {
    public: 'bg-blue-100 text-blue-700',
    private: 'bg-purple-100 text-purple-700',
    tvet: 'bg-green-100 text-green-700'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Link to={createPageUrl('Results')}>
              <Button variant="ghost" className="text-[#1e3a5f]">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Results
              </Button>
            </Link>
          </div>
        </div>

        {/* Title */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#d4a853]/20 flex items-center justify-center">
                <Bookmark className="w-6 h-6 text-[#d4a853]" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#1e3a5f]">
                  Saved Institutions
                </h1>
                <div className="flex items-center gap-2 text-gray-500">
                  <span>{savedInstitutions.length} institution{savedInstitutions.length !== 1 ? 's' : ''} saved</span>
                  {!isOnline && (
                    <Badge variant="secondary" className="text-xs gap-1">
                      <WifiOff className="w-3 h-3" />
                      Offline
                    </Badge>
                  )}
                  {pendingChanges > 0 && (
                    <Badge className="bg-amber-500 text-xs gap-1">
                      <Cloud className="w-3 h-3" />
                      {pendingChanges} pending
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleManualSync}
              disabled={!isOnline || isSyncing}
              className="gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Syncing...' : 'Sync'}
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6 border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search institutions, programs, or careers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="public">Public Universities</SelectItem>
                  <SelectItem value="private">Private Universities</SelectItem>
                  <SelectItem value="tvet">TVET Institutions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-[#1e3a5f] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading saved institutions...</p>
          </div>
        ) : savedInstitutions.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <BookmarkX className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">No Saved Institutions Yet</h3>
              <p className="text-gray-500 mb-6">
                Save institutions from your career results to review them later
              </p>
              <Link to={createPageUrl('Results')}>
                <Button className="bg-[#1e3a5f] hover:bg-[#2d4a6f]">
                  View Career Results
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : filteredInstitutions.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">No Results Found</h3>
              <p className="text-gray-500">
                Try adjusting your search or filters
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            <AnimatePresence>
              {filteredInstitutions.map((saved, index) => {
                const institution = getInstitution(saved.institution_id);
                if (!institution) return null;

                return (
                  <motion.div
                    key={saved.institution_id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="border-0 shadow-md hover:shadow-lg transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          {/* Logo */}
                          <div className="text-4xl flex-shrink-0">{institution.logo}</div>
                          
                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="font-bold text-[#1e3a5f] line-clamp-1">
                                  {institution.name}
                                </h3>
                                <div className="flex flex-wrap items-center gap-2 mt-1">
                                  <Badge className={typeColors[institution.type]}>
                                    {institution.type === 'public' ? 'Public' : 
                                     institution.type === 'private' ? 'Private' : 'TVET'}
                                  </Badge>
                                  <span className="text-sm text-gray-500 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {institution.location}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Actions */}
                              <div className="flex gap-2 flex-shrink-0">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                  onClick={() => setDeleteConfirm(saved.institution_id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>

                            {/* Program & Career */}
                            {(saved.program || saved.career) && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {saved.program && (
                                  <span className="text-sm px-2 py-1 bg-gray-100 rounded-lg flex items-center gap-1">
                                    <GraduationCap className="w-3 h-3" />
                                    {saved.program}
                                  </span>
                                )}
                                {saved.career && (
                                  <span className="text-sm px-2 py-1 bg-[#d4a853]/10 text-[#d4a853] rounded-lg">
                                    For: {saved.career}
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Notes */}
                            {saved.notes && (
                              <p className="text-sm text-gray-500 mt-2 line-clamp-2 italic">
                                📝 {saved.notes}
                              </p>
                            )}

                            {/* Quick Actions */}
                            <div className="flex flex-wrap gap-2 mt-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedInstitution(saved)}
                                className="gap-1"
                              >
                                <Building2 className="w-3 h-3" />
                                View Details
                              </Button>
                              <a href={institution.website} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm" className="gap-1">
                                  <ExternalLink className="w-3 h-3" />
                                  Website
                                </Button>
                              </a>
                              <a href={institution.admissionsUrl} target="_blank" rel="noopener noreferrer">
                                <Button size="sm" className="bg-[#1e3a5f] hover:bg-[#2d4a6f] gap-1">
                                  <Calendar className="w-3 h-3" />
                                  Apply
                                </Button>
                              </a>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Tips */}
        {savedInstitutions.length > 0 && (
          <Card className="mt-8 border-0 shadow-md bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] text-white">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-3">💡 Next Steps</h3>
              <ul className="space-y-2 text-white/90">
                <li className="flex items-start gap-2">
                  <span className="text-[#d4a853]">1.</span>
                  Visit each institution's website to get the latest admission requirements
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d4a853]">2.</span>
                  Apply for HELB loan at helb.co.ke as soon as you get admission
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d4a853]">3.</span>
                  Check with your constituency CDF office for additional bursaries
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d4a853]">4.</span>
                  Visit campuses if possible to get a feel for the environment
                </li>
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Institution Modal */}
      {selectedInstitution && (
        <InstitutionModal
          isOpen={!!selectedInstitution}
          onClose={() => setSelectedInstitution(null)}
          institutionId={selectedInstitution.institution_id}
          program={selectedInstitution.program}
          isSaved={true}
          onSave={() => {}}
          onRemove={(id) => {
            handleRemove(id);
            setSelectedInstitution(null);
          }}
        />
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Institution?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the institution from your saved list. You can always save it again later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleRemove(deleteConfirm)}
              className="bg-red-600 hover:bg-red-700"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
