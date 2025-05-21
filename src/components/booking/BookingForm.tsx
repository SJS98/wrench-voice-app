
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Calendar, Clock } from 'lucide-react';

interface BookingFormProps {
  onSubmit: (data: { address: string; date: string; time: string }) => void;
}

const BookingForm = ({ onSubmit }: BookingFormProps) => {
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address && date && time) {
      onSubmit({ address, date, time });
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="address" className="text-sm font-medium">
          Address
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="date" className="text-sm font-medium">
          Date
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            id="date"
            type="date"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="time" className="text-sm font-medium">
          Time
        </label>
        <div className="relative">
          <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="pb-16">
        <Button type="submit" className="w-full bg-garage-purple hover:bg-garage-purple/90 text-white">
          Schedule Repair
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;
