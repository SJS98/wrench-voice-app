
import { VehicleType, vehicleTypeNames } from '@/types/vehicles';
import VehicleIcon from '@/components/vehicles/VehicleIcon';

interface VehicleSelectionProps {
  onVehicleSelect: (vehicleType: VehicleType) => void;
}

const VehicleSelection = ({ onVehicleSelect }: VehicleSelectionProps) => {
  const vehicleTypes: VehicleType[] = ['car', 'bike', 'truck', 'bus', 'auto-rickshaw', 'bicycle'];

  return (
    <div className="grid grid-cols-2 gap-4">
      {vehicleTypes.map((type) => (
        <button
          key={type}
          className="border border-gray-200 rounded-lg p-4 flex flex-col items-center hover:border-garage-purple/60 hover:bg-garage-purple/5 transition-colors"
          onClick={() => onVehicleSelect(type)}
        >
          <div className="p-4 bg-gray-50 rounded-full mb-3">
            <VehicleIcon type={type} size={32} className="text-garage-purple" />
          </div>
          <span className="font-medium">{vehicleTypeNames[type]}</span>
        </button>
      ))}
    </div>
  );
};

export default VehicleSelection;
