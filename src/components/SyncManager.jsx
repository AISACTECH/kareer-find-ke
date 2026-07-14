import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wifi, WifiOff, Cloud, CloudOff, Check, AlertCircle, 
  RefreshCw, X, ChevronDown, ChevronUp, Loader2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { base44 } from '@/api/base44Client';

// Sync Context
const SyncContext = createContext(null);

export const useSyncManager = () => {
  const context = useContext(SyncContext);
  if (!context) {
    throw new Error('useSyncManager must be used within SyncProvider');
  }
  return context;
};

// Sync Status Types
const SYNC_STATUS = {
  IDLE: 'idle',
  SYNCING: 'syncing',
  SUCCESS: 'success',
  ERROR: 'error',
  OFFLINE: 'offline',
  CONFLICT: 'conflict'
};

// Local Storage Keys
const STORAGE_KEYS = {
  ASSESSMENT: 'pathfinder_assessment',
  SAVED_INSTITUTIONS: 'pathfinder_saved_institutions',
  SYNC_QUEUE: 'pathfinder_sync_queue',
  LAST_SYNC: 'pathfinder_last_sync',
  SYNC_CONFLICTS: 'pathfinder_sync_conflicts'
};

// Sync Provider Component
export function SyncProvider({ children }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState(SYNC_STATUS.IDLE);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncDetails, setSyncDetails] = useState(null);
  const [pendingChanges, setPendingChanges] = useState(0);
  const [conflicts, setConflicts] = useState([]);
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [showSyncPanel, setShowSyncPanel] = useState(false);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Auto-sync when coming online
      setTimeout(() => performSync(), 1000);
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setSyncStatus(SYNC_STATUS.OFFLINE);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    setIsOnline(navigator.onLine);
    loadSyncState();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load sync state from local storage
  const loadSyncState = () => {
    const queue = JSON.parse(localStorage.getItem(STORAGE_KEYS.SYNC_QUEUE) || '[]');
    setPendingChanges(queue.length);
    
    const storedConflicts = JSON.parse(localStorage.getItem(STORAGE_KEYS.SYNC_CONFLICTS) || '[]');
    setConflicts(storedConflicts);
    
    const lastSync = localStorage.getItem(STORAGE_KEYS.LAST_SYNC);
    if (lastSync) {
      setLastSyncTime(new Date(lastSync));
    }
  };

  // Add item to sync queue
  const addToSyncQueue = useCallback((type, action, data) => {
    const queue = JSON.parse(localStorage.getItem(STORAGE_KEYS.SYNC_QUEUE) || '[]');
    
    // Check for duplicates and update if exists
    const existingIndex = queue.findIndex(
      item => item.type === type && item.data?.id === data?.id
    );
    
    const syncItem = {
      id: `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      action, // 'create', 'update', 'delete'
      data,
      timestamp: new Date().toISOString(),
      retries: 0
    };
    
    if (existingIndex >= 0) {
      queue[existingIndex] = syncItem;
    } else {
      queue.push(syncItem);
    }
    
    localStorage.setItem(STORAGE_KEYS.SYNC_QUEUE, JSON.stringify(queue));
    setPendingChanges(queue.length);
    
    // Auto-sync if online
    if (navigator.onLine) {
      performSync();
    }
  }, []);

  // Perform full sync
  const performSync = useCallback(async () => {
    if (!navigator.onLine) {
      setSyncStatus(SYNC_STATUS.OFFLINE);
      return { success: false, reason: 'offline' };
    }

    if (syncStatus === SYNC_STATUS.SYNCING) {
      return { success: false, reason: 'already_syncing' };
    }

    setSyncStatus(SYNC_STATUS.SYNCING);
    setSyncProgress(0);
    setSyncDetails({ phase: 'Starting sync...' });

    const results = {
      assessments: { synced: 0, failed: 0 },
      institutions: { synced: 0, failed: 0 },
      conflicts: []
    };

    try {
      // Phase 1: Sync Assessment Data (30%)
      setSyncDetails({ phase: 'Syncing assessment data...' });
      await syncAssessmentData(results);
      setSyncProgress(30);

      // Phase 2: Sync Saved Institutions (60%)
      setSyncDetails({ phase: 'Syncing saved institutions...' });
      await syncSavedInstitutions(results);
      setSyncProgress(60);

      // Phase 3: Process Sync Queue (90%)
      setSyncDetails({ phase: 'Processing pending changes...' });
      await processSyncQueue(results);
      setSyncProgress(90);

      // Phase 4: Pull latest from server (100%)
      setSyncDetails({ phase: 'Fetching latest data...' });
      await pullLatestData();
      setSyncProgress(100);

      // Update sync state
      const now = new Date();
      localStorage.setItem(STORAGE_KEYS.LAST_SYNC, now.toISOString());
      setLastSyncTime(now);

      if (results.conflicts.length > 0) {
        setConflicts(results.conflicts);
        localStorage.setItem(STORAGE_KEYS.SYNC_CONFLICTS, JSON.stringify(results.conflicts));
        setSyncStatus(SYNC_STATUS.CONFLICT);
      } else {
        setSyncStatus(SYNC_STATUS.SUCCESS);
        setConflicts([]);
        localStorage.removeItem(STORAGE_KEYS.SYNC_CONFLICTS);
      }

      setSyncDetails({
        phase: 'Sync complete',
        results
      });

      // Reset status after delay
      setTimeout(() => {
        if (syncStatus !== SYNC_STATUS.CONFLICT) {
          setSyncStatus(SYNC_STATUS.IDLE);
        }
      }, 3000);

      return { success: true, results };

    } catch (error) {
      console.error('Sync failed:', error);
      setSyncStatus(SYNC_STATUS.ERROR);
      setSyncDetails({ phase: 'Sync failed', error: error.message });
      
      setTimeout(() => setSyncStatus(SYNC_STATUS.IDLE), 5000);
      
      return { success: false, error: error.message };
    }
  }, [syncStatus]);

  // Sync assessment data
  const syncAssessmentData = async (results) => {
    const localAssessment = JSON.parse(localStorage.getItem(STORAGE_KEYS.ASSESSMENT) || 'null');
    
    if (!localAssessment) return;

    try {
      // Check if assessment exists on server
      const serverAssessments = await base44.entities.Assessment.filter({
        student_name: localAssessment.student_name
      });

      if (serverAssessments && serverAssessments.length > 0) {
        const serverAssessment = serverAssessments[0];
        
        // Compare timestamps for conflict detection
        const localTime = new Date(localAssessment.completed_date || 0);
        const serverTime = new Date(serverAssessment.updated_date || 0);

        if (localTime > serverTime) {
          // Local is newer, update server
          await base44.entities.Assessment.update(serverAssessment.id, localAssessment);
          results.assessments.synced++;
        } else if (serverTime > localTime) {
          // Server is newer, create conflict
          results.conflicts.push({
            type: 'assessment',
            local: localAssessment,
            server: serverAssessment,
            message: 'Assessment data differs between local and server'
          });
        }
        // If same time, data is in sync
      } else {
        // Create new on server
        await base44.entities.Assessment.create(localAssessment);
        results.assessments.synced++;
      }
    } catch (error) {
      console.error('Assessment sync error:', error);
      results.assessments.failed++;
    }
  };

  // Sync saved institutions
  const syncSavedInstitutions = async (results) => {
    const localSaved = JSON.parse(localStorage.getItem(STORAGE_KEYS.SAVED_INSTITUTIONS) || '[]');
    
    if (localSaved.length === 0) return;

    try {
      // Get server data
      const serverSaved = await base44.entities.SavedInstitution.list();
      const serverMap = new Map(serverSaved.map(s => [s.institution_id, s]));
      const localMap = new Map(localSaved.map(s => [s.institution_id, s]));

      // Process local items
      for (const local of localSaved) {
        const server = serverMap.get(local.institution_id);

        if (!server) {
          // New local item, create on server
          try {
            const created = await base44.entities.SavedInstitution.create({
              institution_id: local.institution_id,
              institution_name: local.institution_name,
              program: local.program,
              career: local.career,
              notes: local.notes
            });
            // Update local with server ID
            local.id = created.id;
            results.institutions.synced++;
          } catch (error) {
            results.institutions.failed++;
          }
        } else if (local.notes !== server.notes) {
          // Potential conflict in notes
          const localTime = new Date(local.updated_at || 0);
          const serverTime = new Date(server.updated_date || 0);

          if (localTime > serverTime) {
            // Update server
            await base44.entities.SavedInstitution.update(server.id, {
              notes: local.notes
            });
            results.institutions.synced++;
          } else if (serverTime > localTime && local.notes) {
            // Conflict
            results.conflicts.push({
              type: 'institution',
              institution_id: local.institution_id,
              local: local,
              server: server,
              message: `Notes differ for ${local.institution_name}`
            });
          }
        }
      }

      // Check for server items not in local (added from another device)
      for (const server of serverSaved) {
        if (!localMap.has(server.institution_id)) {
          localSaved.push({
            id: server.id,
            institution_id: server.institution_id,
            institution_name: server.institution_name,
            program: server.program,
            career: server.career,
            notes: server.notes
          });
        }
      }

      // Update local storage
      localStorage.setItem(STORAGE_KEYS.SAVED_INSTITUTIONS, JSON.stringify(localSaved));

    } catch (error) {
      console.error('Institutions sync error:', error);
      results.institutions.failed++;
    }
  };

  // Process sync queue
  const processSyncQueue = async (results) => {
    const queue = JSON.parse(localStorage.getItem(STORAGE_KEYS.SYNC_QUEUE) || '[]');
    const failedItems = [];

    for (const item of queue) {
      try {
        switch (item.type) {
          case 'assessment':
            if (item.action === 'create') {
              await base44.entities.Assessment.create(item.data);
            } else if (item.action === 'update' && item.data.id) {
              await base44.entities.Assessment.update(item.data.id, item.data);
            }
            break;

          case 'saved_institution':
            if (item.action === 'create') {
              await base44.entities.SavedInstitution.create(item.data);
            } else if (item.action === 'update' && item.data.id) {
              await base44.entities.SavedInstitution.update(item.data.id, item.data);
            } else if (item.action === 'delete' && item.data.id) {
              await base44.entities.SavedInstitution.delete(item.data.id);
            }
            break;
        }
      } catch (error) {
        console.error(`Failed to sync item ${item.id}:`, error);
        item.retries++;
        if (item.retries < 3) {
          failedItems.push(item);
        }
      }
    }

    // Update queue with failed items only
    localStorage.setItem(STORAGE_KEYS.SYNC_QUEUE, JSON.stringify(failedItems));
    setPendingChanges(failedItems.length);
  };

  // Pull latest data from server
  const pullLatestData = async () => {
    try {
      // Pull saved institutions
      const serverSaved = await base44.entities.SavedInstitution.list();
      if (serverSaved && serverSaved.length > 0) {
        const localSaved = JSON.parse(localStorage.getItem(STORAGE_KEYS.SAVED_INSTITUTIONS) || '[]');
        const localMap = new Map(localSaved.map(s => [s.institution_id, s]));
        
        // Merge server data
        for (const server of serverSaved) {
          if (!localMap.has(server.institution_id)) {
            localSaved.push({
              id: server.id,
              institution_id: server.institution_id,
              institution_name: server.institution_name,
              program: server.program,
              career: server.career,
              notes: server.notes
            });
          }
        }
        
        localStorage.setItem(STORAGE_KEYS.SAVED_INSTITUTIONS, JSON.stringify(localSaved));
      }
    } catch (error) {
      console.error('Pull latest data error:', error);
    }
  };

  // Resolve conflict
  const resolveConflict = useCallback(async (conflictIndex, resolution) => {
    const conflict = conflicts[conflictIndex];
    if (!conflict) return;

    try {
      if (resolution === 'local') {
        // Use local version
        if (conflict.type === 'assessment') {
          const serverAssessments = await base44.entities.Assessment.filter({
            student_name: conflict.local.student_name
          });
          if (serverAssessments.length > 0) {
            await base44.entities.Assessment.update(serverAssessments[0].id, conflict.local);
          }
        } else if (conflict.type === 'institution') {
          await base44.entities.SavedInstitution.update(conflict.server.id, conflict.local);
        }
      } else if (resolution === 'server') {
        // Use server version
        if (conflict.type === 'assessment') {
          localStorage.setItem(STORAGE_KEYS.ASSESSMENT, JSON.stringify(conflict.server));
        } else if (conflict.type === 'institution') {
          const localSaved = JSON.parse(localStorage.getItem(STORAGE_KEYS.SAVED_INSTITUTIONS) || '[]');
          const index = localSaved.findIndex(s => s.institution_id === conflict.institution_id);
          if (index >= 0) {
            localSaved[index] = conflict.server;
            localStorage.setItem(STORAGE_KEYS.SAVED_INSTITUTIONS, JSON.stringify(localSaved));
          }
        }
      } else if (resolution === 'merge') {
        // Merge both versions (for notes, concatenate)
        if (conflict.type === 'institution') {
          const mergedNotes = `${conflict.server.notes || ''}\n---\n${conflict.local.notes || ''}`.trim();
          await base44.entities.SavedInstitution.update(conflict.server.id, { notes: mergedNotes });
          
          const localSaved = JSON.parse(localStorage.getItem(STORAGE_KEYS.SAVED_INSTITUTIONS) || '[]');
          const index = localSaved.findIndex(s => s.institution_id === conflict.institution_id);
          if (index >= 0) {
            localSaved[index].notes = mergedNotes;
            localStorage.setItem(STORAGE_KEYS.SAVED_INSTITUTIONS, JSON.stringify(localSaved));
          }
        }
      }

      // Remove resolved conflict
      const newConflicts = conflicts.filter((_, i) => i !== conflictIndex);
      setConflicts(newConflicts);
      localStorage.setItem(STORAGE_KEYS.SYNC_CONFLICTS, JSON.stringify(newConflicts));

      if (newConflicts.length === 0) {
        setSyncStatus(SYNC_STATUS.IDLE);
      }

    } catch (error) {
      console.error('Conflict resolution error:', error);
    }
  }, [conflicts]);

  const value = {
    isOnline,
    syncStatus,
    syncProgress,
    syncDetails,
    pendingChanges,
    conflicts,
    lastSyncTime,
    showSyncPanel,
    setShowSyncPanel,
    addToSyncQueue,
    performSync,
    resolveConflict
  };

  return (
    <SyncContext.Provider value={value}>
      {children}
      <SyncStatusIndicator />
      <SyncPanel />
    </SyncContext.Provider>
  );
}

// Sync Status Indicator Component
function SyncStatusIndicator() {
  const { 
    isOnline, 
    syncStatus, 
    pendingChanges, 
    conflicts,
    setShowSyncPanel 
  } = useSyncManager();

  const getStatusConfig = () => {
    if (!isOnline) {
      return {
        icon: WifiOff,
        color: 'bg-gray-500',
        text: 'Offline',
        pulse: false
      };
    }

    switch (syncStatus) {
      case SYNC_STATUS.SYNCING:
        return {
          icon: RefreshCw,
          color: 'bg-blue-500',
          text: 'Syncing...',
          pulse: true,
          spin: true
        };
      case SYNC_STATUS.SUCCESS:
        return {
          icon: Check,
          color: 'bg-emerald-500',
          text: 'Synced',
          pulse: false
        };
      case SYNC_STATUS.ERROR:
        return {
          icon: AlertCircle,
          color: 'bg-red-500',
          text: 'Sync Error',
          pulse: true
        };
      case SYNC_STATUS.CONFLICT:
        return {
          icon: AlertCircle,
          color: 'bg-amber-500',
          text: `${conflicts.length} Conflict${conflicts.length !== 1 ? 's' : ''}`,
          pulse: true
        };
      default:
        if (pendingChanges > 0) {
          return {
            icon: Cloud,
            color: 'bg-amber-500',
            text: `${pendingChanges} Pending`,
            pulse: true
          };
        }
        return {
          icon: isOnline ? Wifi : WifiOff,
          color: 'bg-emerald-500',
          text: 'Online',
          pulse: false
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <motion.button
      onClick={() => setShowSyncPanel(true)}
      className={`fixed bottom-4 right-4 z-40 flex items-center gap-2 px-4 py-2 rounded-full shadow-lg text-white text-sm font-medium ${config.color} print:hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {config.pulse && (
        <span className="absolute inset-0 rounded-full animate-ping opacity-30 bg-current" />
      )}
      <Icon className={`w-4 h-4 ${config.spin ? 'animate-spin' : ''}`} />
      <span>{config.text}</span>
    </motion.button>
  );
}

// Sync Panel Component
function SyncPanel() {
  const {
    isOnline,
    syncStatus,
    syncProgress,
    syncDetails,
    pendingChanges,
    conflicts,
    lastSyncTime,
    showSyncPanel,
    setShowSyncPanel,
    performSync,
    resolveConflict
  } = useSyncManager();

  const [expandedConflict, setExpandedConflict] = useState(null);

  if (!showSyncPanel) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-4 print:hidden"
        onClick={() => setShowSyncPanel(false)}
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isOnline ? 'bg-emerald-100' : 'bg-gray-100'
              }`}>
                {isOnline ? (
                  <Wifi className="w-5 h-5 text-emerald-600" />
                ) : (
                  <WifiOff className="w-5 h-5 text-gray-500" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-[#1e3a5f]">Sync Status</h3>
                <p className="text-xs text-gray-500">
                  {isOnline ? 'Connected' : 'Working offline'}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSyncPanel(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4 overflow-y-auto max-h-[60vh]">
            {/* Sync Progress */}
            {syncStatus === SYNC_STATUS.SYNCING && (
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">
                    {syncDetails?.phase || 'Syncing...'}
                  </span>
                </div>
                <Progress value={syncProgress} className="h-2" />
                <p className="text-xs text-blue-600 mt-1">{syncProgress}% complete</p>
              </div>
            )}

            {/* Last Sync */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
              <span className="text-sm text-gray-600">Last synced</span>
              <span className="text-sm font-medium text-[#1e3a5f]">
                {lastSyncTime 
                  ? new Date(lastSyncTime).toLocaleString() 
                  : 'Never'}
              </span>
            </div>

            {/* Pending Changes */}
            {pendingChanges > 0 && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-100">
                <div className="flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-amber-600" />
                  <span className="text-sm text-amber-700">Pending changes</span>
                </div>
                <Badge className="bg-amber-500">{pendingChanges}</Badge>
              </div>
            )}

            {/* Conflicts */}
            {conflicts.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-[#1e3a5f] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  Sync Conflicts
                </h4>
                {conflicts.map((conflict, index) => (
                  <div 
                    key={index}
                    className="border rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedConflict(expandedConflict === index ? null : index)}
                      className="w-full p-3 flex items-center justify-between hover:bg-gray-50"
                    >
                      <div className="text-left">
                        <p className="text-sm font-medium text-[#1e3a5f]">
                          {conflict.type === 'assessment' ? 'Assessment Data' : conflict.local?.institution_name}
                        </p>
                        <p className="text-xs text-gray-500">{conflict.message}</p>
                      </div>
                      {expandedConflict === index ? (
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                    
                    {expandedConflict === index && (
                      <div className="p-3 border-t bg-gray-50 space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-2 rounded bg-white border">
                            <p className="font-medium text-gray-500 mb-1">Local Version</p>
                            <p className="text-gray-700 line-clamp-3">
                              {conflict.type === 'institution' 
                                ? conflict.local?.notes || '(No notes)'
                                : 'Local assessment data'}
                            </p>
                          </div>
                          <div className="p-2 rounded bg-white border">
                            <p className="font-medium text-gray-500 mb-1">Server Version</p>
                            <p className="text-gray-700 line-clamp-3">
                              {conflict.type === 'institution'
                                ? conflict.server?.notes || '(No notes)'
                                : 'Server assessment data'}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 text-xs"
                            onClick={() => resolveConflict(index, 'local')}
                          >
                            Keep Local
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 text-xs"
                            onClick={() => resolveConflict(index, 'server')}
                          >
                            Keep Server
                          </Button>
                          {conflict.type === 'institution' && (
                            <Button
                              size="sm"
                              className="flex-1 text-xs bg-[#1e3a5f]"
                              onClick={() => resolveConflict(index, 'merge')}
                            >
                              Merge Both
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Sync Success */}
            {syncStatus === SYNC_STATUS.SUCCESS && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-center">
                <Check className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="font-medium text-emerald-700">All data synced!</p>
                {syncDetails?.results && (
                  <p className="text-xs text-emerald-600 mt-1">
                    {syncDetails.results.assessments?.synced || 0} assessments, {' '}
                    {syncDetails.results.institutions?.synced || 0} institutions
                  </p>
                )}
              </div>
            )}

            {/* Sync Error */}
            {syncStatus === SYNC_STATUS.ERROR && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-center">
                <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="font-medium text-red-700">Sync failed</p>
                <p className="text-xs text-red-600 mt-1">
                  {syncDetails?.error || 'Please try again'}
                </p>
              </div>
            )}

            {/* Offline Mode Info */}
            {!isOnline && (
              <div className="p-4 rounded-xl bg-gray-100 border border-gray-200">
                <div className="flex items-start gap-3">
                  <CloudOff className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700">Working Offline</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Your changes are saved locally and will sync automatically when you reconnect.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-gray-50">
            <Button
              onClick={() => performSync()}
              disabled={!isOnline || syncStatus === SYNC_STATUS.SYNCING}
              className="w-full bg-[#1e3a5f] hover:bg-[#2d4a6f]"
            >
              {syncStatus === SYNC_STATUS.SYNCING ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Sync Now
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default SyncProvider;
