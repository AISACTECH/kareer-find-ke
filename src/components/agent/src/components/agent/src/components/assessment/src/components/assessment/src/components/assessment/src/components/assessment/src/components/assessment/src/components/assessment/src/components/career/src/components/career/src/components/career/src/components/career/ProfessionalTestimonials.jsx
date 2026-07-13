import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, Quote, ChevronLeft, ChevronRight, 
  User, Briefcase, MapPin, Star, ExternalLink
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Professional testimonials data
const testimonials = {
  software_developer: [
    {
      id: 1,
      name: 'James Mwangi',
      role: 'Senior Software Engineer',
      company: 'Safaricom',
      location: 'Nairobi',
      experience: '8 years',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      quote: "Starting my career in tech was the best decision I ever made. The key is to never stop learning. I started with basic web development and now I lead a team building M-Pesa integrations.",
      advice: "Don't wait to have everything figured out. Start coding today, build projects, and contribute to open source. Your portfolio speaks louder than certificates.",
      videoUrl: null, // Would be real video URL in production
      rating: 5,
      tags: ['Self-taught', 'Leadership', 'Fintech']
    },
    {
      id: 2,
      name: 'Wanjiku Kamau',
      role: 'Data Scientist',
      company: 'Andela',
      location: 'Remote',
      experience: '5 years',
      photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face',
      quote: "As a woman in tech, I want to encourage all girls that this field is for you too. I transitioned from banking to data science and it opened up a whole new world.",
      advice: "Mathematics is your friend! The analytical skills from KCSE math are exactly what you need. Take online courses and practice with real datasets.",
      videoUrl: null,
      rating: 5,
      tags: ['Career Switch', 'Women in Tech', 'Remote Work']
    }
  ],
  doctor: [
    {
      id: 3,
      name: 'Dr. Peter Ochieng',
      role: 'Consultant Surgeon',
      company: 'Kenyatta National Hospital',
      location: 'Nairobi',
      experience: '15 years',
      photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      quote: "Medicine is not just a career, it's a calling. The journey is long and demanding, but saving a life makes every sleepless night worth it.",
      advice: "Prepare for a marathon, not a sprint. Build strong study habits early. Most importantly, develop empathy - technical skills can be taught, but caring for patients comes from the heart.",
      videoUrl: null,
      rating: 5,
      tags: ['Public Health', 'Surgery', 'Teaching']
    }
  ],
  accountant: [
    {
      id: 4,
      name: 'Grace Nyambura',
      role: 'Senior Audit Manager',
      company: 'KPMG Kenya',
      location: 'Nairobi',
      experience: '10 years',
      photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop&crop=face',
      quote: "Accounting opens doors to every industry. I've worked with banks, NGOs, and now consulting. The CPA qualification was challenging but worth every effort.",
      advice: "Start your CPA journey immediately after KCSE if you can. The combination of work experience and professional qualification accelerates your career significantly.",
      videoUrl: null,
      rating: 5,
      tags: ['Big 4', 'CPA', 'Consulting']
    }
  ],
  mechanical_engineer: [
    {
      id: 5,
      name: 'Eng. David Kiplagat',
      role: 'Project Manager',
      company: 'KenGen',
      location: 'Naivasha',
      experience: '12 years',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      quote: "Working on geothermal power plants means I'm directly contributing to Kenya's energy future. Engineering lets you see your work making a real impact.",
      advice: "Don't skip industrial attachments - they're where you learn the real skills. Also, get comfortable with site work; that's where engineers make their mark.",
      videoUrl: null,
      rating: 5,
      tags: ['Energy', 'Renewable', 'Infrastructure']
    }
  ],
  nurse: [
    {
      id: 6,
      name: 'Florence Auma',
      role: 'ICU Nurse',
      company: 'Aga Khan Hospital',
      location: 'Nairobi',
      experience: '7 years',
      photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      quote: "Nursing taught me that strength isn't about not crying, it's about holding a patient's hand through their darkest moments. The appreciation from families is priceless.",
      advice: "Nursing is demanding but incredibly rewarding. Build your emotional resilience and always remember why you started. Specialization opens better opportunities.",
      videoUrl: null,
      rating: 5,
      tags: ['Critical Care', 'Private Hospital', 'Specialization']
    }
  ],
  lawyer: [
    {
      id: 7,
      name: 'Advocate Mary Wangui',
      role: 'Partner',
      company: 'Wangui & Associates',
      location: 'Nairobi',
      experience: '14 years',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
      quote: "Law is about giving voice to those who can't speak for themselves. Starting my own firm after 8 years in employment was scary but fulfilling.",
      advice: "Moot courts and legal aid clinics during law school are invaluable. Build your network early and never stop reading - the law keeps evolving.",
      videoUrl: null,
      rating: 5,
      tags: ['Private Practice', 'Human Rights', 'Entrepreneurship']
    }
  ],
  entrepreneur: [
    {
      id: 8,
      name: 'Kevin Otieno',
      role: 'Founder & CEO',
      company: 'AgriTech Solutions',
      location: 'Kisumu',
      experience: '6 years',
      photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
      quote: "I failed twice before this startup worked. Entrepreneurship isn't about avoiding failure, it's about learning from it. Now we serve 5,000 farmers across Western Kenya.",
      advice: "Start small, validate your idea, and don't quit your job until you have traction. Most overnight successes took years of preparation.",
      videoUrl: null,
      rating: 5,
      tags: ['AgriTech', 'Startup', 'Social Impact']
    }
  ],
  teacher: [
    {
      id: 9,
      name: 'Mr. John Mutiso',
      role: 'Head of Sciences',
      company: 'Alliance High School',
      location: 'Kiambu',
      experience: '18 years',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      quote: "Seeing former students become doctors, engineers, and leaders is the greatest reward. Teaching shapes the future in ways no other profession can.",
      advice: "Teaching requires patience and creativity. The salary may start low, but job security and the impact you make are unmatched. Consider international schools for better pay.",
      videoUrl: null,
      rating: 5,
      tags: ['STEM Education', 'Mentorship', 'National Schools']
    }
  ]
};

export default function ProfessionalTestimonials({ 
  isOpen, 
  onClose, 
  careerId = null 
}) {
  const [selectedCareer, setSelectedCareer] = useState(careerId || 'software_developer');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const careerTestimonials = testimonials[selectedCareer] || [];
  const currentTestimonial = careerTestimonials[currentIndex];

  const careers = Object.keys(testimonials);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % careerTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + careerTestimonials.length) % careerTestimonials.length);
  };

  const handleCareerChange = (career) => {
    setSelectedCareer(career);
    setCurrentIndex(0);
  };

  const careerLabels = {
    software_developer: { label: 'Software Developer', icon: '💻' },
    doctor: { label: 'Doctor', icon: '🩺' },
    accountant: { label: 'Accountant', icon: '📊' },
    mechanical_engineer: { label: 'Engineer', icon: '⚙️' },
    nurse: { label: 'Nurse', icon: '👩‍⚕️' },
    lawyer: { label: 'Lawyer', icon: '⚖️' },
    entrepreneur: { label: 'Entrepreneur', icon: '🚀' },
    teacher: { label: 'Teacher', icon: '📚' }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#1e3a5f]">
            <Quote className="w-5 h-5" />
            Professional Insights & Testimonials
          </DialogTitle>
        </DialogHeader>

        {/* Career Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {careers.map(career => {
            const info = careerLabels[career];
            return (
              <button
                key={career}
                onClick={() => handleCareerChange(career)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCareer === career
                    ? 'bg-[#1e3a5f] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{info.icon}</span>
                <span className="text-sm font-medium">{info.label}</span>
              </button>
            );
          })}
        </div>

        {/* Testimonial Content */}
        <div className="flex-1 overflow-y-auto">
          {currentTestimonial ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    {/* Professional Info */}
                    <div className="flex items-start gap-4 mb-6">
                      <img
                        src={currentTestimonial.photo}
                        alt={currentTestimonial.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-[#d4a853]/30"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-[#1e3a5f]">
                          {currentTestimonial.name}
                        </h3>
                        <p className="text-gray-600 flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {currentTestimonial.role}
                        </p>
                        <p className="text-sm text-gray-500">
                          {currentTestimonial.company}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {currentTestimonial.location}
                          </span>
                          <span>{currentTestimonial.experience} experience</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(currentTestimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-amber-500 fill-current" />
                        ))}
                      </div>
                    </div>

                    {/* Video Placeholder */}
                    {currentTestimonial.videoUrl && (
                      <div className="relative aspect-video bg-gray-900 rounded-xl mb-6 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30"
                          >
                            {isPlaying ? (
                              <Pause className="w-8 h-8 text-white" />
                            ) : (
                              <Play className="w-8 h-8 text-white ml-1" />
                            )}
                          </Button>
                        </div>
                        <img
                          src={currentTestimonial.photo}
                          alt=""
                          className="w-full h-full object-cover opacity-50"
                        />
                      </div>
                    )}

                    {/* Quote */}
                    <div className="relative p-6 bg-gradient-to-br from-[#1e3a5f]/5 to-[#d4a853]/5 rounded-xl mb-6">
                      <Quote className="absolute top-4 left-4 w-8 h-8 text-[#d4a853]/30" />
                      <p className="text-gray-700 italic pl-8 text-lg leading-relaxed">
                        "{currentTestimonial.quote}"
                      </p>
                    </div>

                    {/* Advice */}
                    <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl mb-4">
                      <h4 className="font-semibold text-emerald-800 mb-2">
                        💡 Advice for Aspiring Professionals
                      </h4>
                      <p className="text-emerald-700 text-sm">
                        {currentTestimonial.advice}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {currentTestimonial.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <User className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>No testimonials available for this career yet</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        {careerTestimonials.length > 1 && (
          <div className="flex items-center justify-between pt-4 border-t mt-4">
            <Button variant="outline" onClick={prevTestimonial}>
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <div className="flex gap-1">
              {careerTestimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === currentIndex ? 'bg-[#1e3a5f]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <Button variant="outline" onClick={nextTestimonial}>
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
