
import React, { useEffect, useState } from 'react';
import { ShieldCheck, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { disputeService } from '@/services/disputeService';
import { GarageVerificationStatus } from '@/types/disputes';

interface GarageStatusProps {
  garageId: string;
  showReportButton?: boolean;
  bookingId?: string;
  size?: 'sm' | 'md' | 'lg';
}

const GarageStatus = ({ garageId, showReportButton = false, bookingId, size = 'md' }: GarageStatusProps) => {
  const [status, setStatus] = useState<GarageVerificationStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const garageStatus = await disputeService.getGarageStatus(garageId);
        setStatus(garageStatus);
      } catch (error) {
        console.error('Error fetching garage status:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStatus();
  }, [garageId]);

  if (loading) {
    return <div className="h-6"></div>;
  }

  if (!status) {
    return null;
  }

  const getStatusBadge = () => {
    if (status.isSuspended) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertCircle className={`${size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'}`} />
          <span>Suspended</span>
        </Badge>
      );
    }
    
    if (status.isUnderInvestigation) {
      return (
        <Badge variant="outline" className="text-yellow-600 border-yellow-300 flex items-center gap-1 bg-yellow-50">
          <AlertTriangle className={`${size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'}`} />
          <span>Under Investigation</span>
        </Badge>
      );
    }
    
    if (status.isVerified) {
      return (
        <Badge variant="outline" className="text-green-600 border-green-300 flex items-center gap-1 bg-green-50">
          <ShieldCheck className={`${size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'}`} />
          <span>Verified Garage</span>
        </Badge>
      );
    }
    
    return null;
  };
  
  const getTrustFlags = () => {
    if (!status.flags.length) return null;
    
    return (
      <div className="flex flex-wrap gap-1 mt-2">
        {status.flags.map(flag => {
          const flagConfig = {
            'trustworthy': { color: 'text-green-600 bg-green-50 border-green-200', icon: <ShieldCheck className="h-3 w-3" /> },
            'parts-theft-claimed': { color: 'text-red-600 bg-red-50 border-red-200', icon: <AlertTriangle className="h-3 w-3" /> },
            'overcharging-reported': { color: 'text-yellow-600 bg-yellow-50 border-yellow-200', icon: <AlertTriangle className="h-3 w-3" /> },
          }[flag] || { color: 'text-gray-600 bg-gray-50 border-gray-200', icon: <Info className="h-3 w-3" /> };
          
          return (
            <TooltipProvider key={flag}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge 
                    variant="outline" 
                    className={`text-xs py-0 px-2 ${flagConfig.color} flex items-center gap-1`}
                  >
                    {flagConfig.icon}
                    <span>{flag.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">
                    {flag === 'trustworthy' 
                      ? 'This garage has a good track record and high customer satisfaction.' 
                      : flag === 'parts-theft-claimed'
                      ? 'This garage has at least one unresolved part theft claim.'
                      : 'This garage has received complaints about pricing.'}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-2">
      {getStatusBadge()}
      
      {size !== 'sm' && getTrustFlags()}
      
      {showReportButton && bookingId && (
        <div className="mt-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
            asChild
          >
            <a href={`/report-issue/${bookingId}`}>
              <AlertCircle className="h-4 w-4 mr-1" />
              Report an Issue
            </a>
          </Button>
        </div>
      )}
    </div>
  );
};

export default GarageStatus;
