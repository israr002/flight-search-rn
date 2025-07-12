import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const searchSchema = z.object({
  from: z.string().min(1, 'From location is required'),
  to: z.string().min(1, 'To location is required'),
  date: z.string().min(1, 'Date is required'),
  passengers: z.string().min(1, 'Number of passengers is required'),
});

type SearchFormData = z.infer<typeof searchSchema>;

export const useFlightSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  });

  const searchFlights = async (data: SearchFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Mock flight search - replace with actual API call
      console.log('Searching flights:', data);
      return [];
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    searchFlights,
    isLoading,
    error,
  };
}; 
