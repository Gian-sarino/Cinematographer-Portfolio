import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, Mail, Phone, DollarSign, Video, RefreshCw, Trash2 } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
  date: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-fdd00602/bookings`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setBookings(data.bookings);
      } else {
        console.error('Failed to fetch bookings:', data);
        setError(data.error || 'Failed to load bookings');
      }
    } catch (err) {
      console.error('Network error fetching bookings:', err);
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-fdd00602/bookings/${bookingId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ status })
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        // Update local state
        setBookings(prevBookings =>
          prevBookings.map(booking =>
            booking.id === bookingId ? { ...booking, status } : booking
          )
        );
      } else {
        console.error('Failed to update booking:', data);
        alert(`Error: ${data.error || 'Failed to update booking'}`);
      }
    } catch (error) {
      console.error('Network error updating booking:', error);
      alert('Network error. Please try again.');
    }
  };

  const deleteBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) {
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-fdd00602/bookings/${bookingId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        // Remove from local state
        setBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingId));
      } else {
        console.error('Failed to delete booking:', data);
        alert(`Error: ${data.error || 'Failed to delete booking'}`);
      }
    } catch (error) {
      console.error('Network error deleting booking:', error);
      alert('Network error. Please try again.');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'completed':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
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
        <div className="absolute inset-0 bg-gradient-to-b from-muted/15 via-muted/8 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center justify-between">
            <div>
              <motion.div
                className="inline-block px-4 py-2 bg-accent/40 backdrop-blur-sm rounded-full text-sm text-muted-foreground mb-6 border border-border/50"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Admin Dashboard
              </motion.div>
              <h2 className="text-4xl tracking-[-0.03em] mb-4 text-foreground">
                Consultation Bookings
              </h2>
              <p className="text-lg text-muted-foreground">
                Manage all consultation requests in one place
              </p>
            </div>
            <Button
              onClick={fetchBookings}
              variant="outline"
              className="gap-2"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Bookings List */}
      <motion.section
        className="relative"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-12">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-muted-foreground">Loading bookings...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-red-400 mb-4">{error}</p>
              <Button onClick={fetchBookings}>Try Again</Button>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-xl text-muted-foreground mb-2">No bookings yet</p>
              <p className="text-sm text-muted-foreground/70">
                Consultation requests will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-2xl text-foreground mb-2">
                            {booking.name}
                          </CardTitle>
                          <CardDescription className="space-y-2">
                            <div className="flex items-center gap-2 text-foreground/80">
                              <Mail className="w-4 h-4" />
                              <a href={`mailto:${booking.email}`} className="hover:text-primary transition-colors">
                                {booking.email}
                              </a>
                            </div>
                            {booking.phone && (
                              <div className="flex items-center gap-2 text-foreground/80">
                                <Phone className="w-4 h-4" />
                                <a href={`tel:${booking.phone}`} className="hover:text-primary transition-colors">
                                  {booking.phone}
                                </a>
                              </div>
                            )}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteBooking(booking.id)}
                            className="hover:bg-red-500/20 hover:text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Booking Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Calendar className="w-4 h-4" />
                            Consultation Date
                          </div>
                          <p className="text-foreground">
                            {new Date(booking.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>

                        {booking.projectType && (
                          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                              <Video className="w-4 h-4" />
                              Project Type
                            </div>
                            <p className="text-foreground">{booking.projectType}</p>
                          </div>
                        )}

                        {booking.budget && (
                          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                              <DollarSign className="w-4 h-4" />
                              Budget Range
                            </div>
                            <p className="text-foreground">{booking.budget}</p>
                          </div>
                        )}
                      </div>

                      {/* Message */}
                      {booking.message && (
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                          <p className="text-sm text-muted-foreground mb-2">Project Description</p>
                          <p className="text-foreground whitespace-pre-wrap">{booking.message}</p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <p className="text-xs text-muted-foreground">
                          Submitted {new Date(booking.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit'
                          })}
                        </p>
                        <div className="flex gap-2">
                          {booking.status === 'pending' && (
                            <Button
                              onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                              size="sm"
                              className="bg-green-500/20 text-green-300 hover:bg-green-500/30"
                            >
                              Confirm
                            </Button>
                          )}
                          {booking.status === 'confirmed' && (
                            <Button
                              onClick={() => updateBookingStatus(booking.id, 'completed')}
                              size="sm"
                              className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
                            >
                              Mark Complete
                            </Button>
                          )}
                          {booking.status !== 'cancelled' && (
                            <Button
                              onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                              size="sm"
                              variant="outline"
                              className="border-red-500/30 text-red-300 hover:bg-red-500/20"
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.section>
    </motion.div>
  );
}
