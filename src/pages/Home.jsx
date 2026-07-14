import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  GraduationCap, Heart, Brain, Compass, Star,
  ArrowRight, CheckCircle, Building2, Sparkles } from
'lucide-react';
import { createPageUrl } from "@/utils";

const features = [
{
  icon: GraduationCap,
  title: 'Academic Analysis',
  description: 'We analyze your KCSE/CBE grades to match you with realistic career paths',
  color: 'bg-blue-100 text-blue-600'
},
{
  icon: Heart,
  title: 'Hobbies & Background',
  description: 'Your interests and background reveal natural talents most apps miss',
  color: 'bg-red-100 text-red-600'
},
{
  icon: Brain,
  title: 'Personality Assessment',
  description: 'Understanding your work style helps find careers you will actually enjoy',
  color: 'bg-purple-100 text-purple-600'
},
{
  icon: Compass,
  title: 'Interest Profiling',
  description: 'We map your interests to real career fields in the Kenyan job market',
  color: 'bg-emerald-100 text-emerald-600'
},
{
  icon: Star,
  title: 'Astrology Insights',
  description: 'A supporting factor (5% weight) for work environment preferences',
  color: 'bg-indigo-100 text-indigo-600'
},
{
  icon: Building2,
  title: 'University Matching',
  description: 'Get matched to specific universities and TVETs based on your grades',
  color: 'bg-amber-100 text-amber-600'
}];


const stats = [
{ value: '12+', label: 'Career Paths' },
{ value: '40+', label: 'Institutions' },
{ value: '100%', label: 'Offline Ready' },
{ value: 'Free', label: 'To Use' }];


export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1e] via-[#0d1526] to-[#0a0f1e]" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#d4a853]/8 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4a853]/10 text-[#d4a853] text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Your Future Starts Today
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Discover Your
                <span className="block text-[#d4a853]">Dream Career</span>
              </h1>
              
              <p className="text-lg text-slate-300 mb-8 max-w-xl">
                A comprehensive offline career finder that analyzes your academics, 
                personality, interests, and hobbies to recommend the best career paths 
                and Kenyan institutions for you.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to={createPageUrl('Assessment')}>
                  <Button className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white h-14 px-8 text-lg rounded-xl shadow-lg shadow-[#1e3a5f]/20">
                    Start Assessment
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to={createPageUrl('Results')}>
                  <Button variant="outline" className="h-14 px-8 text-lg rounded-xl border-2">
                    View Sample Results
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="mt-10 flex flex-wrap gap-6">
                {['Works Offline', 'Free Forever', 'Kenya-Focused'].map((item, idx) =>
                <div key={idx} className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block">

              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Decorative circles */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1e3a5f]/10 to-[#d4a853]/10 animate-pulse" />
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-[#d4a853]/20 to-[#1e3a5f]/10" />
                <div className="absolute inset-16 rounded-full bg-[#0d1526] shadow-2xl border border-[#1e3a5f]/40 flex items-center justify-center">
                  <div className="text-center p-8">
                    <GraduationCap className="w-20 h-20 text-[#d4a853] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white">PathFinder KE</h3>
                    <p className="text-slate-400 text-sm mt-2">Your Career Journey Starts Here</p>
                  </div>
                </div>
                
                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-10 right-10 bg-[#0d1526] border border-[#1e3a5f]/40 rounded-xl shadow-lg p-3 flex items-center gap-2 text-white">

                  <Brain className="w-6 h-6 text-purple-500" />
                  <span className="text-sm font-medium">Personality</span>
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-20 left-0 bg-[#0d1526] border border-[#1e3a5f]/40 rounded-xl shadow-lg p-3 flex items-center gap-2 text-white">

                  <Star className="w-6 h-6 text-amber-500" />
                  <span className="text-sm font-medium">Astrology</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-[#1e3a5f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) =>
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-center">

                <div className="text-3xl md:text-4xl font-bold text-[#d4a853]">{stat.value}</div>
                <div className="text-white/70 text-sm mt-1">{stat.label}</div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#0a0f1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How We Find Your Perfect Career
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Our comprehensive assessment looks at multiple factors to give you 
              personalized, realistic career recommendations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) =>
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}>

                <Card className="h-full border border-[#1e3a5f]/30 bg-[#0d1526] shadow-lg hover:shadow-[#d4a853]/10 hover:shadow-xl hover:border-[#d4a853]/30 transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-[#1e3a5f]/40 border border-[#1e3a5f]/60 flex items-center justify-center mb-4">
                      <feature.icon className="w-7 h-7 text-[#d4a853]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-slate-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Weighting Section */}
      <section className="py-20 bg-[#0d1526]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Smart Weighting System
              </h2>
              <p className="text-slate-400 mb-8">
                We use a balanced approach that prioritizes what matters most. 
                Your academic results have the highest weight, but we also consider 
                your personality, interests, and hobbies for a complete picture.
              </p>
              
              <div className="space-y-4">
                {[
                { label: 'Academic Performance', weight: 40, color: 'bg-blue-500' },
                { label: 'Interest Profile', weight: 25, color: 'bg-emerald-500' },
                { label: 'Personality Fit', weight: 20, color: 'bg-purple-500' },
                { label: 'Hobbies & Background', weight: 10, color: 'bg-amber-500' },
                { label: 'Astrology (Supporting)', weight: 5, color: 'bg-indigo-500' }].
                map((item, idx) =>
                <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-300">{item.label}</span>
                      <span className="font-bold text-[#d4a853]">{item.weight}%</span>
                    </div>
                    <div className="h-3 bg-[#0a0f1e] rounded-full overflow-hidden border border-[#1e3a5f]/30">
                      <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.weight * 2}%` }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className={`h-full ${item.color} rounded-full`} />

                    </div>
                  </div>
                )}
              </div>
            </div>

            <Card className="border border-[#1e3a5f]/30 bg-[#0a0f1e] shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-[#1e3a5f]/20 border border-[#1e3a5f]/40 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-[#d4a853]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Important Note
                  </h3>
                  <p className="text-slate-400 mb-6">
                    Astrology is used only as a supportive insight for work environment 
                    preferences. Academic performance, interests, and skills remain the 
                    primary factors in all our recommendations.
                  </p>
                  <div className="p-4 rounded-xl bg-[#d4a853]/10 border border-[#d4a853]/20">
                    <p className="text-sm text-[#d4a853]">
                      This ensures credibility and acceptance by schools and institutions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0a0f1e]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Discover Your Future?
            </h2>
            <p className="text-slate-400 mb-8 text-lg">
              Take our free, comprehensive career assessment and get personalized 
              recommendations for careers and institutions that match your unique profile.
            </p>
            <Link to={createPageUrl('Assessment')}>
              <Button className="bg-[#d4a853] hover:bg-[#c49843] text-[#1e3a5f] h-16 px-12 text-lg font-bold rounded-xl shadow-lg shadow-[#d4a853]/30">
                Start Your Assessment Now
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </Link>
            <p className="text-sm text-slate-500 mt-4">
              Takes about 10-15 minutes • Works completely offline
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl font-bold text-[#d4a853] mb-4">PathFinder KE — Your Trusted Career Mentor</h3>
          <p className="text-gray-300 max-w-3xl mx-auto mb-6">
            Helping Kenyan students discover their strengths, explore opportunities, and confidently choose their future careers.
          </p>
          <p className="text-gray-400 text-sm max-w-3xl mx-auto mb-6">
            Since 2026, PathFinder KE has supported learners by blending academic performance, talents, interests, and personal abilities with real and practical career pathways within the Kenyan education system.
          </p>
          <p className="text-gray-400 text-sm max-w-3xl mx-auto mb-8">
            Designed with parents and teachers in mind, this platform offers clear, reliable, and inspiring guidance to help students make informed, responsible, and future-focused career decisions.
          </p>
          <div className="border-t border-slate-700 pt-6">
            <p className="text-gray-300 text-sm">
              Developed by: <span className="font-semibold text-[#d4a853]">Isaac Odiwuor</span>
            </p>
            <p className="text-gray-400 text-xs mt-1">*St. Mark Obambo Secondary School Student</p>
            <p className="text-gray-500 text-xs mt-4">© 2026 Isaac Odiwuor. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>);

}
