{
  /* Vehicle Type Filter - Always show full text in chip, no expand */
}
<div className="mb-2">
  <div className="flex gap-1 overflow-x-auto scrollbar-hide">
    <Button
      variant="outline"
      size="sm"
      className={`rounded-full px-3 py-1 text-xs transition-all duration-200 bg-garage-purple text-white font-semibold`}
      onClick={() => handleVehicleTypeChange(undefined)}
      title="All Vehicles"
      style={{
        minWidth: "auto",
        width: "auto",
      }}
    >
      <span className="whitespace-nowrap">{"All"}</span>
    </Button>
    {(Object.keys(VehicleIcon) as VehicleType[]).map((type) => {
      const isSelected = selectedVehicleType === type;
      const label =
        type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ");
      return (
        <Button
          key={type}
          variant="outline"
          size="sm"
          className={`rounded-full px-3 py-1 flex items-center gap-1 text-xs transition-all duration-200 ${
            isSelected
              ? "bg-garage-purple text-white font-semibold"
              : "bg-white text-gray-900"
          }`}
          onClick={() => handleVehicleTypeChange(type)}
          title={label}
          style={{
            minWidth: "auto",
            width: "auto",
          }}
        >
          <VehicleIcon type={type} className="h-4 w-4" />
          <span className="whitespace-nowrap">{label}</span>
        </Button>
      );
    })}
  </div>
</div>;


// Filters - Mobile (Used Vehicles)
Filters - Mobile
<div className="lg:hidden">
  <VehicleFilters 
    onFilterChange={handleFilterChange}
    onSortChange={handleSortChange}
    showMobileFilters={showMobileFilters}
    setShowMobileFilters={setShowMobileFilters}
  />
</div>