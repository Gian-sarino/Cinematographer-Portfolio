import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors());
app.use('*', logger(console.log));

// Health check
app.get('/make-server-fdd00602/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Submit a new booking
app.post('/make-server-fdd00602/bookings', async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, phone, projectType, budget, message, date } = body;

    // Validate required fields
    if (!name || !email || !message || !date) {
      return c.json({ 
        error: 'Missing required fields: name, email, message, and date are required' 
      }, 400);
    }

    // Create booking object
    const bookingId = `booking:${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const booking = {
      id: bookingId,
      name,
      email,
      phone: phone || '',
      projectType: projectType || '',
      budget: budget || '',
      message,
      date,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    // Store in KV
    await kv.set(bookingId, booking);

    console.log(`New booking created: ${bookingId} for ${name} (${email})`);

    return c.json({ 
      success: true, 
      bookingId,
      message: 'Booking submitted successfully' 
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return c.json({ 
      error: 'Failed to create booking',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Get all bookings (for admin dashboard)
app.get('/make-server-fdd00602/bookings', async (c) => {
  try {
    // Get all bookings with the prefix "booking:"
    const bookings = await kv.getByPrefix('booking:');
    
    // Sort by createdAt (most recent first)
    bookings.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return c.json({ 
      success: true, 
      bookings,
      count: bookings.length 
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return c.json({ 
      error: 'Failed to fetch bookings',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Get a specific booking by ID
app.get('/make-server-fdd00602/bookings/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const booking = await kv.get(id);

    if (!booking) {
      return c.json({ error: 'Booking not found' }, 404);
    }

    return c.json({ success: true, booking });
  } catch (error) {
    console.error('Error fetching booking:', error);
    return c.json({ 
      error: 'Failed to fetch booking',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Update booking status
app.patch('/make-server-fdd00602/bookings/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const { status } = await c.req.json();

    const booking = await kv.get(id);
    if (!booking) {
      return c.json({ error: 'Booking not found' }, 404);
    }

    // Update the booking
    const updatedBooking = {
      ...booking,
      status,
      updatedAt: new Date().toISOString()
    };

    await kv.set(id, updatedBooking);

    console.log(`Booking ${id} status updated to: ${status}`);

    return c.json({ 
      success: true, 
      booking: updatedBooking,
      message: 'Booking updated successfully' 
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    return c.json({ 
      error: 'Failed to update booking',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Delete a booking
app.delete('/make-server-fdd00602/bookings/:id', async (c) => {
  try {
    const id = c.req.param('id');
    
    const booking = await kv.get(id);
    if (!booking) {
      return c.json({ error: 'Booking not found' }, 404);
    }

    await kv.del(id);

    console.log(`Booking ${id} deleted`);

    return c.json({ 
      success: true, 
      message: 'Booking deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return c.json({ 
      error: 'Failed to delete booking',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

Deno.serve(app.fetch);
