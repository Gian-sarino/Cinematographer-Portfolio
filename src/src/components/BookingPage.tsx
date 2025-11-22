import { motion } from 'motion/react';
import { useState } from 'react';
import { Calendar } from './ui/calendar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const projectTypes = [
    'Commercial/Brand Film',
    'Documentary',
    'Wedding Cinematography',
    'Event Coverage',
    'Music Video',
    'Corporate Video',
    'Other'
  ];

  const budgetRanges = [
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000 - $100,000',
    '$100,000+'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate) {
      alert('Please select a date for your consultation.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-fdd00602/bookings`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            ...formData,
            date: selectedDate.toISOString()
          })
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        alert('Thank you! Your consultation request has been submitted. Gian will be in touch within 24 hours.');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          budget: '',
          message: ''
        });
        setSelectedDate(new Date());
      } else {
        console.error('Booking submission error:', data);
        alert(`Error: ${data.error || 'Failed to submit booking. Please try again.'}`);
      }
    } catch (error) {
      console.error('Network error submitting booking:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen pt-20 pb-16"
    >
      {/* Header */}
      <motion.section 
        className="relative border-b border-border/30"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {/* Header background */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted/15 via-muted/8 to-transparent" />
        
        <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
          <motion.div 
            className="inline-block px-4 py-2 bg-accent/40 backdrop-blur-sm rounded-full text-sm text-muted-foreground mb-8 border border-border/50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Book a consultation
          </motion.div>
          <h2 className="text-4xl md:text-5xl tracking-[-0.03em] mb-6 text-foreground">
            Let's Create Together
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent mx-auto mb-6" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Schedule a consultation to discuss your project. Every great story begins with a conversation.
          </p>
        </div>
      </motion.section>

      {/* Booking Form */}
      <motion.section 
        className="relative border-b border-border/30"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        {/* Form background */}
        <div className="absolute inset-0 bg-muted/30 backdrop-blur-sm" />
        
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-3xl md:text-4xl tracking-[-0.02em] mb-4 text-foreground">
              Schedule Your Session
            </h3>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your preferred date and tell us about your project vision.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-lg rounded-lg p-8 border border-white/20 space-y-8">
              <div>
                <h4 className="text-xl tracking-[-0.02em] mb-4 text-foreground flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  Choose a Date
                </h4>
                <p className="text-foreground/80 mb-6">
                  Select your preferred consultation date. Available times are 9 AM - 6 PM MST.
                </p>
                {/* Much brighter calendar container for better visibility */}
                <div className="bg-white/80 dark:bg-white/70 border border-gray-300/50 p-8 rounded-lg shadow-lg backdrop-blur-sm">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                    className="w-full mx-auto"
                    classNames={{
                      months: "flex flex-col sm:flex-row gap-2 w-full",
                      month: "flex flex-col gap-4 w-full",
                      caption: "flex justify-center pt-1 relative items-center w-full mb-4",
                      caption_label: "text-gray-900 font-semibold text-lg",
                      nav: "flex items-center gap-1",
                      nav_button: "h-8 w-8 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 hover:text-gray-900 disabled:opacity-50 text-gray-900",
                      nav_button_previous: "absolute left-2",
                      nav_button_next: "absolute right-2",
                      table: "w-full border-collapse",
                      head_row: "flex w-full",
                      head_cell: "text-gray-600 font-medium text-sm uppercase tracking-wider flex-1 py-2 text-center",
                      row: "flex w-full mt-1",
                      cell: "flex-1 p-0 relative text-center text-sm",
                      day: "w-full h-10 mx-auto rounded-md font-normal hover:bg-gray-200 hover:text-gray-900 focus:bg-gray-300 focus:text-gray-900 transition-colors border-0 bg-transparent text-gray-900",
                      day_selected: "bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary/90 font-semibold",
                      day_today: "bg-gray-300 text-gray-900 font-semibold border border-gray-400",
                      day_outside: "text-gray-400 opacity-50",
                      day_disabled: "text-gray-300 opacity-30 cursor-not-allowed hover:bg-transparent"
                    }}
                  />
                </div>
                {selectedDate && (
                  <motion.div 
                    className="mt-6 p-4 bg-primary/20 border border-primary/30 rounded-lg backdrop-blur-sm"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm text-foreground font-medium">
                      Selected: {selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-lg rounded-lg p-8 border border-white/20 space-y-8">
              <div>
                <h4 className="text-xl tracking-[-0.02em] mb-4 text-foreground flex items-center">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                  Project Details
                </h4>
                <p className="text-foreground/80 mb-6">
                  Tell us about your vision and we'll craft a tailored approach for your project.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground font-medium">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      className="bg-white/20 dark:bg-white/10 border-white/30 text-foreground placeholder:text-foreground/60 focus:border-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-medium">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="bg-white/20 dark:bg-white/10 border-white/30 text-foreground placeholder:text-foreground/60 focus:border-white/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground font-medium">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-white/20 dark:bg-white/10 border-white/30 text-foreground placeholder:text-foreground/60 focus:border-white/50"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-foreground font-medium">Project Type</Label>
                    <Select onValueChange={(value) => handleInputChange('projectType', value)}>
                      <SelectTrigger className="bg-white/20 dark:bg-white/10 border-white/30 text-foreground focus:border-white/50">
                        <SelectValue placeholder="Select project type" className="text-foreground/60" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-white/30">
                        {projectTypes.map((type) => (
                          <SelectItem key={type} value={type} className="text-foreground hover:bg-white/20">
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground font-medium">Budget Range</Label>
                    <Select onValueChange={(value) => handleInputChange('budget', value)}>
                      <SelectTrigger className="bg-white/20 dark:bg-white/10 border-white/30 text-foreground focus:border-white/50">
                        <SelectValue placeholder="Select budget range" className="text-foreground/60" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-white/30">
                        {budgetRanges.map((range) => (
                          <SelectItem key={range} value={range} className="text-foreground hover:bg-white/20">
                            {range}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground font-medium">Project Description</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Tell us about your vision, timeline, and any specific requirements..."
                    className="bg-white/20 dark:bg-white/10 border-white/30 text-foreground placeholder:text-foreground/60 focus:border-white/50 min-h-[120px]"
                    required
                  />
                </div>

                <div className="pt-4">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/80 py-3 text-lg font-medium"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Request Consultation'}
                    </Button>
                  </motion.div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Information */}
      <motion.section 
        className="relative"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        {/* Contact background */}
        <div className="absolute inset-0 bg-gradient-to-t from-muted/20 via-muted/15 to-muted/10" />
        
        <div className="relative max-w-4xl mx-auto px-6 py-20">
          <motion.div 
            className="text-center mb-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3 className="text-2xl tracking-[-0.02em] mb-4 text-foreground">Other Ways to Connect</h3>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent mx-auto" />
          </motion.div>
          
          <div className="bg-white/15 dark:bg-white/8 backdrop-blur-lg rounded-lg p-10 border border-white/25">
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="text-center space-y-6">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-foreground">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>hello@giansarino.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-accent" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>Alberta, Canada</span>
                  </div>
                </div>
                <p className="text-sm text-foreground/70 max-w-md mx-auto">
                  Consultations are typically 30-60 minutes and can be conducted in person or virtually. 
                  Response time is usually within 24 hours.
                </p>
              </div>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              {/* Social Media */}
              <div className="text-center space-y-4">
                <h4 className="text-lg font-medium text-foreground">Connect & Follow</h4>
                <div className="flex items-center justify-center space-x-6">
                  <motion.a
                    href="https://instagram.com/Gian.sarino"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Instagram className="w-5 h-5 group-hover:text-primary transition-colors" />
                    <span className="text-sm">@Gian.sarino</span>
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/giansarino"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin className="w-5 h-5 group-hover:text-primary transition-colors" />
                    <span className="text-sm">LinkedIn</span>
                  </motion.a>
                  <motion.a
                    href="https://youtube.com/@giansarino"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Youtube className="w-5 h-5 group-hover:text-primary transition-colors" />
                    <span className="text-sm">YouTube</span>
                  </motion.a>
                </div>
                <p className="text-xs text-foreground/60">
                  Follow for behind-the-scenes content and latest work updates
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}