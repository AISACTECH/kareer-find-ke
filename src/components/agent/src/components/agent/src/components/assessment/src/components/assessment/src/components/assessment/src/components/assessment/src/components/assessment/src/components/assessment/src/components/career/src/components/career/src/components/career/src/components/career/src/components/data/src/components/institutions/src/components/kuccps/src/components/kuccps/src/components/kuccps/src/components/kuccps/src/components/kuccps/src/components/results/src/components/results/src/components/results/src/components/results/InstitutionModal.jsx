import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  ExternalLink, MapPin, Calendar, Phone, Mail, 
  Building2, GraduationCap, Heart, BookmarkPlus, 
  Bookmark, Home, Users, Trophy, Clock, DollarSign,
  CheckCircle, X
} from 'lucide-react';
import { getInstitution } from '../InstitutionDatabase';

export default function InstitutionModal({ 
  isOpen, 
  onClose, 
  institutionId, 
  program,
  isSaved,
  onSave,
  onRemove
}) {
  const [notes, setNotes] = useState('');
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  
  const institution = getInstitution(institutionId);
  
  if (!institution) return null;

  const handleSave = () => {
    onSave(institution, program, notes);
    setShowSaveConfirm(true);
    setTimeout(() => setShowSaveConfirm(false), 2000);
  };

  const typeColors = {
    public: 'bg-blue-100 text-blue-700 border-blue-200',
    private: 'bg-purple-100 text-purple-700 border-purple-200',
    tvet: 'bg-green-100 text-green-700 border-green-200'
  };

  const typeLabels = {
    public: 'Public University',
    private: 'Private University',
    tvet: 'TVET Institution'
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{institution.logo}</div>
              <div>
                <DialogTitle className="text-xl font-bold text-[#1e3a5f]">
                  {institution.name}
                </DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={typeColors[institution.type]}>
                    {typeLabels[institution.type]}
                  </Badge>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {institution.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <p className="text-gray-600 mt-2">{institution.description}</p>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mt-4">
          <a href={institution.website} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="gap-2">
              <ExternalLink className="w-4 h-4" />
              Visit Website
            </Button>
          </a>
          <a href={institution.applicationPortal || institution.admissionsUrl} target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#1e3a5f] hover:bg-[#2d4a6f] gap-2">
              <GraduationCap className="w-4 h-4" />
              Apply Now
            </Button>
          </a>
          {isSaved ? (
            <Button 
              variant="outline" 
              className="gap-2 text-red-600 border-red-200 hover:bg-red-50"
              onClick={() => onRemove(institutionId)}
            >
              <Bookmark className="w-4 h-4 fill-current" />
              Saved
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="gap-2 text-[#d4a853] border-[#d4a853] hover:bg-[#d4a853]/10"
              onClick={handleSave}
            >
              <BookmarkPlus className="w-4 h-4" />
              Save Institution
            </Button>
          )}
        </div>

        {/* Save Confirmation */}
        <AnimatePresence>
          {showSaveConfirm && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg mt-2"
            >
              <CheckCircle className="w-5 h-5" />
              Institution saved to your list!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tabs */}
        <Tabs defaultValue="campus" className="mt-6">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="campus">Campus Life</TabsTrigger>
            <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
            <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="campus" className="mt-4">
            <div className="grid gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Home className="w-5 h-5 text-[#1e3a5f]" />
                    <h4 className="font-semibold text-[#1e3a5f]">Housing & Accommodation</h4>
                  </div>
                  <p className="text-gray-600 text-sm">{institution.campusLife.housing}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-[#1e3a5f]" />
                    <h4 className="font-semibold text-[#1e3a5f]">Clubs & Activities</h4>
                  </div>
                  <p className="text-gray-600 text-sm">{institution.campusLife.clubs}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-5 h-5 text-[#1e3a5f]" />
                    <h4 className="font-semibold text-[#1e3a5f]">Facilities</h4>
                  </div>
                  <p className="text-gray-600 text-sm">{institution.campusLife.facilities}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-[#1e3a5f]" />
                    <h4 className="font-semibold text-[#1e3a5f]">Transport</h4>
                  </div>
                  <p className="text-gray-600 text-sm">{institution.campusLife.transport}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="scholarships" className="mt-4">
            <div className="space-y-3">
              {institution.scholarships.map((scholarship, idx) => (
                <Card key={idx}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-[#d4a853]" />
                          <h4 className="font-semibold text-[#1e3a5f]">{scholarship.name}</h4>
                        </div>
                        <Badge variant="secondary" className="mt-1">{scholarship.type}</Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-emerald-600">{scholarship.coverage}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" />
                          Deadline: {scholarship.deadline}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                <p className="text-sm text-amber-800">
                  <strong>💡 Tip:</strong> Apply for HELB loan as soon as you receive your admission letter. 
                  Also check with your constituency CDF office for additional bursary opportunities.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="deadlines" className="mt-4">
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-5 h-5 text-[#1e3a5f]" />
                    <h4 className="font-semibold text-[#1e3a5f]">Application Deadlines</h4>
                  </div>
                  <div className="space-y-3">
                    {Object.entries(institution.applicationDeadlines).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="font-medium text-[#1e3a5f]">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="w-5 h-5 text-[#1e3a5f]" />
                    <h4 className="font-semibold text-[#1e3a5f]">Fees Structure</h4>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium text-[#1e3a5f]">{institution.fees.range}</p>
                    {institution.fees.selfSponsored && (
                      <p className="text-sm text-gray-500 mt-1">
                        Self-sponsored: {institution.fees.selfSponsored}
                      </p>
                    )}
                    {institution.fees.note && (
                      <p className="text-sm text-amber-600 mt-2">ℹ️ {institution.fees.note}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="mt-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-[#1e3a5f]" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <a href={`tel:${institution.contact.phone}`} className="font-medium text-[#1e3a5f] hover:underline">
                      {institution.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-[#1e3a5f]" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <a href={`mailto:${institution.contact.email}`} className="font-medium text-[#1e3a5f] hover:underline">
                      {institution.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-[#1e3a5f]" />
                  <div>
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="font-medium text-[#1e3a5f]">{institution.contact.address}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-4">
                  <div className="flex gap-2">
                    <a href={institution.website} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button variant="outline" className="w-full gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Official Website
                      </Button>
                    </a>
                    <a href={institution.admissionsUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button variant="outline" className="w-full gap-2">
                        <GraduationCap className="w-4 h-4" />
                        Admissions Info
                      </Button>
                    </a>
                  </div>
                  {institution.applicationPortal && (
                    <a href={institution.applicationPortal} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-[#d4a853] hover:bg-[#c49843] text-[#1e3a5f] gap-2">
                        <GraduationCap className="w-4 h-4" />
                        Application Portal
                      </Button>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Notes Section */}
            <Card className="mt-4">
              <CardContent className="p-4">
                <h4 className="font-semibold text-[#1e3a5f] mb-2">Your Notes</h4>
                <Textarea
                  placeholder="Add personal notes about this institution (e.g., questions to ask, documents needed)..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[100px]"
                />
                <p className="text-xs text-gray-400 mt-2">
                  Notes will be saved when you save this institution
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
